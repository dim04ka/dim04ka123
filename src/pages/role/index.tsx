import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { IGame, Item } from '../../interface'
import Select from "../../components/Select";
import { addDoc, collection } from "firebase/firestore";
import { Role, IInfoGame } from "../../interface";
import { token } from '../../consts'
import { transformText, getIcon, getDate } from '../../utils'
import { useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import Button from '@mui/material/Button';


import { db } from '../../firestore/config'
const RoleComponent = () => {
  let { id } = useParams();
  const [game, setGame] = useState<Item[]>([])

  const [formValues, setFormValues] = useState<Record<number, Item>>({})

  const [resultMatch, setResultMatch] = useState<string>('none')
  const [comment, setComment] = useState<string>('')
  let navigate = useNavigate();


  useEffect(() => {
    const items = localStorage.getItem('gameCreated');
    const games = items && JSON.parse(items);
    const game = games && games.find((item: IGame) => item.id === Number(id))
    const temp: Item[] = game.playersWithRole.sort((a: Item, b: Item) => a.id - b.id)

    const result: any = {}

    for (let i = 1; i < temp.length + 1; i++) {
      const element = temp.find((el: Item) => el.id === i)
      if (element) {
        result[`${i}`] = { ...element, point: isWinMatch(element.role) }
      }
    }

    const values: Item[] = []
    for (const key in result) {
      values.push(result[key])
    }

    setFormValues(result)
    setGame(values)
  }, [resultMatch])

  useEffect(() => {
    const items = localStorage.getItem('gameCreated');
    const games = items && JSON.parse(items);
    const game = games && games.find((item: IGame) => item.id === Number(id))
    const temp: Item[] = game.playersWithRole.sort((a: Item, b: Item) => a.id - b.id)

    const result: any = {}
    if (temp) {
      for (let i = 1; i < temp.length + 1; i++) {
        const element = temp.find((el: Item) => el.id === i)
        if (element) {
          result[`${i}`] = { ...element, point: isWinMatch(element.role) }
        }
      }
      setFormValues(result)
      setGame(temp)
    }
  }, [])

  const isWinMatch = (role: Role) => {
    if (role === 'mafia' || role === 'don') {
      return resultMatch === 'mafia' ? 1 : 0.3
    }
    if (role === 'sherif' || role === 'red') {
      return resultMatch === 'red' ? 1 : 0.3
    }
  }

  const handleClick = async () => {

    try {
      await addDoc(collection(db, 'mafia'), { id, formValues, comment, resultMatch, date: new Date() })
      const gameCreated = localStorage.getItem('gameCreated');
      const items = localStorage.getItem('gameCreated');
      const games = items && JSON.parse(items);
      const infoGame: IInfoGame = games && games.find((item: IGame) => item.id === Number(id))
      if (typeof gameCreated === 'string') {
        const games = JSON.parse(gameCreated);
        const newItems = games.filter((item: Item) => item.id !== infoGame.id)
        localStorage.setItem('gameCreated', JSON.stringify(newItems))
        navigate('/games')

      }




      //       const obj = {
      //         chat_id: '518174528', // home
      //         // chat_id: '-1001768320094', // work
      //         text:
      //           `
      // 📆 ${getDate()}
      // ▶️ Игра №: ${infoGame.numberGame}
      // 👨🏻‍⚖️ Ведущий: ${infoGame.role} ${infoGame.judge}

      // ${Object.values(formValues).map(item => `${item.id}. ${transformText(item.userName)} ${getIcon(item.role)}\n`).join('')}

      // ${resultMatch === 'red' ? 'Победа мирных' : 'Победа черных'}
      // ${comment}`
      //       };

      // await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(obj)
      // }).then(res => {
      //   if (res.status === 200) {
      //     const gameCreated = localStorage.getItem('gameCreated');
      //     if (typeof gameCreated === 'string') {
      //       const games = JSON.parse(gameCreated);
      //       const newItems = games.filter((item: Item) => item.id !== infoGame.id)
      //       localStorage.setItem('gameCreated', JSON.stringify(newItems))
      //       navigate('/games')

      //     }
      //   }
      // })

    } catch (err) {
    }
  }

  const message = async () => {

    try {
      const items = localStorage.getItem('gameCreated');
      const games = items && JSON.parse(items);
      const infoGame: IInfoGame = games && games.find((item: IGame) => item.id === Number(id))



      const obj = {
        // chat_id: '518174528', // home
        chat_id: '-1001768320094', // work
        text:
          `
📆 ${getDate()}
▶️ Игра №: ${infoGame.numberGame}
👨🏻‍⚖️ Ведущий: ${infoGame.role} ${infoGame.judge}

${Object.values(formValues).map(item => `${item.id}. ${transformText(item.userName)} ${checked.isShowRole ? getIcon(item.role) : ''}\n`).join('')}

${resultMatch === 'none' ? '' : resultMatch === 'red' ? 'Победа мирных' : 'Победа черных'}
${comment}`
      };
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })

    } catch (err) {
    }

  }

  const handleChange = (id: number, role: Role) => {
    if (typeof id === 'number') {
      setFormValues({ ...formValues, [id]: { ...formValues[id], role } })
    } else {
      console.error('Invalid id type. Expected a number.');
    }
  }

  const onInputChanges = (id: number, point: string) => {
    if (typeof id === 'number') {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [id as any]: {
          ...prevFormValues[id as any],
          point: Number(point) || 0,
        },
      }));
    }


  }

  const [checked, setChecked] = useState<Record<string, boolean>>({
    isShowRole: false,
    isShowPoint: false
  })
  const handleChangeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked })
  }

  return (
    <>
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
      {game.map((item: Item) => {
        return (
          <GameItem
            key={item.id}
            isShowRole={checked.isShowRole}
            isShowPoint={checked.isShowPoint}
            item={item}
            cbSelect={handleChange}
            onInputChanges={onInputChanges}
            formValues={formValues} />
        )
      })}
      <hr />
      <div>
        <span>Победа</span>
        <select
          value={resultMatch}
          onChange={e => setResultMatch(e.target.value)}
        >
          <option value='none'>none</option>
          <option value='red'>Red</option>
          <option value='mafia'>Mafia</option>
        </select>
      </div>

      <textarea placeholder="Комментарий к игре" value={comment} onChange={e => setComment(e.target.value)}></textarea>
      <hr />
      <Button variant="contained" onClick={message}>отправить в телегу</Button>
      {/* <Button variant="contained" onClick={handleClick}>сохранить</Button> */}
    </>
  )
}

export default RoleComponent;


export const GameItem = ({ isShowRole, isShowPoint, item, formValues, cbSelect, onInputChanges }: { isShowRole: boolean, isShowPoint: boolean, item: Item, formValues: Record<number, Item>, cbSelect: (id: number, role: Role) => void, onInputChanges: (id: number, value: string) => void }) => {
  return (<div style={{ display: 'flex', marginBottom: 5 }}>
    <div style={{ marginRight: 5 }} >{item.id} {item.userName === '' ? 'пусто' : item.userName}</div>
    {isShowRole && <Select role={item.role} cb={(role) => cbSelect(item.id, role)} />}

    {isShowPoint && <input type="number" step={0.1} style={{ width: '50px' }} value={formValues[item.id]?.point} onChange={(e) => onInputChanges(item.id, e.target.value)} />}
  </div>)
}