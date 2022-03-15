import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import {Box, Typography, Button, Divider, Paper, Grow} from '@mui/material'
import { pageUrl } from '../utils/url'
import {useCart} from '../utils/provider/cart'

const LayoutPage = dynamic(() => import("../components/LayoutPage"))
const ShoppingCartCard = dynamic(() => import("../components/cart/card"))



export default function ShoppingCart() {

    const Styles: any = {
        header: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2},
        paper: {p: 3},
        content: { width: '100%' },
    }

    const router = useRouter()
    const {getCart} = useCart()

    return (
    <LayoutPage title="Cart">

        <Grow in={true}>
            <Box>
                <Paper sx={Styles.paper}>
                    <Box sx={Styles.header}>
                        <Button onClick={ () => router.push(pageUrl.home) }>Go to home</Button>
                        <Typography variant="h6">Shopping Cart</Typography>
                        <Button variant="contained" onClick={() => router.push(pageUrl.checkout)}>Checkout Order | {getCart.amount || 0} $</Button>
                    </Box>
                    <Divider />
                    <Box sx={Styles.content}>
                    {
                        getCart.data.length > 0 && (
                            getCart.data.map( (data:any) => (
                                <ShoppingCartCard key={data.id} data={data} />
                            ))
                        )
                    }
                    </Box>
                </Paper>
            </Box>
        </Grow>

    </LayoutPage>
    )
}