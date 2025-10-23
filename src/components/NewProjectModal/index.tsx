import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react"
import ReactModal from "react-modal"
import "./styles.css"
import { createProject } from "../../logic/localStorage"
import { calcularET0, calcularETc, calcularLamina, calcularLaminaDeAplicacao, calcularTaxaAplicacao, calcularTempoIrrigacao } from "../../logic/calcs"

ReactModal.setAppElement('#root')

type ModalBaseProps = {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  weather: any
}

const initialValues = {
  name: "",
  vazao: "",
  espacamento: "",
  eficienciaDoSistema: "",
  laminaLiquida: "",
  turnoDeRega: "",
  cultura: ""
}

export default function NewProjectModal({ isOpen, setIsOpen }: ModalBaseProps) {
  const [error, setError] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [values, setValues] = useState(initialValues as any)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!values.cultura) {
      setError("Escolha uma cultura!")
      return
    }
    
    values.taxaAplicacao = calcularTaxaAplicacao(Number(values.vazao), Number(values.espacamento))
    values.calcularLamina = calcularLamina(Number(values.laminaLiquida), Number(values.eficienciaDoSistema))
    values.et0 = calcularET0(38, 3)
    values.etc = calcularETc(Number(values.et0), 1.125)
    values.laminaDeAplicacao = calcularLaminaDeAplicacao(Number(values.etc), Number(values.eficienciaDoSistema))
    values.tempoIrrigacao = calcularTempoIrrigacao(Number(values.laminaDeAplicacao), Number(values.taxaAplicacao))
    console.log(values)
    

    createProject(values)
    closeModal()
  }

  function closeModal() {
    setError('')
    setValues(initialValues)
    setIsOpen(false)
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <button type='button' className='modal-close-button' onClick={closeModal}>X</button>
      <form onSubmit={handleSubmit}>

        <label htmlFor="name">Nome do projeto</label>
        <input
          type="text"
          id="name"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          required
        />

        <label htmlFor="vazao">Vazão</label>
        <input
          type="text"
          id="vazao"
          value={values.vazao}
          onChange={(e) => setValues({ ...values, vazao: e.target.value })}
          required
        />

        <label htmlFor="espacamento">Espaçamento</label>
        <input
          type="text"
          id="espacamento"
          value={values.espacamento}
          onChange={(e) => setValues({ ...values, espacamento: e.target.value })}
          required
        />

        <label htmlFor="eficienciaDoSistema">Eficiencia do Sistema</label>
        <input
          type="text"
          id="eficienciaDoSistema"
          value={values.eficienciaDoSistema}
          onChange={(e) => setValues({ ...values, eficienciaDoSistema: e.target.value })}
          required
        />

        <label htmlFor="laminaLiquida">Lamina Liquida</label>
        <input
          type="text"
          id="laminaLiquida"
          value={values.laminaLiquida}
          onChange={(e) => setValues({ ...values, laminaLiquida: e.target.value })}
          required
        />

        <label htmlFor="turnoDeRega">Turno de rega</label>
        <input
          type="text"
          id="turnoDeRega"
          value={values.turnoDeRega}
          onChange={(e) => setValues({ ...values, turnoDeRega: e.target.value })}
          required
        />

        <label htmlFor="cultura">Cultura</label>
        <select id="cultura" value={values.cultura} onChange={(e) => setValues({ ...values, cultura: e.target.value })}>
          <option disabled value="">Selecione uma cultura</option>
          <option value="soja">Soja</option>
          <option value="milho">Milho</option>
        </select>

        <button>Criar</button>

        {error && <span className='error'>{error}</span>}
      </form>
    </ReactModal>
  )
}