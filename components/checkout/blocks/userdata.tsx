import React from 'react'
import dynamic from 'next/dynamic'

const TextField = dynamic(() => import("@mui/material/TextField"))

import {Paper, Box} from '@mui/material'

interface IUserData {
    uData: {name: string, email: string},
    HandleChangeUserData: (e: any) => void,
    email: string, 
    name: string,
}

export default function BlockUserData({uData, HandleChangeUserData,email,name}:IUserData) {

    const Styles: any = {
        paper: {p: 2, mb: 2},
        title: {mb: 2},
    }

    return (
    <>
        <Paper sx={Styles.paper}>
            <Box>
                <TextField
                    variant="outlined"
                    label="name"
                    name="name"
                    fullWidth
                    sx={{ my: 1 }}
                    value={name || uData.name}
                    onChange={HandleChangeUserData}
                />
                <TextField
                    variant="outlined"
                    label="email"
                    name="email"
                    fullWidth
                    sx={{ my: 1 }}
                    value={email || uData.email}
                    onChange={HandleChangeUserData}
                />
            </Box>
        </Paper>
    </>
    )
}