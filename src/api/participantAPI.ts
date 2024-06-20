import { ParticipantDto } from '../types'
import ApiClient from './ApiClient'

const apiClient = new ApiClient<ParticipantDto>()

function fetchParticipants() {
  try {
    return apiClient.get<ParticipantDto[]>('/api/participants')
  } catch (error) {
    console.error(error)
  }
}

function fetchParticipant(id: string) {
  try {
    return apiClient.get<ParticipantDto>(`/api/participants/${id}`)
  } catch (error) {
    console.error(error)
  }
}

function createParticipant(participant: ParticipantDto) {
  try {
    return apiClient.post<ParticipantDto>('/api/participants', participant)
  } catch (error) {
    console.error(error)
  }
}
function updateParticipant(participant: ParticipantDto) {
  try {
    return apiClient.put<ParticipantDto>(`/api/participants/${participant.id}`, participant)
  } catch (error) {
    console.error(error)
  }
}

function deleteParticipant(id: string) {
  try {
    return apiClient.delete<ParticipantDto>(`/api/participants/${id}`)
  } catch (error) {
    console.error(error)
  }
}

export { fetchParticipants, fetchParticipant, createParticipant, updateParticipant, deleteParticipant }
