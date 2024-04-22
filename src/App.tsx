import React, { ChangeEventHandler, useEffect } from 'react';
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

  const refInput = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
    refInput.current?.focus()
  }, [])

  const getNumber = () => {
    function getRandomNumber(): void {
      const randomValue = Math.floor(Math.random() * 10) + 1

      if (numbers.includes(randomValue)) {
        return getRandomNumber()
      } else {
        setNumbers(numbers => [...numbers, randomValue])
        setItems(items => items.map(item => {
          if (item.id === randomValue) {
            return {
              ...item,
              isBooked: true,
              userName: userName
            }
          }
          return item
        }))
      }
    }
    getRandomNumber()
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

  return (
    <div className="App">
      <header className="App-header">
        <div className='wrapper'>
          <List items={items} />
        </div>

        <div className="button">
          <input
            disabled={numbers.length === 10}
            type="text"
            value={userName}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                getNumber()
              }
            }}
            onChange={handleChange} ref={refInput}
          ></input>
          <button className='button__random' onClick={getNumber} disabled={numbers.length === 10}>random</button>

          {
            numbers.length === 10 && (
              <div>
                <button className='button__clean' onClick={() => {
                  setNumbers([])
                  setItems(() => initial)
                }}>clean</button>
                <button className='button__submit' onClick={() => {
                  console.log(items)
                  // TODO: запрос на telegram c отправкой данных
                }}>submit</button>
              </div>
            )
          }
          {/* <button className='button__clear' disabled={numbers.length === 0} onClick={handleClean}><i className="fa fa-trash-o"></i></button> */}
        </div>

      </header>
    </div>
  );
}

export default App;
