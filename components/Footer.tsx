import React from 'react'

import {Box,Container} from '@mui/material'

export default function Footer() {
    
    return (
        <>
            <Box component="footer">
                <Container maxWidth="lg" sx={{width: '100%', textAlign: 'center', p: 1}}>{process.env.WEBNAME}</Container>
            </Box>
        </>
    )
}