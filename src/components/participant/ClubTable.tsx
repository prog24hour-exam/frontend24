import { ClubDto } from '../../types'
import ApiClient from '../../api/ApiClient'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const apiClient = new ApiClient<ClubDto>(localStorage.getItem('token') ?? '')

interface ClubTableProps {
  onAddClub: (club: ClubDto) => void
  onRemoveClub: () => void
  clubs: ClubDto | undefined
}

export default function ClubTable({ onAddClub, onRemoveClub }: ClubTableProps) {
  const [selectedClub, setSelectedClub] = useState<ClubDto>()
  const { data, isLoading } = useQuery<ClubDto[]>({
    queryKey: ['clubs'],
    queryFn: async () => {
      const response = await apiClient.get<ClubDto[]>('/api/club')
      return response
    },
  })

  if (isLoading) {
    return <div className="flex justify-center items-center h-24">Loading...</div>
  }

  const handleAddClub = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (selectedClub) {
      onAddClub(selectedClub)
      setSelectedClub(undefined)
    }
  }

  const handleRemoveClub = () => {
    onRemoveClub()
  }

  return (
    <div className="overflow-x-auto">
      {selectedClub && (
        <div className="mt-4">
          <button className="btn btn-success" onClick={handleAddClub}>
            Confirm Club : {selectedClub.name}
          </button>
        </div>
      )}
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((club) => (
            <tr key={club.id}>
              <td>{club.name}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleRemoveClub()}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
