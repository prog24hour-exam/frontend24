import ParticipantForm from '../components/ParticipantForm'
import ParticipantTable from '../components/ParticipantTable'

export default function ParticipantPage() {
  return (
    <div>
      <h1>Welcome to the Participant Page</h1>
      <ParticipantForm participant={null} />
      <ParticipantTable />
    </div>
  )
}
