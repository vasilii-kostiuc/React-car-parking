import { useState, useMemo, useEffect } from 'react'
import { useLocalStorage } from 'react-use-storage'
import { useNavigate } from 'react-router-dom'
import { route } from '@/routes'
 
export function useAuth() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage("access_token", '',  { raw: true })

  const navigate = useNavigate();
  const isLoggedIn = useMemo(() => !!accessToken, [accessToken])

  useEffect(() => {
    if (accessToken) {
      window.axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    }
  }, [accessToken])
  
  async function register(data) {
    setErrors({});
    setLoading(true);

    return window.axios
      .post("Auth/register", data)
      .then((response) => {
        setAccessToken(response.data.accessToken);
        navigate(route("vehicles.index"));
      })
      .catch((error) => {

        if (error.response.status === 400) {
          setErrors(error.response.data.errors);
        }
      })
      .finally(() => setLoading(false));
  }

  async function login(data) {
  setErrors({})
  setLoading(true)
 
  return window.axios.post('Auth/login', data)
    .then(response => {
      setAccessToken(response.data.accessToken)
      navigate(route('parkings.active'))
    })
    .catch(error => {
      if (error.response.status === 400) {
        setErrors(error.response.data.errors)
      }
    })
    .finally(() => setLoading(false))
}

  async function logout(force = false) {
    if (!force) {
      await window.axios.post('Auth/logout')
    }
 
    removeAccessToken()
    navigate(route('login'))
  }

  return { register, errors, loading, isLoggedIn, login, logout };
}