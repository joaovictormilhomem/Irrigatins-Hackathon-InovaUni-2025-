import { useEffect, useState } from "react"
import Fab from "./components/Fab"
import Header from "./components/Header"
import ProjectCard from "./components/ProjectCard"
import NewProjectModal from "./components/NewProjectModal"
import { deleteProject, getProjects } from "./logic/localStorage"
import type { TProject } from "./types"
import { getWeather } from "./logic/wheather"
import { useGeolocation } from "./hooks/useGeolocation"
import './style.css'

const fakeProject = {
  name: "",
  vazao: "",
  espacamento: "",
  eficienciaDoSistema: "",
  laminaLiquida: "",
  turnoDeRega: "",
  cultura: ""
}

export default function App() {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [filteredProjects, setFilteredProjects] = useState(getFilteredProjects())
  const [weather, setWeather] = useState(false)
  const location = useGeolocation()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => location.fetchPosition(), [])

  useEffect(() => {
    if (!location.isLoading && location.position?.latitude && location.position?.longitude) {
      getWeather(location.position?.latitude, location.position?.longitude, setWeather)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.isLoading])

  useEffect(() => {
    setFilteredProjects(getFilteredProjects())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewProjectModalOpen])

  function getFilteredProjects() {
    const projects: TProject[] = getProjects()
    if (!projects)
      return []
    if (!search)
      return projects
    return projects.filter(project =>
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.cultura.toLowerCase().includes(search.toLowerCase()))
  }

  function handleProjectDelete(project: TProject) {
    if (confirm("Tem certeza que deseja apagar esse registro?")) {
      const deleted = deleteProject(project.name)
      if (deleted) setFilteredProjects(getFilteredProjects())
      else alert("Não foi possível apagar o projeto!")
    }
  }

  return (
    <div className="main-container">
      <NewProjectModal weather={weather} isOpen={isNewProjectModalOpen} setIsOpen={setIsNewProjectModalOpen} />
      <Header />

      <input
        name='search'
        type='search'
        className='search'
        placeholder='Buscar'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="project-cards">
        {
          filteredProjects.map((project) => (
            <ProjectCard project={project} key={project.name} handleProjectDelete={handleProjectDelete} />
          ))
        }
        <ProjectCard project={fakeProject} key={fakeProject.name} handleProjectDelete={handleProjectDelete} invisible />
      </div>

      <div className="fabs">
        <Fab onClick={() => setIsNewProjectModalOpen(true)} />
      </div>
    </div >
  )
}