import classNames from 'classnames'

import { Item } from '../../shared/domain/interface'

const ItemComponent = ({
    item,
    cb,
}: {
    item: Item
    cb: (item: Item) => void
}) => {
    const handleClick = () => {
        if (item.isBooked) {
            cb(item)
        }
    }

    return (
        <div
            onClick={handleClick}
            className={classNames({
                item: true,
                active: item.isBooked,
            })}
        >
            <div>
                <div>{item.id}</div>
                <div>{item.userName}</div>
            </div>
        </div>
    )
}

export default ItemComponent
