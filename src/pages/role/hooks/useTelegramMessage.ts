import { useNavigate } from 'react-router-dom'

import {
    CLUB,
    CLUB_LEO_KING,
    CLUB_OLE_FLOW,
    token,
} from '@/shared/consts'
import { IInfoGame, Item } from '@/shared/domain/interface'
import { getDate, getIcon, transformText } from '@/shared/utils'

type CheckedState = {
    isShowRole: boolean
}

type UseTelegramMessageProps = {
    formValues: Record<number, Item>
    infoGame?: IInfoGame
    checked: CheckedState
    resultMatch: string
    comment: string
}

export const useTelegramMessage = ({
    formValues,
    infoGame,
    checked,
    resultMatch,
    comment,
}: UseTelegramMessageProps) => {
    const navigate = useNavigate()

    const getChatId = (): string | undefined => {
        const club = localStorage.getItem(CLUB)
        if (club === CLUB_LEO_KING) return '-1001768320094'
        if (club === CLUB_OLE_FLOW) return '-1002143047041'
        return undefined
    }

    const getResultMatch = (): string => {
        if (checked.isShowRole) {
            if (resultMatch === 'none') return ''
            if (resultMatch === 'red') return 'Победа мирных'
            return 'Победа черных'
        }
        return ''
    }

    const sendMessage = async () => {
        try {
            const chatId = getChatId()
            if (!chatId) {
                console.error('Chat ID not found')
                return
            }

            const messageText = `
📆 ${getDate()}
▶️ Игра №: ${infoGame?.numberGame}
👨🏻‍⚖️ Ведущий: ${infoGame?.role} ${infoGame?.judge}

${Object.values(formValues)
    .map(
        (item) =>
            `${item.id}. ${transformText(item.userName)} ${checked.isShowRole ? getIcon(item.role) : ''}\n`
    )
    .join('')}

${getResultMatch()}
${comment}`

            await fetch(
                `https://api.telegram.org/bot${token}/sendMessage`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: messageText,
                    }),
                }
            )
            navigate('/games')
        } catch (err) {
            console.error('Failed to send message:', err)
        }
    }

    return { sendMessage }
}
