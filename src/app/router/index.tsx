import {
    BrowserRouter,
    Route,
    RouterProvider,
    Routes,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom'

import { Games, Login, NoPage, RolePage, Settings } from '@/pages'
import Players from '@/pages/players'
import RandomChair from '@/pages/randomChair'
import { Layout } from '@/shared/components'

export const AppRouter = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Layout />}>
                    <Route path="games" element={<Games />} />
                    <Route path="games/:id" element={<RolePage />} />
                    <Route
                        path="random-chair"
                        element={<RandomChair />}
                    />
                    <Route path="players" element={<Players />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NoPage />} />
            </>
        )
    )

    return <RouterProvider router={router} />
}
