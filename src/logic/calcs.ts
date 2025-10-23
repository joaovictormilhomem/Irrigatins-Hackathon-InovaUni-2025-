export function calcularTaxaAplicacao(vazao: number, espacamento: number) { 
    return vazao / espacamento;
}

export function calcularLamina(laminaLiquida: number, eficienciaDecimal: number) {
  if (eficienciaDecimal === 0) return 0;
  return laminaLiquida / converterParaDecimal(eficienciaDecimal);
}

export function calcularLaminaDeAplicacao(etc: number, eficienciaDecimal: number) {
  if (eficienciaDecimal === 0) return 0;
  return etc / converterParaDecimal(eficienciaDecimal);
}

export function converterParaDecimal(porcentagem: number) {
  return porcentagem / 100;
}



export function calcularET0(maxTemp: number, minTemp: number) {
    const mediaTemp = (maxTemp + minTemp) / 2;
    const parteTemp = Math.sqrt(maxTemp - minTemp); 
  
    return 0.0135 * 0.159 * parteTemp * (mediaTemp + 14.9) * (39.5 / 2.45);
}

export function calcularETc(et0dia: number, coeficienteKc: number) {
    return et0dia * coeficienteKc;
}

// export function calcularETcAcumulado(
//   listaTempMax: string | any[], 
//   listaTempMin: any[], 
//   listaRadiacao: any[], 
//   coeficienteKc: any
// ) {
//   let etcTotal = 0.0;
//   for (let i = 0; i < listaTempMax.length; i++) {
//     const tMax = listaTempMax[i];
//     const tMin = listaTempMin[i];
//     const rad = listaRadiacao[i];

//     const et0Dia = calcularET0(tMax, tMin, rad); 

//     const etcDia = calcularETc(et0Dia, 1.125);
    
//     etcTotal += etcDia;
//   }
//   return etcTotal;
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function calcularPrecipitacaoAcumulada(listaChuva: any) {
  let pTotal = 0.0;
  for (const chuva of listaChuva) {
    pTotal += chuva;
  }
  return pTotal;
}

export function calcularAguaPerdida(etcTotal: number, pTotal: number){
    return etcTotal - pTotal;
}

export function calcularTempoIrrigacao(laminaAplicar: number, taxaAplicacao: number){
    if (taxaAplicacao === 0) return 0;
    return laminaAplicar / taxaAplicacao;
}