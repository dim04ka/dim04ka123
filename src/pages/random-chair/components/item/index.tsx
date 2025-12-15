import { Item } from '@/shared/domain/interface'

import {
    StyledEditIcon,
    StyledItem,
    StyledItemContent,
    StyledItemId,
    StyledItemName,
} from './styles'

export const ItemComponent = ({
    cb,
    edit,
    item,
}: {
    cb: (item: Item) => void
    edit: Item | null
    item: Item
}) => {
    const handleEditClick = () => {
        cb(item)
    }

    const $isEditing = edit?.id === item.id

    return (
        <StyledItem $isActive={item.isBooked} $isEditing={$isEditing}>
            <StyledItemContent>
                <StyledItemId>{item.id}.</StyledItemId>
                <StyledItemName>{item.userName}</StyledItemName>
            </StyledItemContent>
            {item.isBooked && (
                <StyledEditIcon onClick={handleEditClick}>
                    <i
                        className="fa fa-pencil"
                        aria-hidden="true"
                    ></i>
                </StyledEditIcon>
            )}
        </StyledItem>
    )
}
