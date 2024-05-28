
import usePlayers from '../../hooks/usePlayers'
import { IPlayer } from '../../interface'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './style.scss'

const Players = () => {
  const [players, addPlayer, removePlayer] = usePlayers()

  const [value, setValue] = useState('')

  const changeValue = (e: any) => {
    setValue(e.target.value)
  }

  const handleClick = (e: any) => {
    e.preventDefault()
    addPlayer({ id: uuidv4(), name: value })
    setValue('')
  }

  return (
    <><p>Players</p>
      <form onSubmit={handleClick}>
        <TextField value={value} onChange={changeValue} variant="outlined" />
        <Button variant="contained" type="submit">Добавить</Button>
      </form>

      <ul>
        {
          players.map((player: IPlayer, idx: number) => {
            return (
              <div key={player.id}>
                <p>{idx + 1} <span>{player.name}</span> <button onClick={() => removePlayer(player.id)}>Удалить</button></p>
              </div>
            )
          })
        }
      </ul>
    </>
  )

}

export default Players;