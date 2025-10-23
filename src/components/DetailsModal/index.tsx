import type { TProject } from "../../types";

type DetailsModalProps = {
  project: TProject,
  isOpen: boolean,
  setIsOpen: () => void
}

export default function DetailsModal({ project, isOpen, setIsOpen }: DetailsModalProps) {
  return (
    <div className="details-container">
      
    </div>
  )
}