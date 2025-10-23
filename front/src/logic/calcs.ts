export function calcularTaxaAplicacao(vazao, espacamento) { 
    return vazao / espacamento;
}

export function calcularLamina(laminaLiquida, eficienciaDecimal) {
  if (eficienciaDecimal === 0) return 0;
  return laminaLiquida / converterParaDecimal(eficienciaDecimal);
}

export function calcularLaminaDeAplicacao(etc, eficienciaDecimal) {
  if (eficienciaDecimal === 0) return 0;
  return etc / converterParaDecimal(eficienciaDecimal);
}

export function converterParaDecimal(porcentagem) {
  return porcentagem / 100;
}



export function calcularET0(maxTemp, minTemp) {
    const mediaTemp = (maxTemp + minTemp) / 2;
    const parteTemp = Math.sqrt(maxTemp - minTemp); 
  
    return 0.0135 * 0.159 * parteTemp * (mediaTemp + 14.9) * (39.5 / 2.45);
}

export function calcularETc(et0dia, coeficienteKc) {
    return et0dia * coeficienteKc;
}

export function calcularETcAcumulado(
  listaTempMax, 
  listaTempMin, 
  listaRadiacao, 
  coeficienteKc
) {
  let etcTotal = 0.0;
  for (let i = 0; i < listaTempMax.length; i++) {
    const tMax = listaTempMax[i];
    const tMin = listaTempMin[i];
    const rad = listaRadiacao[i];

    const et0Dia = calcularET0(tMax, tMin, rad); 

    const etcDia = calcularETc(et0Dia, 1.125);
    
    etcTotal += etcDia;
  }
  return etcTotal;
}

export function calcularPrecipitacaoAcumulada(listaChuva) {
  let pTotal = 0.0;
  for (const chuva of listaChuva) {
    pTotal += chuva;
  }
  return pTotal;
}

export function calcularAguaPerdida(etcTotal, pTotal){
    return etcTotal - pTotal;
}

export function calcularTempoIrrigacao(laminaAplicar, taxaAplicacao){
    if (taxaAplicacao === 0) return 0;
    return laminaAplicar / taxaAplicacao;
}



// console.log(calcularTaxaAplicacao(1215, 225));
// console.log(calcularLamina(30, 80));
// console.log(calcularET0(33.8, 23.2, 39.55));
// console.log(calcularETc(4.9, 0.45));
// console.log(calcularAguaPerdida(25.2, 15));
// console.log(calcularLamina(10.2, 80));
// console.log(calcularTempoIrrigacao(12.75, 5.4));