import { Link } from 'react-router-dom'

import { Box, Button, Typography } from '@mui/material'

export const NoPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#f0f0f0',
            }}
        >
            <Typography variant="h1">404</Typography>
            <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
            >
                <Link
                    to="/"
                    style={{ textDecoration: 'none', color: 'white' }}
                >
                    На главную
                </Link>
            </Button>
        </Box>
    )
}
