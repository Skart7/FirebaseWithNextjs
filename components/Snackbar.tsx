import React from 'react'

import {Snackbar, Alert} from '@mui/material'

interface ISnackbar {
    getSnackbar: boolean,
    setSnackbar: React.Dispatch<React.SetStateAction<boolean>>,
    message: string,
    severity: any
}

export default function SnackbarComp({setSnackbar, getSnackbar, message, severity}:ISnackbar) {

    const handleCloseSnackbar = () => setSnackbar(false)

    return (
    <>
        <Snackbar 
            open={getSnackbar} 
            autoHideDuration={6000} 
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert onClose={handleCloseSnackbar} severity={severity || 'success'} sx={{ width: '100%' }}>{message}</Alert>
        </Snackbar>
    </>
    )
}