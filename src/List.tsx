import { Item } from './interface'
import classNames from 'classnames';

export const List = ({ items }: { items: Item[] }) => {
  console.log('items', items)

  return (
    <>
      {
        items.map(item => <div className={classNames({ 'item': true, 'active': item.isBooked })} key={item.id}>

          <div>
            <div>{item.id}</div>
            <span> {item.userName}</span>
          </div>
        </div>)
      }
    </>
  )

}

export default List