import './App.css'
import './index.css'
import { Providers } from './providers'
import { AppRouter } from './router'

export const App = () => {
    return (
        <Providers>
            <AppRouter />
        </Providers>
    )
}
