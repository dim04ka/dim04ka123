import { Item } from '@/shared/domain/interface'

import { ItemComponent } from '../item'

export const List = ({
    items,
    cb,
    edit,
}: {
    items: Item[]
    cb: (item: Item) => void
    edit: Item | null
}) => {
    const callback = (item: Item) => cb(item)

    return (
        <>
            {items.map((item) => (
                <ItemComponent
                    cb={callback}
                    edit={edit}
                    item={item}
                    key={item.id}
                />
            ))}
        </>
    )
}
