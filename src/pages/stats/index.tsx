import { collection } from "firebase/firestore"
import { useEffect } from "react"
import { db } from "../../firestore/config"
import { getDocs } from "firebase/firestore"
import { useState } from "react"
import { Item, IProject } from "../../interface"

const Stats = () => {
  const [items, setItems] = useState<IProject[]>([])

  const value = collection(db, "mafia")

  async function getData() {
    const querySnapshot = await getDocs(value)
    const projects = querySnapshot.docs.map(doc => doc.data());
    console.log(projects)
    setItems(projects as IProject[])

  }
  useEffect(() => {
    getData()

  }, [])

  return (
    <>
      <h1>Stats</h1>

      {
        items.map((item) => {
          return (
            <div key={item.id} style={{ border: '1px solid red' }}>
              <p>{item.id}</p>
              <p>{item.comment}</p>
              <p>{item.resultMatch}</p>
              <p>{Object.values(item.formValues).map((elem: Item) => `${elem.userName}(${elem.role}) ${elem.point}`).join(' ')}</p>
            </div>
          )
        })
      }
    </>
  )
}

export default Stats