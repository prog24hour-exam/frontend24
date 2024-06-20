import ParticipantForm from '../components/participant/ParticipantForm'
import ParticipantTable from '../components/participant/ParticipantTable'

export default function ParticipantPage() {
  return (
    <div>
      <h1>Welcome to the Participant Page</h1>
      <ParticipantTable />
      <ParticipantForm participant={null} />
    </div>
  )
}
