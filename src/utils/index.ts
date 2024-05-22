import { useState } from 'react'
import { Role } from '../interface'

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


export const getIcon = (role: Role) => {
  if (role === 'don') return '⬛️';
  if (role === 'sherif') return '👌'
  if (role === 'mafia') return '⚫️'
  return ''
}