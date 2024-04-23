import { Item } from './interface'
import { useState } from 'react'
import classNames from 'classnames';

const ItemComponent = ({ item, cb }: { item: Item, cb: (item: Item) => void }) => {
  const [value, setValue] = useState<string>(item.userName)
  const [edit, setEdit] = useState<boolean>(false)

  const handleClick = () => {
    if (item.isBooked) {
      cb(item)
    }
  }

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  return (
    <div onClick={handleClick} className={classNames({ 'item': true, 'active': item.isBooked })}>
      <div>
        <div>{item.id}</div>
        <div>{item.userName}</div>
      </div>
    </div>
  )

}

export default ItemComponent