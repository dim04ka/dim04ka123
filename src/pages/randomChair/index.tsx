import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Item } from '../../interface'
import List from '../../List';
import { token } from '../../consts'
import { transformText, shuffle } from '../../utils'
import Button from '@mui/material/Button';
const initial: Item[] = []

for (let i = 1; i < 11; i++) {
  initial.push({
    id: i,
    isBooked: false,
    userName: '',
    role: 'red',
    point: 0,

  })
}

const RandomChair = () => {
  let navigate = useNavigate();
  const [items, setItems] = React.useState<Item[]>(initial)
  const [numbers, setNumbers] = React.useState<number[]>([])
  const [userName, setUserName] = React.useState<string>('')
  const [role, setRole] = React.useState<string>('Г-н')

  const [edit, setEdit] = React.useState<Item | null>(null)
  const [value, setValue] = React.useState<string>('')

  const [numberGame, setNumberGame] = React.useState<string>('')
  const [judge, setJudge] = React.useState<string>('')

  const refInput = React.useRef<HTMLInputElement>(null)




  useEffect(() => {
    const valueItems = localStorage.getItem('items')
    const valueNumbers = localStorage.getItem('numbers')
    if (valueNumbers) {
      setNumbers(JSON.parse(valueNumbers))
    }
    if (valueItems) {
      // console.log('valueItems', JSON.parse(valueItems))
      setItems(JSON.parse(valueItems))
    }
  }, [])

  useEffect(() => {
    refInput.current?.focus()
  }, [])

  const getNumber = (e: any) => {
    e.preventDefault();
    console.log(111)

    function getRandomNumber(): void {
      const randomValue = Math.floor(Math.random() * 10) + 1

      if (numbers.includes(randomValue)) {
        return getRandomNumber()
      } else {
        const valueNumbers = [...numbers, randomValue]
        localStorage.setItem('numbers', JSON.stringify(valueNumbers))
        setNumbers(valueNumbers)
        const list = items.map(item => {
          if (item.id === randomValue) {
            return {
              ...item,
              isBooked: true,
              userName: userName
            }
          }
          return item
        })
        localStorage.setItem('items', JSON.stringify(list))

        setItems(list)
      }
    }
    getRandomNumber()
    setUserName('')
    refInput.current?.focus()


  }

  const handleChange = (e: any) => {
    if (numbers.length !== 10) {
      setUserName(e.target.value)
    }
  }

  const cb = (item: Item) => {
    setEdit(item)
    setValue(item.userName)
  }

  const handleEdit = (e: any) => {
    setValue(e.target.value)
    // const value = { ...edit, userName: e.target.value.length ? e.target.value : '' }
    // setEdit(value)


  }

  const handleSave = () => {
    const list = items.map(item => {
      if (item.id === edit?.id) {
        return {
          ...item,
          userName: value
        }
      }
      return item
    })
    localStorage.setItem('items', JSON.stringify(list))
    setItems(list)

    setEdit(null)
  }



  const handleSubmit = async (e: any) => {
    e.preventDefault();
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
▶️ Игра №: ${numberGame}
👨🏻‍⚖️ Ведущий: ${role} ${judge}

${items.map(item => `${item.id}. ${transformText(item.userName)}\n`).join('')}
      `
    };

    // await fetch(`https://api.telegram.org/bot${token}/getUpdates`).then((res) => {

    //   const response = res.json()
    //   console.log(response)
    // })



    // Перемешиваем массив игроков
    const players = shuffle([...items]);
    const playersWithRole: Item[] = players.map(item => ({ ...item, role: 'red' }))


    // Назначаем роли: первые три - "mafia", остальные - "red"
    for (let i = 0; i < playersWithRole.length; i++) {
      if (i === 0) playersWithRole[i].role = 'mafia';
      if (i === 1) playersWithRole[i].role = 'mafia';
      if (i === 2) playersWithRole[i].role = 'don';
      if (i === 3) playersWithRole[i].role = 'sherif';
      if (i > 3) playersWithRole[i].role = 'red';
    }

    const gameCreated = localStorage.getItem('gameCreated');
    const dateNow = Date.now()
    if (gameCreated) {
      const games = JSON.parse(gameCreated);
      localStorage.setItem('gameCreated', JSON.stringify([...games, { judge, role, numberGame, date: getDate(), id: dateNow, status: 'working', playersWithRole }]));
    } else {
      localStorage.setItem('gameCreated', JSON.stringify([{ judge, role, numberGame, date: getDate(), id: dateNow, status: 'working', playersWithRole }]));
    }

    // await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(obj)
    // }).then(res => {
    //   if (res.status === 200) {
    //     setNumbers([])
    //     setItems(() => initial)
    //     navigate('/games')
    //   }
    // })
    setNumbers([])
    setItems(() => initial)
    navigate('/games')


  }

  const handleChangeType = (value: any) => {
    setRole(value.target.value) // Г-н/Г-жа
  }


  const getDate = () => {
    return new Date().getHours() + ':' + new Date().getMinutes()
  }

  const shake = () => {
    const players = shuffle([...items]);
    const result = players.map((elem, inx) => {
      return {
        ...elem,
        id: inx + 1
      }
    })
    setItems(result)
    localStorage.setItem('items', JSON.stringify(result))
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className='wrapper'>
          <List items={items} cb={cb} />
        </div>

        <form className="button">
          <div>
            {edit && (
              <>
                <span>
                  <input type='text' value={value} onChange={handleEdit}></input>
                </span>
                <button onClick={handleSave} className='button__submit-changes'><i className="fa fa-check" aria-hidden="true"></i></button>
              </>

            )}
          </div>
          {
            (
              !edit && numbers.length !== 10 && <input

                type="text"
                value={userName}
                onChange={handleChange} ref={refInput}
              ></input>
            )
          }


          {numbers.length !== 10 && !edit && (<button className='button__random' onClick={getNumber} disabled={numbers.length === 10}>random</button>)}

          {
            numbers.length === 10 && (
              <div>


                <div className='input'>
                  <label>Игра №</label>
                  <input type='text' value={numberGame} onChange={(e) => setNumberGame(e.target.value)} />
                </div>
                <div className='input'>
                  <label>Ведущий:</label>
                  <select onChange={handleChangeType}>
                    <option value='Г-н'>Г-н</option>
                    <option value='Г-жа'>Г-жа</option>
                  </select>
                  <input type='text' value={judge} onChange={(e) => setJudge(e.target.value)} />
                </div>

                <button className='button__submit' onClick={handleSubmit}><i className="fa fa-check-square" aria-hidden="true"></i></button>
              </div>
            )
          }
          <button className='button__clean' onClick={(e: any) => {
            e.preventDefault();
            setNumbers([])
            setItems(() => initial)
            setEdit(null)
            localStorage.setItem('items', JSON.stringify(initial))
            localStorage.setItem('numbers', JSON.stringify([]))
          }}><i className="fa fa-trash-o"></i></button>

          {numbers.length === 10 && !edit && <Button variant="contained" onClick={shake}>Перемешать</Button>}
        </form>


      </header>
    </div>
  )
}
export default RandomChair

