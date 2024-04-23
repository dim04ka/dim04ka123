import { Item } from './interface'
import classNames from 'classnames';
import { useState } from 'react';
import ItemComponent from './ItemComponent';

export const List = ({ items, cb }: { items: Item[], cb: (item: Item) => void }) => {

  console.log('items', items)

  const callback = (item: Item) => {
    cb(item)
  }


  return (
    <>
      {
        items.map(item => <ItemComponent cb={callback} item={item} key={item.id} />)
      }
    </>
  )

}

export default List