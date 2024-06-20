import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DisciplineDto } from '../../types'
import ApiClient from '../../api/ApiClient'

const apiClient = new ApiClient<DisciplineDto>(localStorage.getItem('token') ?? '')

interface DisciplineTableProps {
  onAddDiscipline: (discipline: DisciplineDto) => void
  onRemoveDiscipline: (discipline: DisciplineDto) => void
}

export default function DisciplineTable({ onAddDiscipline, onRemoveDiscipline }: DisciplineTableProps) {
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineDto | null>(null)
  const { data, isLoading } = useQuery<DisciplineDto[]>({
    queryKey: ['disciplines'],
    queryFn: async () => {
      const response = await apiClient.get<DisciplineDto[]>('/api/discipline')
      return response
    },
  })

  if (isLoading) {
    return <div className="flex justify-center items-center h-24">Loading...</div>
  }

  const handleAdd = () => {
    if (selectedDiscipline) {
      onAddDiscipline(selectedDiscipline)
      setSelectedDiscipline(null) // Reset the selection
    }
  }

  const handleRemove = (discipline: DisciplineDto) => {
    onRemoveDiscipline(discipline)
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((discipline) => (
            <tr key={discipline.id}>
              <td>{discipline.name}</td>
              <td>{discipline.description}</td>
              <td>
                <button className="btn btn-primary btn-sm mr-2" onClick={() => setSelectedDiscipline(discipline)}>
                  Add
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => handleRemove(discipline)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedDiscipline && (
        <div className="mt-4">
          <button className="btn btn-success" onClick={handleAdd}>
            Confirm Add {selectedDiscipline.name}
          </button>
        </div>
      )}
    </div>
  )
}
