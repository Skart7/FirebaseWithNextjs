import React from 'react'

import {Box, Typography} from '@mui/material'

interface ICard {
    data: any
}

export default function CardOrder({data}:ICard) {

    const Styles: any = {
        boxContent: {mb: 1, p: 1, borderRadius: 2, cursor: 'pointer', transform: 'all .1s linear', "&:hover": {bgcolor: 'primary.main'}},
        boxContentInner: {display: 'flex', justifyContent: 'space-between', alignItems: 'center'},
        boxContentTitle: {textTransform: 'uppercase', mb: 0},
    }

    return (
    <>
        <Box sx={Styles.boxContent}>
            <Typography variant="h6" sx={Styles.boxContentTitle}>{data.user.name}</Typography>
            <Box sx={Styles.boxContentInner}>
                <Typography variant="body2">{data.info.date.seconds}</Typography>
                <Box>
                    <Typography variant="body2">amount: {data.cart.amount}$</Typography>
                    <Typography variant="body2">qty: {data.cart.qty}</Typography>
                </Box>
            </Box>
        </Box>
    </>
    )
}