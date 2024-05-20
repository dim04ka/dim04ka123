import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

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
          <div key={item.numberGame} style={{ border: '1px solid red' }}>
            <div>Игра № {item.numberGame} </div>
            <div>{(item.date)}</div>

            <div>
              <span>{item.role}</span><span> </span><span>{item.judge}</span>
            </div>


            {/* <span>{item.status}</span> */}

            <Link to={`${item.id}`}>ЗАЙТИ</Link>
            <button onClick={() => deleteGame(item.numberGame)}>DELETE</button>
          </div>
        )
      })}
    </>

  )
}

export default Games