import { useQuery } from '@tanstack/react-query'
import { DisciplineDto } from '../types'
import ApiClient from '../api/ApiClient'

const apiClient = new ApiClient<DisciplineDto>(localStorage.getItem('token') ?? '')

export default function DisciplineTable() {
  const { data, isLoading } = useQuery<DisciplineDto[]>({
    queryKey: ['disciplines'],
    queryFn: async () => {
      const response = await apiClient.get<DisciplineDto[]>('/api/disciplines')
      return response
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((discipline) => (
          <tr key={discipline.id}>
            <td>{discipline.name}</td>
            <td>{discipline.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
