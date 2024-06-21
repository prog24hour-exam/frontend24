import { useState } from 'react'
import { ResultDto } from '../../types'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import ApiClient from '../../api/ApiClient'

interface ResultFormProps {
  result: ResultDto | null
}

const apiClient = new ApiClient<ResultDto>(localStorage.getItem('token') ?? '')

export default function ResultForm({ result }: ResultFormProps) {
  const [openForm, setOpenForm] = useState(false)
  const { handleSubmit, control } = useForm<ResultDto>({
    defaultValues: result || undefined,
  })

  const mutation = useMutation({
    mutationFn: async (data: ResultDto) => {
      if (result?.id) {
        await apiClient.put<ResultDto>(`/api/participant/results/${result.id}`, data)
      } else {
        await apiClient.post<ResultDto>('/api/results', data)
      }
    },
  })

  const onSubmit = (data: ResultDto) => {
    mutation.mutate(data)
  }

  return (
    <div>
      {openForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 bg-white shadow-lg rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">Result</label>
            <Controller
              name="result"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              )}
              rules={{ required: 'Result is required' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Participant ID</label>
            <Controller
              name="participantId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              )}
              rules={{ required: 'Participant ID is required' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Discipline ID</label>
            <Controller
              name="disciplineId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                "
                />
              )}
              rules={{ required: 'Discipline ID is required' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Result Date</label>
            <Controller
              name="resultDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="date"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              )}
              rules={{ required: 'Result date is required' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Result Time</label>
            <Controller
              name="resultValue"
              control={control}
              render={({ field }) => (
                <input
                  type="time"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              )}
              rules={{ required: 'Result time is required' }}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      )}
      <div>
        <button
          onClick={() => setOpenForm(!openForm)}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {openForm ? 'Close Form' : 'Open Form'}
        </button>
      </div>
    </div>
  )
}
