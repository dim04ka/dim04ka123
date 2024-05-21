import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import './style.scss'
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const Games = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const gameCreated = localStorage.getItem('gameCreated');
    if (typeof gameCreated === 'string') {
      const games = JSON.parse(gameCreated);
      setItems(games)
    }
  }, [])



  const deleteGame = (numberGame: number) => {
    const newItems = items.filter((item: any) => item.numberGame !== numberGame)
    localStorage.setItem('gameCreated', JSON.stringify(newItems))
    setItems(newItems)
  }
  return (
    <>
      <h1>Игры вечера</h1>

      {items.map((item: any) => {
        return (
          <div key={item.numberGame} className="game">
            <Link to={`${item.id}`}>
              <div><Typography variant='button'>Игра № {item.numberGame} </Typography></div>
              <Typography variant='body2'>{(item.date)} </Typography>

              <Typography variant='body2'>
                <span>{item.role}</span><span> </span><span>{item.judge}</span>
              </Typography>

            </Link>
            <Button variant="contained" onClick={() => deleteGame(item.numberGame)}>Удалить</Button>
          </div>
        )
      })}
    </>

  )
}

export default Games