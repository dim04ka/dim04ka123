import { Item } from './interface'
import { useState } from 'react'
import classNames from 'classnames';

const ItemComponent = ({ item }: { item: Item }) => {
  const [value, setValue] = useState<string>(item.userName)
  const [edit, setEdit] = useState<boolean>(false)

  const handleClick = () => {
    console.log('item.userName', item.userName)
    if (item.isBooked) {
      setEdit(true)
    }
  }

  const handleChange = (e: any) => {
    setValue(e.target.value)
  }

  return (
    <div onClick={handleClick} className={classNames({ 'item': true, 'active': item.isBooked })}>
      <div>
        <div>{item.id}</div>
        {edit ? <input type="text" value={value} onChange={handleChange}>{value}</input> : <div>{item.userName}</div>}
      </div>
    </div>
  )

}

export default ItemComponent