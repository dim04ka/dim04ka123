import { Item } from './interface'
import classNames from 'classnames';
import { useState } from 'react';
import ItemComponent from './ItemComponent';

export const List = ({ items }: { items: Item[] }) => {

  console.log('items', items)


  return (
    <>
      {
        items.map(item => <ItemComponent item={item} key={item.id} />)
      }
    </>
  )

}

export default List