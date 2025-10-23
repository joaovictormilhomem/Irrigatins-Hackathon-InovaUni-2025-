// src/hooks/useGeolocation.ts
import { useState, useEffect, useCallback } from 'react';

interface GeolocationPosition {
  latitude: number;
  longitude: number;
}

interface UseGeolocationReturn {
  isLoading: boolean;
  position: GeolocationPosition | null;
  error: GeolocationPositionError | Error | null;
  permissionState: PermissionState | 'unsupported' | null; // 'granted', 'prompt', 'denied', ou 'unsupported'
  fetchPosition: () => void;
}

export function useGeolocation(): UseGeolocationReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationPositionError | Error | null>(null);
  // permissionState pode ser: 'granted', 'prompt', 'denied' (da Permissions API),
  // 'unsupported' (se navigator.geolocation não existir), ou null (inicial)
  const [permissionState, setPermissionState] = useState<PermissionState | 'unsupported' | null>(null);

  // Função para lidar com sucesso na obtenção da posição
  const handlePositionSuccess = useCallback((coords: GeolocationCoordinates) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    setPermissionState('granted'); // Se obtivemos posição, a permissão foi concedida
    setIsLoading(false);
    setError(null);
  }, []);

  // Função para lidar com erro na obtenção da posição
  const handlePositionError = useCallback((err: GeolocationPositionError) => {
    setError(err);
    if (err.code === err.PERMISSION_DENIED) {
      setPermissionState('denied');
    }
    // Se não for PERMISSION_DENIED, o permissionState pode continuar 'prompt'
    // ou o que foi definido pela Permissions API.
    setIsLoading(false);
  }, []);

  // Função para buscar a posição
  const fetchPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError(new Error('Geolocalização não é suportada pelo seu navegador.'));
      setPermissionState('unsupported');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null); // Limpa erros anteriores

    navigator.geolocation.getCurrentPosition(
      (geoPosition) => handlePositionSuccess(geoPosition.coords),
      handlePositionError,
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }, [handlePositionSuccess, handlePositionError]);

  // Efeito para verificar a Permissions API e observar mudanças
  useEffect(() => {
    if (!navigator.geolocation) {
      setPermissionState('unsupported');
      setError(new Error('Geolocalização não é suportada pelo seu navegador.'));
      setIsLoading(false);
      return;
    }

    // Se a Permissions API não for suportada, trate como 'prompt'.
    // O usuário precisará interagir (clicar em um botão) para chamar `WorkspacePosition`.
    if (!navigator.permissions || typeof navigator.permissions.query !== 'function') {
      if (permissionState === null) { // Define apenas se ainda não foi determinado
        setPermissionState('prompt');
      }
      setIsLoading(false);
      return;
    }

    let permStatusInstance: PermissionStatus | null = null;

    const onPermissionChange = () => {
      if (permStatusInstance) {
        setPermissionState(permStatusInstance.state);
      }
    };

    navigator.permissions.query({ name: 'geolocation' })
      .then((status) => {
        permStatusInstance = status;
        setPermissionState(status.state);
        permStatusInstance.onchange = onPermissionChange;
      })
      .catch((queryError) => {
        console.error("Erro ao consultar permissão de geolocalização:", queryError);
        setError(new Error('Não foi possível consultar a permissão de geolocalização.'));
        // Se a consulta falhar, podemos assumir 'prompt' ou 'denied'
        if (permissionState === null) {
          setPermissionState('prompt');
        }
      });

    return () => { // Cleanup
      if (permStatusInstance && permStatusInstance.onchange) {
        permStatusInstance.onchange = null;
      }
    };
  }, [permissionState]); // Re-executa se permissionState for alterado externamente (raro),
                          // mas principalmente para configurar o observador uma vez
                          // ou se o estado inicial precisar ser reavaliado.
                          // Usar `[]` faria com que o listener fosse configurado apenas uma vez.
                          // Como `permissionState` é atualizado internamente pelo listener, `[]` é mais apropriado aqui.
                          // No entanto, para garantir que o estado inicial seja definido corretamente se `permissionState`
                          // for `null` no início, manter `permissionState` pode ser útil para a lógica de fallback da Permissions API.
                          // Para simplificar e garantir que a configuração do listener ocorra uma vez: `[]`

  // Efeito para buscar automaticamente a posição se a permissão já estiver concedida
  useEffect(() => {
    if (permissionState === 'granted' && !position && !isLoading && !error) {
      fetchPosition();
    }
  }, [permissionState, position, isLoading, error, fetchPosition]);

  return { isLoading, position, error, permissionState, fetchPosition };
}