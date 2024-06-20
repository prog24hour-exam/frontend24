import { DisciplineDto } from '../types'
import ApiClient from './ApiClient'

const apiClient = new ApiClient<DisciplineDto>()

function fetchDisciplines() {
  try {
    return apiClient.get<DisciplineDto[]>('/api/disciplines')
  } catch (error) {
    console.error(error)
  }
}

function fetchDiscipline(id: string) {
  try {
    return apiClient.get<DisciplineDto>(`/api/disciplines/${id}`)
  } catch (error) {
    console.error(error)
  }
}

function createDiscipline(discipline: DisciplineDto) {
  try {
    return apiClient.post<DisciplineDto>('/api/disciplines', discipline)
  } catch (error) {
    console.error(error)
  }
}

function updateDiscipline(discipline: DisciplineDto) {
  try {
    return apiClient.put<DisciplineDto>(`/api/disciplines/${discipline.id}`, discipline)
  } catch (error) {
    console.error(error)
  }
}

function deleteDiscipline(id: string) {
  try {
    return apiClient.delete<DisciplineDto>(`/api/disciplines/${id}`)
  } catch (error) {
    console.error(error)
  }
}

export { fetchDisciplines, fetchDiscipline, createDiscipline, updateDiscipline, deleteDiscipline }
