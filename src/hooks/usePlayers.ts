import { useEffect, useState } from 'react'

import { IPlayer } from '../shared/domain/interface'

const initial: IPlayer[] = [
    { id: '1', name: 'Dzmitry' },
    { id: '2', name: 'Oleg' },
]

const usePlayers = (): [
    IPlayer[],
    (player: IPlayer) => void,
    (id: string) => void,
] => {
    const [players, setPlayers] = useState<IPlayer[]>([])

    const addPlayer = (player: IPlayer) => {
        setPlayers([...players, player])
    }

    const removePlayer = (id: string) => {
        setPlayers(players.filter((p) => p.id !== id))
    }

    useEffect(() => {
        setPlayers(initial)
    }, [])

    return [players, addPlayer, removePlayer]
}

export default usePlayers
