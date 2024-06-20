import { useForm, Controller } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ParticipantDto } from '../types'
import { createParticipant } from '../api/participantAPI'

interface ParticipantFormProps {
  participant: ParticipantDto
}

export default function ParticipantForm({ participant }: ParticipantFormProps) {
  const { handleSubmit, control, reset } = useForm<ParticipantDto>()
  const queryClient = useQueryClient()

  const mutation = useMutation(createParticipant, {
    onSuccess: () => {
      queryClient.invalidateQueries(['participants'])
      reset()
    },
  })

  const onSubmit = (data: ParticipantDto) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First Name</label>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} />}
          rules={{ required: 'First name is required' }}
        />
      </div>
      <div>
        <label>Last Name</label>
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} />}
          rules={{ required: 'Last name is required' }}
        />
      </div>
      <div>
        <label>Birth Date</label>
        <Controller
          name="birthDate"
          control={control}
          defaultValue=""
          render={({ field }) => <input type="date" {...field} />}
          rules={{ required: 'Birth date is required' }}
        />
      </div>
      <div>
        <label>Email</label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => <input type="email" {...field} />}
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
        <label>Phone</label>
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} />}
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
        <label>Gender</label>
        <Controller
          name="gender"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select {...field}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          )}
        />
      </div>
      <button type="submit">Add Participant</button>
      {mutation.isLoading && <p>Adding participant...</p>}
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
    </form>
  )
}
