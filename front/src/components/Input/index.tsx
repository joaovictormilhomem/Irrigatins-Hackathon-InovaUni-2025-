import './style.css'

type InputProps = {
  label?: string,
  name: string,
  type: string,
  labelOnEnd: boolean
}

export default function Input({ label, name, type, labelOnEnd }: InputProps) {
  return (
    <>
      <div className="input-container">
        {label &&!labelOnEnd && <label htmlFor="">{label}</label>}
        <input className="input-field" type={type} name={name} autoComplete='off' />
        {label && labelOnEnd && <label htmlFor="">{label}</label>}
      </div>
    </>
  )
}