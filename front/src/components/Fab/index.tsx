import './style.css'

export default function Fab({onClick}: {onClick: () => void}) {
  return (
    <div className='fab' onClick={onClick}>
      +
    </div>
  )
}