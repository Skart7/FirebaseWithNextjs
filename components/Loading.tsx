import { CircularProgress, Box, Fade } from '@mui/material'
import React from 'react'

export default function Loading() {

    return (
        <>
            <Fade in={true}>
                <Box sx={{position:'fixed',top:'50%',left:'50%',transform:'translate(-50%, -50%)',zIndex: 1000 }}>
                    <CircularProgress color="primary" />
                </Box>
            </Fade>
        </>
    )
}
