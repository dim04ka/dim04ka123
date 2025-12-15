import { useEffect, useState } from 'react'
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

    const { games, updateGame, loading } = useGames()
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
                    <GameItem
                        key={item.id}
                        isShowRole={checked.isShowRole}
                        item={item}
                        cbSelect={handleRoleChange}
                        changeValue={(name) =>
                            handleInputChange(item.id, name)
                        }
                    />
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
