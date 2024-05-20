import { ChangeEvent, useEffect, useState } from "react";
import { Routes, Route, useParams } from 'react-router-dom'
import { IGame, Item } from '../../interface'
import Select from "../../components/Select";
import { addDoc, collection } from "firebase/firestore";
import { Role, IInfoGame } from "../../interface";
import { token } from '../../consts'
import { transformText } from '../../utils'
import { useNavigate } from "react-router-dom";

import { db } from '../../firestore/config'
const RoleComponent = () => {
  let { id } = useParams();
  const [game, setGame] = useState<Item[]>([])

  const [formValues, setFormValues] = useState<Record<number, Item>>({})

  const [resultMatch, setResultMatch] = useState<'red' | 'mafia'>('mafia')
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

  const getIcon = (role: Role) => {
    if (role === 'don') return '⬛️';
    if (role === 'sherif') return '👌'
    if (role === 'mafia') return '⚫️'
    return ''
  }

  const handleClick = async () => {

    try {
      await addDoc(collection(db, 'mafia'), { id, formValues, comment, resultMatch, date: new Date() })



      const items = localStorage.getItem('gameCreated');
      const games = items && JSON.parse(items);
      const infoGame: IInfoGame = games && games.find((item: IGame) => item.id === Number(id))

      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;

      const textDate = `${formattedDay}.${formattedMonth}.${year}`;
      const obj = {
        // chat_id: '518174528',
        chat_id: '-1001768320094',
        text:
          `
📆 ${textDate}
▶️ Игра №: ${infoGame.numberGame}
👨🏻‍⚖️ Ведущий: ${infoGame.role} ${infoGame.judge}

${Object.values(formValues).map(item => `${item.id}. ${transformText(item.userName)}(${item.point}) ${getIcon(item.role)}\n`).join('')}

${resultMatch === 'red' ? 'Победа мирных' : 'Победа черных'}
${comment}`
      };

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      }).then(res => {
        if (res.status === 200) {
          const gameCreated = localStorage.getItem('gameCreated');
          if (typeof gameCreated === 'string') {
            const games = JSON.parse(gameCreated);
            const newItems = games.filter((item: Item) => item.id !== infoGame.id)
            localStorage.setItem('gameCreated', JSON.stringify(newItems))
            navigate('/games')

          }
        }
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
  return (
    <>
      <div> table:{id}</div>
      {game.map((item: Item) => {
        return (<div style={{ display: 'flex' }} key={item.id}>
          <div> {item.userName === '' ? 'пусто' : item.userName}</div>
          <Select role={item.role} cb={(role) => handleChange(item.id, role)} />

          <input type="number" step={0.1} style={{ width: '50px' }} value={formValues[item.id]?.point} onChange={(e) => onInputChanges(item.id, e.target.value)} />
        </div>)
      })}
      <hr />
      <div>
        <span>Победа</span>
        <select
          value={resultMatch}
          onChange={e => setResultMatch(e.target.value as 'mafia' | 'red')}
        >
          <option value='red'>Red</option>
          <option value='mafia'>Mafia</option>
        </select>
      </div>

      <textarea placeholder="Комментарий к игре" value={comment} onChange={e => setComment(e.target.value)}></textarea>
      <hr />
      <button onClick={handleClick}>отправить результат</button>
    </>
  )
}

export default RoleComponent;

