import axios from 'axios'
import * as crypto from 'crypto'

const API_BASE_URL = 'https://96fjwjhkqd.execute-api.us-east-2.amazonaws.com/dev'

const secretKey = 'thisnotwebassembly'
export interface Leader {
  id: string
  name: string
  time: number
  [key: string]: any
}

// Función para generar el token HMAC
const generateHmacToken = (bodyData: any) => {
  const hmac = crypto.createHmac('sha256', secretKey)
  hmac.update(JSON.stringify(bodyData))
  return hmac.digest('hex')
}

// Obtener todos los líderes, ordenados por el campo 'time'
export const getLeaders = async (): Promise<Leader[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/leaders`)
    return response.data
  } catch (error) {
    throw new Error(`Error al obtener los líderes: ${error}`)
  }
}

// Obtener un líder específico por id
export const getLeaderById = async (id: string): Promise<Leader> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/leaders/${id}`)
    return response.data
  } catch (error) {
    throw new Error(`Error al obtener el líder con id ${id}: ${error}`)
  }
}

// Crear un nuevo líder
export const createLeader = async (leader: Leader): Promise<Leader> => {
  try {
    const hmacToken = generateHmacToken(leader)
    const response = await axios.post(`${API_BASE_URL}/leaders`, leader, {
      headers: {
        'Content-Type': 'application/json',
        'X-HMAC': hmacToken
      }
    })
    return response.data
  } catch (error) {
    throw new Error(`Error al crear un nuevo líder: ${error}`)
  }
}

// Eliminar un líder por id
export const deleteLeader = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/leaders/${id}`)
  } catch (error) {
    throw new Error(`Error al eliminar el líder con id ${id}: ${error}`)
  }
}

export const getUUID = async (): Promise<string> => {
  try {
    const response = await axios.get<string>('https://www.uuidtools.com/api/generate/v4')
    return response.data
  } catch (error) {
    console.error('Error al obtener UUID v4:', error)
    throw new Error('No se pudo obtener el UUID v4')
  }
}
