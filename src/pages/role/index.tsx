import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Checkbox, FormControlLabel, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import useGames from '@/hooks/useGames'
import { IInfoGame, Item, Role } from '@/shared/domain/interface'

import { GameItem } from './components/game-item'
import { useTelegramMessage } from './hooks/useTelegramMessage'
import {
    StyledDivider,
    StyledForm,
    StyledFormGroup,
    StyledResultGame,
    StyledResultSelect,
    StyledSubmitButton,
    StyledTextarea,
} from './styles'

type CheckedState = {
    isShowRole: boolean
}

type ResultMatch = 'none' | 'red' | 'mafia'

export const RolePage = () => {
    const { id } = useParams<{ id: string }>()

    const { games, updateGame, updateMultipleItems, loading } =
        useGames()
    const [game, setGame] = useState<Item[]>([])
    const [infoGame, setInfoGame] = useState<IInfoGame>()
    const [formValues, setFormValues] = useState<
        Record<number, Item>
    >({})
    const [resultMatch, setResultMatch] =
        useState<ResultMatch>('none')
    const [comment, setComment] = useState<string>('')
    const [checked, setChecked] = useState<CheckedState>({
        isShowRole: false,
    })
    const [draggedId, setDraggedId] = useState<number | null>(null)
    const [dragOverId, setDragOverId] = useState<number | null>(null)
    const [touchY, setTouchY] = useState<number | null>(null)
    const touchStartY = useRef<number | null>(null)
    const touchStartId = useRef<number | null>(null)

    const { sendMessage } = useTelegramMessage({
        formValues,
        infoGame,
        checked,
        resultMatch,
        comment,
    })

    const handleChangeRole = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setChecked((prev) => ({
            ...prev,
            [event.target.name]: event.target.checked,
        }))
    }

    useEffect(() => {
        const currentGame = games.find((game) => game.id === id)
        if (!currentGame) return

        const playersWithRole = [...currentGame.playersWithRole].sort(
            (a: Item, b: Item) => a.id - b.id
        )

        const result: Record<number, Item> = {}
        if (playersWithRole.length > 0) {
            for (let i = 1; i < playersWithRole.length + 1; i++) {
                const element = playersWithRole.find(
                    (el: Item) => el.id === i
                )
                if (element) {
                    result[i] = { ...element, point: 0 }
                }
            }
        }

        setFormValues(result)
        setGame(playersWithRole)
        setInfoGame(currentGame)
    }, [games, id])

    const handleRoleChange = (id: number, role: Role) => {
        const currentPlayer = game.find((player) => player.id === id)
        if (!currentPlayer || !infoGame?.id_doc) return

        const updatedPlayer: Item = { ...currentPlayer, role }
        updateGame(infoGame.id_doc, updatedPlayer)
    }

    const handleInputChange = (id: number, name: string) => {
        const currentPlayer = game.find((player) => player.id === id)
        if (!currentPlayer || !infoGame?.id_doc) return

        const updatedPlayer: Item = {
            ...currentPlayer,
            userName: name,
        }
        updateGame(infoGame.id_doc, updatedPlayer)
    }

    const handleDragStart = (id: number) => {
        setDraggedId(id)
    }

    const handleDragOver = (e: React.DragEvent, id: number) => {
        e.preventDefault()
        if (draggedId !== id) {
            setDragOverId(id)
        }
    }

    const handleDragLeave = () => {
        setDragOverId(null)
    }

    const handleDrop = (targetId: number) => {
        if (
            !draggedId ||
            draggedId === targetId ||
            !infoGame?.id_doc
        ) {
            setDraggedId(null)
            setDragOverId(null)
            return
        }

        const draggedItem = game.find(
            (player) => player.id === draggedId
        )
        const targetItem = game.find(
            (player) => player.id === targetId
        )

        if (!draggedItem || !targetItem) {
            setDraggedId(null)
            setDragOverId(null)
            return
        }

        const updatedDraggedItem: Item = {
            ...draggedItem,
            userName: targetItem.userName,
            role: targetItem.role,
        }

        const updatedTargetItem: Item = {
            ...targetItem,
            userName: draggedItem.userName,
            role: draggedItem.role,
        }

        updateMultipleItems(infoGame.id_doc, [
            updatedDraggedItem,
            updatedTargetItem,
        ])

        setDraggedId(null)
        setDragOverId(null)
    }

    const handleDragEnd = () => {
        setDraggedId(null)
        setDragOverId(null)
    }

    const handleTouchStart = (e: React.TouchEvent, id: number) => {
        e.preventDefault()
        touchStartY.current = e.touches[0].clientY
        touchStartId.current = id
        setDraggedId(id)
        setTouchY(e.touches[0].clientY)
    }

    useEffect(() => {
        const handleTouchMove = (e: TouchEvent) => {
            if (
                touchStartId.current === null ||
                touchStartY.current === null
            )
                return

            e.preventDefault()
            const currentTouchY = e.touches[0].clientY
            setTouchY(currentTouchY)

            const allItems =
                document.querySelectorAll('[data-item-id]')
            let targetId = touchStartId.current

            allItems.forEach((itemElement) => {
                const rect = itemElement.getBoundingClientRect()
                const id = parseInt(
                    itemElement.getAttribute('data-item-id') || '0'
                )

                if (
                    currentTouchY >= rect.top &&
                    currentTouchY <= rect.bottom &&
                    id !== touchStartId.current
                ) {
                    targetId = id
                }
            })

            if (targetId !== touchStartId.current) {
                setDragOverId(targetId)
            }
        }

        const handleTouchEnd = () => {
            if (touchStartId.current === null || draggedId === null)
                return

            if (dragOverId !== null && draggedId !== dragOverId) {
                handleDrop(dragOverId)
            }

            touchStartY.current = null
            touchStartId.current = null
            setDraggedId(null)
            setDragOverId(null)
            setTouchY(null)
        }

        if (draggedId !== null) {
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
    }, [draggedId, dragOverId, handleDrop])

    return (
        <StyledForm>
            <StyledFormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            name="isShowRole"
                            checked={checked.isShowRole}
                            onChange={handleChangeRole}
                            sx={{
                                '&.Mui-checked': {
                                    color: '#667eea',
                                },
                            }}
                        />
                    }
                    label="Показать роли"
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            fontWeight: 500,
                            fontSize: '14px',
                            color: '#333',
                        },
                    }}
                />
            </StyledFormGroup>
            <StyledDivider />
            {loading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '40px',
                    }}
                >
                    <CircularProgress />
                </div>
            ) : (
                game.map((item: Item) => (
                    <div key={item.id} data-item-id={item.id}>
                        <GameItem
                            isShowRole={checked.isShowRole}
                            item={item}
                            cbSelect={handleRoleChange}
                            changeValue={(name) =>
                                handleInputChange(item.id, name)
                            }
                            onDragStart={handleDragStart}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onDragEnd={handleDragEnd}
                            onTouchStart={(e) =>
                                handleTouchStart(e, item.id)
                            }
                            isDragging={draggedId === item.id}
                            isDragOver={dragOverId === item.id}
                            $touchY={
                                draggedId === item.id &&
                                touchY !== null
                                    ? touchY
                                    : null
                            }
                            $touchStartY={
                                draggedId === item.id &&
                                touchStartY.current !== null
                                    ? touchStartY.current
                                    : null
                            }
                        />
                    </div>
                ))
            )}
            <StyledDivider />

            {checked.isShowRole && (
                <StyledResultGame>
                    <span style={{ fontWeight: 600, color: '#333' }}>
                        Победа:
                    </span>
                    <StyledResultSelect
                        value={resultMatch}
                        onChange={(e) =>
                            setResultMatch(
                                e.target.value as ResultMatch
                            )
                        }
                    >
                        <option value="none">Не выбрано</option>
                        <option value="red">Красные</option>
                        <option value="mafia">Мафия</option>
                    </StyledResultSelect>
                </StyledResultGame>
            )}

            <StyledTextarea
                placeholder="Комментарий к игре..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <StyledDivider />
            <StyledSubmitButton
                variant="contained"
                onClick={sendMessage}
            >
                отправить в телегу
            </StyledSubmitButton>
        </StyledForm>
    )
}
