import { useQuery } from '@tanstack/react-query'
import { ResultDto } from '../../types'
import ApiClient from '../../api/ApiClient'
import { Link } from 'react-router-dom'

const apiClient = new ApiClient<ResultDto>(localStorage.getItem('token') ?? '')

export default function ResultTable() {
  const { data, isLoading } = useQuery<ResultDto[]>({
    queryKey: ['results'],
    queryFn: async () => {
      const response = await apiClient.get<ResultDto[]>('/api/participant/results')
      return response
    },
  })

  if (isLoading) {
    return <div className="flex justify-center items-center h-24">Loading...</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Result</th>
            <th>Participant name </th>
            <th>Participant ID</th>
            <th>Participant ageGroup</th>
            <th>Discipline</th>
            <th>Club</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((result) => (
            <tr key={result.id}>
              <td>{result.resultValue}</td>
              <td>
                {result.participant?.firstName} {result.participant?.lastName}
              </td>
              <td>{result.participant?.id}</td>
              <td>{result.participant?.ageGroup?.name}</td>
              <td>{result.discipline?.name}</td>
              <td>{result.participant?.club?.name}</td>
              <td>
                <Link to={`/results/${result.id}`} className="btn btn-primary btn-sm mr-2">
                  Edit
                </Link>
                <Link to={`/results/${result.id}/delete`} className="btn btn-secondary btn-sm">
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
