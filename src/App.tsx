import React, { useEffect } from 'react';
import './App.css';
import { Item } from './interface'
import List from './List';

const initial: Item[] = []

for (let i = 1; i < 11; i++) {
  initial.push({
    id: i,
    isBooked: false,
    userName: ''
  })
}
function App() {
  const [items, setItems] = React.useState<Item[]>(initial)
  const [numbers, setNumbers] = React.useState<number[]>([])
  const [userName, setUserName] = React.useState<string>('')

  const [edit, setEdit] = React.useState<Item | null>(null)
  const [value, setValue] = React.useState<string>('')

  const [numberGame, setNumberGame] = React.useState<string>('')
  const [judge, setJudge] = React.useState<string>('')

  const refInput = React.useRef<HTMLInputElement>(null)


  const token = '7194656560:AAFgAoib6UVKqvhUXP0rTqmjA6wKJP5ufjA'

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

  const getNumber = () => {
    (function getRandomNumber(): void {
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
    })()
    setUserName('')
    refInput.current?.focus()


  }

  // const handleClean = () => {
  //   console.log('clean')
  //   setNumbers([])
  //   setItems(() => initial)
  // }

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

  const transformText = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  const handleSubmit = async () => {
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
👨🏻‍⚖️ Судья: г-ин ${judge}

${items.map(item => `${item.id}. ${transformText(item.userName)}\n`).join('')}
      `
    };

    // await fetch(`https://api.telegram.org/bot${token}/getUpdates`).then((res) => {

    //   const response = res.json()
    //   console.log(response)
    // })

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(res => {
      if (res.status === 200) {
        setNumbers([])
        setItems(() => initial)
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='wrapper'>
          <List items={items} cb={cb} />
        </div>

        <div className="button">
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    getNumber()
                  }
                }}
                onChange={handleChange} ref={refInput}
              ></input>
            )
          }


          {numbers.length !== 10 && (<button className='button__random' onClick={getNumber} disabled={numbers.length === 10}>random</button>)}

          {
            numbers.length === 10 && (
              <div>


                <div className='input'>
                  <label>Игра №</label>
                  <input type='text' value={numberGame} onChange={(e) => setNumberGame(e.target.value)} />
                </div>
                <div className='input'>
                  <label>Судья:</label>
                  <input type='text' value={judge} onChange={(e) => setJudge(e.target.value)} />
                </div>

                <button className='button__submit' onClick={handleSubmit}><i className="fa fa-check-square" aria-hidden="true"></i></button>
              </div>
            )
          }

        </div>
        <button className='button__clean' onClick={() => {
          setNumbers([])
          setItems(() => initial)
          localStorage.setItem('items', JSON.stringify(initial))
          localStorage.setItem('numbers', JSON.stringify([]))
        }}><i className="fa fa-trash-o"></i></button>

      </header>
    </div>
  );
}

export default App;
