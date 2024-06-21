import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ParticipantDto, DisciplineDto } from '../../types'
import ApiClient from '../../api/ApiClient'
import { Link } from 'react-router-dom'

const apiClient = new ApiClient<ParticipantDto>(localStorage.getItem('token') ?? '')

export default function ParticipantTable() {
  const [selectedDisciplines, setSelectedDisciplines] = useState<DisciplineDto[]>([])
  const { data, isLoading } = useQuery<ParticipantDto[]>({
    queryKey: ['participants'],
    queryFn: async () => {
      const response = await apiClient.get<ParticipantDto[]>('/api/participant')
      return response
    },
  })

  if (isLoading) {
    return <div className="flex justify-center items-center h-24">Loading...</div>
  }

  // const handleAddDiscipline = (discipline: DisciplineDto) => {
  //   setSelectedDisciplines([...selectedDisciplines, discipline])
  // }

  const handleRemoveDiscipline = (discipline: DisciplineDto) => {
    setSelectedDisciplines(selectedDisciplines.filter((d) => d.id !== discipline.id))
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birth Date</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age Group</th>
            <th>Disciplines</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.firstName}</td>
              <td>{participant.lastName}</td>
              <td>{participant.birthDate}</td>
              <td>{participant.email}</td>
              <td>{participant.phone}</td>
              <td>{participant.ageGroup?.name}</td>
              <td>
                {participant.disciplines?.map((discipline) => (
                  <span key={discipline.id} className="badge badge-primary mr-2">
                    {discipline.name}
                  </span>
                ))}
              </td>
              <td>
                <Link to={`/participants/${participant.id}`} className="btn btn-primary btn-sm mr-2">
                  Edit
                </Link>
                <button className="btn btn-secondary btn-sm" onClick={() => handleRemoveDiscipline}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
