import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { route } from '@/routes'
 
export function useParking() {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
 
  async function startParking(data) {
    return axios.post('parking/start', data)
      .then(() => navigate(route('parkings.active')))
      .catch(error => {
        if (error.response.status === 400) {
          setErrors(error.response.data.errors)
        }
      })
      .finally(() => setLoading(false))
  }
 
  return { loading, errors, startParking }
}