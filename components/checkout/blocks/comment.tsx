import React from 'react'
import dynamic from 'next/dynamic'

const TextField = dynamic(() => import("@mui/material/TextField"))

import {Paper, Box} from '@mui/material'

interface IComment {
    HandleChangeComment: (e: any) => void,
    comment: string,
}

export default function BlockComment({HandleChangeComment,comment}:IComment) {

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
                    label="Comment"
                    multiline
                    minRows={3}
                    fullWidth
                    value={comment}
                    onChange={HandleChangeComment}
                />
            </Box>
        </Paper>
    </>
    )
}