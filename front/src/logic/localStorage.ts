import type { TProject } from "../types"

export function getProjects() {
  const projectsOnLS = localStorage.getItem("PROJECTS")
  if (projectsOnLS) {
    return JSON.parse(projectsOnLS)
  }
  return false
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createProject(newProject: any) {
  const projectsOnLS = localStorage.getItem("PROJECTS")
  if (projectsOnLS) {
    const currProjects: TProject[] = JSON.parse(projectsOnLS)
    const thereIsProjectWithThisName = !!currProjects.find((proj) => proj.name === newProject.name)
    if (thereIsProjectWithThisName)
      return false
    localStorage.setItem("PROJECTS", JSON.stringify([...currProjects, newProject]))
    return true
  }
  localStorage.setItem("PROJECTS", JSON.stringify([newProject]))
}

export function deleteProject(projectName: string) {
  const projectsOnLS = localStorage.getItem("PROJECTS")
  if (!projectsOnLS) return false

  const currProjects: TProject[] = JSON.parse(projectsOnLS)
  const updatedProjects = currProjects.filter((proj) => proj.name !== projectName)

  if (updatedProjects.length === currProjects.length) return false // não encontrou o projeto
  localStorage.setItem("PROJECTS", JSON.stringify(updatedProjects))
  return true
}

export function updateProject(projectName: string, updatedData: Partial<TProject>) {
  const projectsOnLS = localStorage.getItem("PROJECTS")
  if (!projectsOnLS) return false

  const currProjects: TProject[] = JSON.parse(projectsOnLS)
  const projectIndex = currProjects.findIndex((proj) => proj.name === projectName)

  if (projectIndex === -1) return false // não encontrou o projeto

  const updatedProject = { ...currProjects[projectIndex], ...updatedData }
  currProjects[projectIndex] = updatedProject

  localStorage.setItem("PROJECTS", JSON.stringify(currProjects))
  return true
}
