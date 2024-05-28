
import { Link } from "react-router-dom";
import './style.scss'
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useGames } from '../../hooks/useGames'
import { IInfoGame } from "../../interface";
import CircularProgress from '@mui/material/CircularProgress';

const Games = () => {
  const { games, loading, deleteGame } = useGames()
  return (
    <>
      <h1>Игры вечера</h1>
      {
        loading ? <CircularProgress /> :
          games.map((item: IInfoGame) => {
            return (
              <div key={item.id} className="game">
                <Link to={`${item.id}`}>
                  <div><Typography variant='button'>Игра № {item.numberGame} </Typography></div>
                  <Typography variant='body2'>{(item.date)} </Typography>

                  <Typography variant='body2'>
                    <span>{item.role}</span><span> </span><span>{item.judge}</span>
                  </Typography>

                </Link>
                <Button variant="contained" onClick={() => deleteGame(item.id_doc!)}>Удалить</Button>
              </div>
            )
          })
      }
    </>

  )
}

export default Games