
import { Link } from "react-router-dom";
import './style.scss'
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useGames } from '../../hooks/useGames'
import { IInfoGame } from "../../interface";
import CircularProgress from '@mui/material/CircularProgress';

const Games = () => {
  const { games, loading, deleteGame } = useGames()
    // const sortedItems = games.sort((a, b) => {
    //     return Date.parse(a.date) - Date.parse(b.date);
    // });
    const sortedItems = games.sort((b, a) => {
        const [hoursA, minutesA] = a.date.split(':').map(Number);
        const [hoursB, minutesB] = b.date.split(':').map(Number);

        return hoursA - hoursB || minutesA - minutesB;
    });
  return (
    <>
      <h1>Игры вечера</h1>
        {
            games.length === 0 ? <div>Нет начавшихся игр</div> : null
        }
        {
            loading ? <CircularProgress /> : sortedItems.map((item: IInfoGame) => {
            return (
              <div key={item.id} className="game">
                <Link to={`${item.id}`} style={{textDecoration: 'none'}}>
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
