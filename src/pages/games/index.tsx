import { useMemo } from 'react'

import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import { useGames } from '@/hooks/useGames'
import { IInfoGame } from '@/shared/domain/interface'

import {
    StyledDeleteButton,
    StyledEmptyMessage,
    StyledGameCard,
    StyledGameDetails,
    StyledGameInfo,
    StyledGameLink,
    StyledGameNumber,
    StyledGameRole,
    StyledGameTime,
    StyledGamesContainer,
    StyledLoadingContainer,
} from './styles'

const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':').map(Number)
    const formattedHours = hours.toString().padStart(2, '0')
    const formattedMinutes = minutes.toString().padStart(2, '0')
    return `${formattedHours}:${formattedMinutes}`
}

const formatDate = (timestamp: string): string => {
    const date = new Date(Number(timestamp))
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    return `${day}.${month}`
}

export const Games = () => {
    const { games, loading, deleteGame } = useGames()

    const sortedItems = useMemo(() => {
        return [...games].sort((a, b) => {
            return Number(b.id) - Number(a.id)
        })
    }, [games])

    return (
        <StyledGamesContainer>
            {loading ? (
                <StyledLoadingContainer>
                    <CircularProgress />
                </StyledLoadingContainer>
            ) : sortedItems.length === 0 ? (
                <StyledEmptyMessage>
                    Нет начавшихся игр
                </StyledEmptyMessage>
            ) : (
                sortedItems.map((item: IInfoGame) => (
                    <StyledGameCard key={item.id}>
                        <StyledGameLink to={`${item.id}`}>
                            <StyledGameInfo>
                                <StyledGameNumber>
                                    Игра № {item.numberGame}
                                </StyledGameNumber>
                                <Box>
                                    <StyledGameTime>
                                        <i className="fa fa-clock-o" />
                                        {formatTime(item.date)} |{' '}
                                        {formatDate(item.id)}
                                    </StyledGameTime>
                                    <StyledGameDetails>
                                        <StyledGameRole>
                                            {item.role} {item.judge}
                                        </StyledGameRole>
                                    </StyledGameDetails>
                                </Box>
                            </StyledGameInfo>
                        </StyledGameLink>
                        <StyledDeleteButton
                            variant="contained"
                            onClick={() => {
                                deleteGame(item.id_doc!)
                            }}
                        >
                            <i className="fa fa-trash" />
                            Удалить
                        </StyledDeleteButton>
                    </StyledGameCard>
                ))
            )}
        </StyledGamesContainer>
    )
}
