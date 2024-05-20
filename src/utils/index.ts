import { useState } from 'react'

export const useRole = () => {
  const [role, setRole] = useState<string>('guest')

  const getRole = () => {
    return role
  }

  return [getRole]
}


export const transformText = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}