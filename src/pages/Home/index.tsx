import { useEffect, useState } from "react"
import './style.css'
import { useGeolocation } from "../../hooks/useGeolocation"
import { getWeather } from "../../logic/wheather"
import type { TProject } from "../../types"
import { deleteProject, getProjects } from "../../logic/localStorage"
import NewProjectModal from "../../components/NewProjectModal"
import Header from "../../components/Header"
import ProjectCard from "../../components/ProjectCard"
import Fab from "../../components/Fab"

export default function Home() {
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
  }, [location.isLoading, location.position?.latitude, location.position?.longitude])

  useEffect(() => {
    setFilteredProjects(getFilteredProjects())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, isNewProjectModalOpen])

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
      </div>

      <div className="fabs">
        <Fab onClick={() => setIsNewProjectModalOpen(true)} />
      </div>
    </div >
  )
}