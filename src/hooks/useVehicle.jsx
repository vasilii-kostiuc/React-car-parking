import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { route } from '@/routes'

export function useVehicle(id = null) {
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    if (id !== null) {
      const controller = new AbortController()
      getVehicle(id, { signal: controller.signal })
      return () => controller.abort()
    }
  }, [id])

  async function createVehicle(vehicle) {
    setLoading(true)
    setErrors({})

    return window.axios.post('vehicle', vehicle)
      .then(() => navigate(route('vehicles.index')))
      .catch(error => {
        if (error.response.status === 400) {
          setErrors(error.response.data.errors)
        }
      })
      .finally(() => setLoading(false))
  }

  async function getVehicle(id, { signal } = {}) {
    setLoading(true)

    return window.axios.get(`vehicle/${id}`, { signal })
      .then(response => setData(response.data.data))
      .catch(() => { })
      .finally(() => setLoading(false))
  }

  async function updateVehicle(vehicle) {
    setLoading(true)
    setErrors({})

    return window.axios.put(`vehicle/${vehicle.id}`, vehicle)
      .then(() => navigate(route('vehicles.index')))
      .catch(error => {
        if (error.response.status === 400) {
          setErrors(error.response.data.errors)
        }
      })
      .finally(() => setLoading(false))
  }

  async function destroyVehicle(vehicle) {
    return axios.delete(`vehicle/${vehicle.id}`)
  }

  return {
    vehicle: { data, setData, errors, loading },
    createVehicle,
    updateVehicle,
    destroyVehicle,
  }
}