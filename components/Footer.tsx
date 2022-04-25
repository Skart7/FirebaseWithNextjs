import React from 'react'

import {Box,Container, Divider} from '@mui/material'

export default function Footer() {
    
    return (
        <>
            <Divider />
            <Box component="footer" sx={{ bgcolor: 'background.default', p: 1 }}>
                <Container maxWidth="lg" sx={{width: '100%', textAlign: 'center', p: 1}}>{process.env.WEBNAME}</Container>
            </Box>
            
        </>
    )
}