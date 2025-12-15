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
    StyledTitle,
} from './styles'

export const Games = () => {
    const { games, loading, deleteGame } = useGames()

    const sortedItems = useMemo(() => {
        return [...games].sort((a, b) => {
            const [hoursA, minutesA] = a.date.split(':').map(Number)
            const [hoursB, minutesB] = b.date.split(':').map(Number)

            return hoursA - hoursB || minutesA - minutesB
        })
    }, [games])

    return (
        <StyledGamesContainer>
            <StyledTitle>Игры вечера</StyledTitle>
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
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                >
                                    <Box>
                                        <StyledGameTime>
                                            <i className="fa fa-clock-o" />
                                            {item.date}
                                        </StyledGameTime>
                                        <StyledGameDetails>
                                            <StyledGameRole>
                                                {item.role}{' '}
                                                {item.judge}
                                            </StyledGameRole>
                                        </StyledGameDetails>
                                    </Box>

                                    <Box>
                                        <StyledDeleteButton
                                            variant="contained"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                deleteGame(
                                                    item.id_doc!
                                                )
                                            }}
                                        >
                                            <i className="fa fa-trash" />
                                            Удалить
                                        </StyledDeleteButton>
                                    </Box>
                                </Box>
                            </StyledGameInfo>
                        </StyledGameLink>
                    </StyledGameCard>
                ))
            )}
        </StyledGamesContainer>
    )
}
