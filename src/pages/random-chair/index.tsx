import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useGames from '@/hooks/useGames'
import { Item } from '@/shared/domain/interface'
import { shuffle } from '@/shared/utils'

import { List } from './components'
import {
    StyledCleanButton,
    StyledContainer,
    StyledEditContainer,
    StyledForm,
    StyledFormSection,
    StyledHeader,
    StyledInput,
    StyledInputGroup,
    StyledInputRow,
    StyledLabel,
    StyledListWrapper,
    StyledRandomButton,
    StyledSaveButton,
    StyledSelect,
    StyledShuffleButton,
    StyledSubmitButton,
} from './styles'

const initial: Item[] = []

for (let i = 1; i < 11; i++) {
    initial.push({
        id: i,
        isBooked: false,
        userName: '',
        role: 'red',
        point: 0,
    })
}

export const RandomChair = () => {
    let navigate = useNavigate()
    const [items, setItems] = React.useState<Item[]>(initial)
    const [numbers, setNumbers] = React.useState<number[]>([])
    const [userName, setUserName] = React.useState<string>('')
    const [role, setRole] = React.useState<string>('Г-н')

    const [edit, setEdit] = React.useState<Item | null>(null)
    const [value, setValue] = React.useState<string>('')

    const [numberGame, setNumberGame] = React.useState<string>('')
    const [judge, setJudge] = React.useState<string>('')

    const refInput = React.useRef<HTMLInputElement>(null)

    const { addGame } = useGames()

    useEffect(() => {
        const valueItems = localStorage.getItem('items')
        const valueNumbers = localStorage.getItem('numbers')
        if (valueNumbers) {
            setNumbers(JSON.parse(valueNumbers))
        }
        if (valueItems) {
            setItems(JSON.parse(valueItems))
        }
    }, [])

    useEffect(() => {
        refInput.current?.focus()
    }, [])

    const getNumber = (e: any) => {
        e.preventDefault()

        function getRandomNumber(): void {
            const randomValue = Math.floor(Math.random() * 10) + 1

            if (numbers.includes(randomValue)) {
                return getRandomNumber()
            } else {
                const valueNumbers = [...numbers, randomValue]
                localStorage.setItem(
                    'numbers',
                    JSON.stringify(valueNumbers)
                )
                setNumbers(valueNumbers)
                const list = items.map((item) => {
                    if (item.id === randomValue) {
                        return {
                            ...item,
                            isBooked: true,
                            userName: userName,
                        }
                    }
                    return item
                })
                localStorage.setItem('items', JSON.stringify(list))

                setItems(list)
            }
        }
        getRandomNumber()
        setUserName('')
        refInput.current?.focus()
    }

    const handleChange = (e: any) => {
        if (numbers.length !== 10) {
            setUserName(e.target.value)
        }
    }

    const cb = (item: Item) => {
        setEdit(item)
        setValue(item.userName)
    }

    const handleEdit = (e: any) => {
        setValue(e.target.value)
        // const value = { ...edit, userName: e.target.value.length ? e.target.value : '' }
        // setEdit(value)
    }

    const handleSave = () => {
        const list = items.map((item) => {
            if (item.id === edit?.id) {
                return {
                    ...item,
                    userName: value,
                }
            }
            return item
        })
        localStorage.setItem('items', JSON.stringify(list))
        setItems(list)

        setEdit(null)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        //     const date = new Date();
        //     const day = date.getDate();
        //     const month = date.getMonth() + 1;
        //     const year = date.getFullYear();

        //     const formattedDay = day < 10 ? `0${day}` : day;
        //     const formattedMonth = month < 10 ? `0${month}` : month;

        //     const textDate = `${formattedDay}.${formattedMonth}.${year}`;
        //     const obj = {
        //       // chat_id: '518174528',
        //       chat_id: '-1001768320094',
        //       text:
        //         `
        // 📆 ${textDate}
        // ▶️ Игра №: ${numberGame}
        // 👨🏻‍⚖️ Ведущий: ${role} ${judge}

        // ${items.map(item => `${item.id}. ${transformText(item.userName)}\n`).join('')}
        //       `
        //     };

        // await fetch(`https://api.telegram.org/bot${token}/getUpdates`).then((res) => {

        //   const response = res.json()
        //   console.log(response)
        // })

        // Перемешиваем массив игроков
        const players = shuffle([...items])
        const playersWithRole: Item[] = players.map((item) => ({
            ...item,
            role: 'red',
        }))

        // Назначаем роли: первые три - "mafia", остальные - "red"
        for (let i = 0; i < playersWithRole.length; i++) {
            if (i === 0) playersWithRole[i].role = 'mafia'
            if (i === 1) playersWithRole[i].role = 'mafia'
            if (i === 2) playersWithRole[i].role = 'don'
            if (i === 3) playersWithRole[i].role = 'sherif'
            if (i > 3) playersWithRole[i].role = 'red'
        }

        addGame({
            judge,
            role,
            numberGame,
            date: getDate(),
            id: Date.now().toString(),
            status: 'working',
            playersWithRole,
        })

        navigate('/games')
    }

    const handleChangeType = (value: any) => {
        setRole(value.target.value) // Г-н/Г-жа
    }

    const getDate = () => {
        return new Date().getHours() + ':' + new Date().getMinutes()
    }

    const shake = () => {
        const players = shuffle([...items])
        const result = players.map((elem, inx) => {
            return {
                ...elem,
                id: inx + 1,
            }
        })
        setItems(result)
        localStorage.setItem('items', JSON.stringify(result))
    }
    return (
        <StyledContainer>
            <StyledHeader>
                <StyledListWrapper>
                    <List items={items} cb={cb} edit={edit} />
                </StyledListWrapper>

                <StyledForm>
                    {edit && (
                        <StyledEditContainer>
                            <StyledInput
                                type="text"
                                value={value}
                                onChange={handleEdit}
                            />
                            <StyledSaveButton onClick={handleSave}>
                                <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                ></i>
                            </StyledSaveButton>
                        </StyledEditContainer>
                    )}

                    {!edit && (
                        <>
                            {numbers.length !== 10 && (
                                <StyledInput
                                    type="text"
                                    value={userName}
                                    onChange={handleChange}
                                    ref={refInput}
                                    placeholder="Введите имя игрока"
                                />
                            )}

                            {numbers.length !== 10 && (
                                <StyledRandomButton
                                    onClick={getNumber}
                                    disabled={numbers.length === 10}
                                >
                                    Random
                                </StyledRandomButton>
                            )}

                            {numbers.length === 10 && (
                                <StyledFormSection>
                                    <StyledInputGroup>
                                        <StyledLabel>
                                            Игра №
                                        </StyledLabel>
                                        <StyledInput
                                            type="text"
                                            value={numberGame}
                                            onChange={(e) =>
                                                setNumberGame(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Номер игры"
                                        />
                                    </StyledInputGroup>

                                    <StyledInputGroup>
                                        <StyledLabel>
                                            Ведущий:
                                        </StyledLabel>
                                        <StyledInputRow>
                                            <StyledSelect
                                                onChange={
                                                    handleChangeType
                                                }
                                            >
                                                <option value="Г-н">
                                                    Г-н
                                                </option>
                                                <option value="Г-жа">
                                                    Г-жа
                                                </option>
                                            </StyledSelect>
                                            <StyledInput
                                                type="text"
                                                value={judge}
                                                onChange={(e) =>
                                                    setJudge(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Имя ведущего"
                                            />
                                        </StyledInputRow>
                                    </StyledInputGroup>

                                    <StyledSubmitButton
                                        onClick={handleSubmit}
                                    >
                                        <i
                                            className="fa fa-check-square"
                                            aria-hidden="true"
                                        ></i>
                                        Сохранить игру
                                    </StyledSubmitButton>
                                </StyledFormSection>
                            )}

                            <StyledCleanButton
                                onClick={(e: any) => {
                                    e.preventDefault()
                                    setNumbers([])
                                    setItems(() => initial)
                                    setEdit(null)
                                    localStorage.setItem(
                                        'items',
                                        JSON.stringify(initial)
                                    )
                                    localStorage.setItem(
                                        'numbers',
                                        JSON.stringify([])
                                    )
                                }}
                            >
                                <i className="fa fa-trash-o"></i>
                                Очистить
                            </StyledCleanButton>

                            {numbers.length === 10 && (
                                <StyledShuffleButton
                                    variant="contained"
                                    onClick={shake}
                                >
                                    Перемешать
                                </StyledShuffleButton>
                            )}
                        </>
                    )}
                </StyledForm>
            </StyledHeader>
        </StyledContainer>
    )
}
