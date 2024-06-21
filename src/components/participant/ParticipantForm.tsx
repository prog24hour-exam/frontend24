import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { ClubDto, DisciplineDto, ParticipantDto } from '../../types'
import ApiClient from '../../api/ApiClient'
import DisciplineTable from './DisciplineTable'
import { useState } from 'react'
import ClubTable from './ClubTable'

interface ParticipantFormProps {
  participant: ParticipantDto | null
}

const apiClient = new ApiClient<ParticipantDto>(localStorage.getItem('token') ?? '')

export default function ParticipantForm({ participant }: ParticipantFormProps) {
  const [selectedDisciplines, setSelectedDisciplines] = useState<DisciplineDto[]>([])
  const [selectedClub, setSelectedClub] = useState<ClubDto>()
  const [openForm, setOpenForm] = useState(false)
  const { handleSubmit, control } = useForm<ParticipantDto>({
    defaultValues: participant || undefined,
  })

  const mutation = useMutation({
    mutationFn: async (data: ParticipantDto) => {
      if (participant?.id) {
        await apiClient.put<ParticipantDto>(`/api/participant/${participant.id}`, data)
      } else {
        await apiClient.post<ParticipantDto>('/api/participant', data)
      }
    },
  })

  const handleAddDiscipline = (discipline: DisciplineDto) => {
    setSelectedDisciplines([...selectedDisciplines, discipline])
  }

  const handleRemoveDiscipline = (discipline: DisciplineDto) => {
    setSelectedDisciplines(selectedDisciplines.filter((d) => d.id !== discipline.id))
  }

  const handleAddClub = (club: ClubDto) => {
    setSelectedClub(club)
  }

  const handleRemoveClub = () => {
    setSelectedClub(undefined)
  }

  const onSubmit = (data: ParticipantDto) => {
    if (selectedClub) {
      data.club = [selectedClub]
    }
    data.disciplines = selectedDisciplines
    mutation.mutate(data)
  }

  return (
    <div>
      <div>
        <button
          onClick={() => setOpenForm(!openForm)}
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {openForm ? 'Close Form' : 'Open Form'}
        </button>
      </div>
      {openForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 bg-white shadow-lg rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              )}
              rules={{ required: 'First name is required' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              )}
              rules={{ required: 'Last name is required' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Birth Date</label>
            <Controller
              name="birthDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="date"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              )}
              rules={{ required: 'Birth date is required' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="email"
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              )}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Please provide a valid email address',
                },
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              )}
              rules={{
                required: 'Phone is required',
                pattern: {
                  value: /^[0-9]{8}$/,
                  message: 'Mobile number must be 8 digits',
                },
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              )}
            />
          </div>
          <div>
            <div className="mt-8">
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Selected Disciplines</label>
                <ul>
                  {selectedDisciplines.map((discipline) => (
                    <li key={discipline.id}>{discipline.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <label className="block text-sm font-medium text-gray-700">Disciplines</label>
            <Controller
              name="disciplines"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <DisciplineTable
                  disciplines={field.value}
                  onAddDiscipline={handleAddDiscipline}
                  onRemoveDiscipline={handleRemoveDiscipline}
                />
              )}
            />
          </div>
          <div>
            <label>Clubs</label>
            <Controller
              name="club"
              control={control}
              defaultValue={selectedClub}
              render={({ field }) => (
                <ClubTable clubs={field.value} onAddClub={handleAddClub} onRemoveClub={handleRemoveClub} />
              )}
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {participant ? 'Update Participant' : 'Add Participant'}
          </button>
          {mutation.isError && <p className="mt-2 text-sm text-red-600">{mutation.error.message}</p>}
        </form>
      )}
    </div>
  )
}
