import { collection } from "firebase/firestore"
import { useEffect } from "react"
import { db } from "../../firestore/config"
import { getDocs } from "firebase/firestore"
import { useState } from "react"
import { Item, IProject } from "../../interface"
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

const Stats = () => {
  const [items, setItems] = useState<IProject[]>([])
  const [loading, setLoading] = useState(false)

  const value = collection(db, "mafia")

  async function getData() {
    setLoading(true)
    const querySnapshot = await getDocs(value)
    const projects = querySnapshot.docs.map(doc => doc.data());
    setItems(projects as IProject[])
    setLoading(false)
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Typography variant='h5'>Статистика игр</Typography>

      {loading ? <CircularProgress /> :
        items.map((item) => {
          return (
            <div key={item.id} style={{ border: '1px solid red' }}>
              <p>ID игры: {item.id}</p>
              <p>Победа: {item.resultMatch}</p>
              <p>Комментарий: {item.comment}</p>
              <p>{Object.values(item.formValues).map((elem: Item) => `${elem.userName}(${(elem.role)}) ${elem.point};`).join(' ')}</p>
            </div>
          )
        })
      }
    </>
  )
}

export default Stats