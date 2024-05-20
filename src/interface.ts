export interface Item {
  id: number;
  isBooked: boolean;
  userName: string;
  role: Role;
  point: number;
}

export interface IGame {
  id: number;
  items: Item[]
}


export type Role = 'red' | 'mafia' | 'don' | 'sherif'

export interface IFormValues {
}
export interface IProject {
  comment: string
  formValues: IFormValues
  id: number
  resultMatch: 'mafia' | 'red'
}

export interface IInfoGame {
  date: string
  id: number
  judge: string
  numberGame: string
  playersWithRole: Item[]
  role: string
  status: string
}

