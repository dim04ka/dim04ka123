import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom'

import {
    Games,
    Login,
    NoPage,
    RandomChair,
    RolePage,
    Settings,
} from '@/pages'
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

                    <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NoPage />} />
            </>
        )
    )

    return <RouterProvider router={router} />
}
