import { useEffect, useRef, useState } from 'react'

import { Item } from '@/shared/domain/interface'

import { ItemComponent } from '../item'
import { StyledListItemWrapper } from './styles'

export const List = ({
    items,
    cb,
    edit,
    onReorder,
    $isAllFilled,
}: {
    items: Item[]
    cb: (item: Item) => void
    edit: Item | null
    onReorder: (fromIndex: number, toIndex: number) => void
    $isAllFilled: boolean
}) => {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(
        null
    )
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(
        null
    )
    const [touchY, setTouchY] = useState<number | null>(null)
    const touchStartY = useRef<number | null>(null)
    const touchStartIndex = useRef<number | null>(null)
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])

    const callback = (item: Item) => cb(item)

    const handleDragStart = (index: number) => {
        setDraggedIndex(index)
    }

    const handleDragEnd = () => {
        setDraggedIndex(null)
        setDragOverIndex(null)
    }

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
        if (draggedIndex !== null && draggedIndex !== index) {
            setDragOverIndex(index)
        }
    }

    const handleDragLeave = () => {
        setDragOverIndex(null)
    }

    const handleDrop = (e: React.DragEvent, index: number) => {
        e.preventDefault()
        if (
            $isAllFilled &&
            draggedIndex !== null &&
            draggedIndex !== index
        ) {
            onReorder(draggedIndex, index)
        }
        setDraggedIndex(null)
        setDragOverIndex(null)
    }

    const handleTouchStart = (e: React.TouchEvent, index: number) => {
        if ($isAllFilled === false) return
        e.preventDefault()
        touchStartY.current = e.touches[0].clientY
        touchStartIndex.current = index
        setDraggedIndex(index)
        setTouchY(e.touches[0].clientY)
    }

    useEffect(() => {
        const handleTouchMove = (e: TouchEvent) => {
            if (
                $isAllFilled === false ||
                touchStartIndex.current === null ||
                touchStartY.current === null
            )
                return

            e.preventDefault()
            const currentTouchY = e.touches[0].clientY
            setTouchY(currentTouchY)

            const allItems = document.querySelectorAll(
                '[data-item-index]'
            )
            let targetIndex = touchStartIndex.current

            allItems.forEach((itemElement) => {
                const rect = itemElement.getBoundingClientRect()
                const idx = parseInt(
                    itemElement.getAttribute('data-item-index') || '0'
                )

                if (
                    currentTouchY >= rect.top &&
                    currentTouchY <= rect.bottom &&
                    idx !== touchStartIndex.current
                ) {
                    targetIndex = idx
                }
            })

            if (targetIndex !== touchStartIndex.current) {
                setDragOverIndex(targetIndex)
            }
        }

        const handleTouchEnd = () => {
            if (
                $isAllFilled === false ||
                touchStartIndex.current === null ||
                draggedIndex === null
            )
                return

            if (
                dragOverIndex !== null &&
                draggedIndex !== dragOverIndex
            ) {
                onReorder(draggedIndex, dragOverIndex)
            }

            touchStartY.current = null
            touchStartIndex.current = null
            setDraggedIndex(null)
            setDragOverIndex(null)
            setTouchY(null)
        }

        if (draggedIndex !== null) {
            document.addEventListener('touchmove', handleTouchMove, {
                passive: false,
            })
            document.addEventListener('touchend', handleTouchEnd, {
                passive: true,
            })

            return () => {
                document.removeEventListener(
                    'touchmove',
                    handleTouchMove
                )
                document.removeEventListener(
                    'touchend',
                    handleTouchEnd
                )
            }
        }
    }, [draggedIndex, $isAllFilled, dragOverIndex, onReorder])

    return (
        <>
            {items.map((item, index) => (
                <StyledListItemWrapper
                    key={item.id}
                    data-item-index={index}
                    ref={(el) => {
                        itemRefs.current[index] = el
                    }}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                >
                    <ItemComponent
                        cb={callback}
                        edit={edit}
                        item={item}
                        index={index}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onTouchStart={(e) =>
                            handleTouchStart(e, index)
                        }
                        $isDragOver={dragOverIndex === index}
                        $isAllFilled={$isAllFilled}
                        $touchY={
                            draggedIndex === index && touchY !== null
                                ? touchY
                                : null
                        }
                        $touchStartY={
                            draggedIndex === index &&
                            touchStartY.current !== null
                                ? touchStartY.current
                                : null
                        }
                    />
                </StyledListItemWrapper>
            ))}
        </>
    )
}
