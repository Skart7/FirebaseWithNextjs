import React from 'react'
import dynamic from 'next/dynamic'

const TextField = dynamic(() => import("@mui/material/TextField"))

import {Paper, Box, Typography, MenuItem} from '@mui/material'

interface IPayment {
    HandleChangePayment: (e: any) => void,
    payment: string
}

export default function BlockPayment({HandleChangePayment, payment}:IPayment) {

    const Styles: any = {
        paper: {p: 2, mb: 2},
        title: {mb: 2},
    }

    return (
    <>

    <Paper sx={Styles.paper}>
        <Typography variant="h6" sx={Styles.title}>Payment</Typography>
        <Box>
            <TextField
                variant="outlined"
                label="Payment"
                select
                fullWidth
                value={payment}
                onChange={HandleChangePayment}
            >
                <MenuItem disabled value="select payment">Select payment</MenuItem>
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="card">Card</MenuItem>
            </TextField>
        </Box>
    </Paper>
    </>
    )
}