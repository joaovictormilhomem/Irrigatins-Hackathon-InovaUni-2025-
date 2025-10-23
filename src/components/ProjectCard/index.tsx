import type { TProject } from '../../types'
import './style.css'

type ProjectCardProps = {
  project: TProject,
  invisible?: boolean,
  handleProjectDelete: (project: TProject) => void
}

export default function ProjectCard({ project, invisible, handleProjectDelete }: ProjectCardProps) {
  return (
    <div className={`project-card ${invisible && 'invisible'}`} style={{ backgroundColor: "var(--green)" }}>
      <div>
        <h2>{project.name}</h2>
        <p>Et0: {Number(project.et0).toFixed(2)}</p>
        <p>Lamina de Aplicação: {Number(project.laminaDeAplicacao).toFixed(2)} mm3</p>
        <p>Tempo de irrigacao: {Number(project.tempoIrrigacao).toFixed(2)} horas</p>
      </div>
      <p className='delete-project' onClick={() => handleProjectDelete(project)}>APAGAR</p>
    </div>
  )
}