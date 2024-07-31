import { useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'
import { Item } from '../../interface'
import Select from "../../components/Select";
import { Role, IInfoGame } from "../../interface";
import { token } from '../../consts'
import { transformText, getIcon, getDate } from '../../utils'
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import useGames from "../../hooks/useGames";
import CircularProgress from '@mui/material/CircularProgress';
import './style.scss'

const RoleComponent = () => {
  let { id } = useParams();

  const navigate = useNavigate()

  const { games, updateGame, loading } = useGames()
  const [game, setGame] = useState<Item[]>([])
  const [infoGame, setInfoGame] = useState<IInfoGame>()
  const [formValues, setFormValues] = useState<Record<number, Item>>({})
  const [resultMatch, setResultMatch] = useState<string>('none')
  const [comment, setComment] = useState<string>('')
  const [checked, setChecked] = useState<Record<string, boolean>>({
    isShowRole: false,
    isShowPoint: false
  })
  const handleChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked })
  }

  useEffect(() => {
    const current_game = games.filter(game => game.id === id)
    const playersWithRole = current_game[0]?.playersWithRole.sort((a: Item, b: Item) => a.id - b.id)
    const result: any = {}
    if (playersWithRole?.length > 0) {
      for (let i = 1; i < playersWithRole.length + 1; i++) {
        const element = playersWithRole.find((el: Item) => el.id === i)
        if (element) {
          result[`${i}`] = { ...element, point: 0 }
        }
      }
    }

    setFormValues(result)
    setGame(playersWithRole)
    setInfoGame(current_game[0])
  }, [games, id])

  const getResultMatch = (): string => {
    if (checked.isShowRole) {
      return resultMatch === 'none' ? '' : resultMatch === 'red' ? 'Победа мирных' : 'Победа черных'
    }
    return ''
  }


  const message = async () => {

    try {
      const obj = {
         chat_id: '518174528', // home
        // chat_id: '-1001768320094', // work
        text: `
📆 ${getDate()}
▶️ Игра №: ${infoGame?.numberGame}
👨🏻‍⚖️ Ведущий: ${infoGame?.role} ${infoGame?.judge}

${Object.values(formValues).map(item => `${item.id}. ${transformText(item.userName)} ${checked.isShowRole ? getIcon(item.role) : ''}\n`).join('')}

${getResultMatch()}
${comment}`
      };
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })
      navigate('/games')

    } catch (err) {
    }

  }

  const handleChange = (id: number, role: Role) => {
    const current = game.filter(games => games.id === id)
    const res: Item = { ...current[0], role: role }

    if (infoGame && infoGame.id_doc) {
      updateGame(infoGame.id_doc, res)
    }
  }

  const onInputChanges = (id: number, point: string) => {
    // if (typeof id === 'number') {
    //   setFormValues((prevFormValues) => ({
    //     ...prevFormValues,
    //     [id as any]: {
    //       ...prevFormValues[id as any],
    //       point: Number(point) || 0,
    //     },
    //   }));
    // }
  }




  return (

    <form>
      <Typography variant='caption'> table:{id}</Typography>
      <FormGroup style={{ flexDirection: 'row' }}>
        <FormControlLabel
          control={<Checkbox name='isShowRole' checked={checked['isShowRole']} onChange={handleChangeRole} />}
          label="Роли"
        />
        <FormControlLabel
          control={<Checkbox name='isShowPoint' checked={checked['isShowPoint']} onChange={handleChangeRole} />}
          label="Очки"
        />
      </FormGroup>
      <hr />
      {
        loading ? <CircularProgress /> :
          game?.map((item: Item) => {
            return (
              <GameItem
                key={item.id}
                isShowRole={checked.isShowRole}
                isShowPoint={checked.isShowPoint}
                item={item}
                cbSelect={handleChange}
                onInputChanges={onInputChanges}
              />
            )
          })}
      <hr />

      {
        !checked.isShowRole ? null :
          <div className="result-game">
            <span>Победа &nbsp;</span>
            <select
              value={resultMatch}
              onChange={e => setResultMatch(e.target.value)}
            >
              <option value='none'>none</option>
              <option value='red'>Red</option>
              <option value='mafia'>Mafia</option>
            </select>
          </div>
      }


      <textarea placeholder="Комментарий к игре" value={comment} onChange={e => setComment(e.target.value)}></textarea>
      <hr />
      <Button variant="contained" onClick={message}>отправить в телегу</Button>
      {/* <Button variant="contained" onClick={handleClick}>сохранить</Button> */}
      {/* <h2>{JSON.stringify(formValues)}</h2> */}
    </form>


  )
}

export default RoleComponent;


export const GameItem = ({ isShowRole, isShowPoint, item, cbSelect, onInputChanges }:
  {
    item: Item, isShowRole: boolean, isShowPoint: boolean,
    cbSelect: (id: number, role: Role) => void, onInputChanges: (id: number, value: string) => void
  }) => {
  return (<div style={{ display: 'flex', marginBottom: 5 }}>
    <div style={{ marginRight: 5 }} >{item.id} {item.userName === '' ? 'пусто' : item.userName}</div>

    {isShowRole && <Select role={item.role} cb={(role) => cbSelect(item.id, role)} />}

    {/* {isShowPoint && <input type="number" step={0.1} style={{ width: '50px' }} value={item.point} onChange={(e) => onInputChanges(item.id, e.target.value)} />} */}

  </div>)
}
