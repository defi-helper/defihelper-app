import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export const useQueryParams = () => {
  const location = useLocation()

  return useMemo(() => new URLSearchParams(location.search), [location])
}
