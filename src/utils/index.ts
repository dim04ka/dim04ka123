import { useState } from 'react'
import { Role, Item } from '../interface'

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

// Перемешивание массива (используя алгоритм Фишера-Йетса)
export const shuffle = (array: Item[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


export const getDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}.${formattedMonth}.${year}`;
}