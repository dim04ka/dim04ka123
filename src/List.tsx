import { Item } from './interface'
import ItemComponent from './components/Item'

export const List = ({ items, cb }: { items: Item[], cb: (item: Item) => void }) => {

  const callback = (item: Item) => cb(item)

  return (
    <>
      {items.map(item => <ItemComponent cb={callback} item={item} key={item.id} />)}
    </>
  )

}

export default List