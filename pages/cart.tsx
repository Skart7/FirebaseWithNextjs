import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import {Box, Typography, Button, Divider, Paper, Grow} from '@mui/material'
import { pageUrl } from '../utils/url'
import Cart from '../components/storage/cart'

const LayoutPage = dynamic(() => import("../components/LayoutPage"))
const ShoppingCartCard = dynamic(() => import("../components/cart/card"))

export default function ShoppingCart() {

    const Styles: any = {
        header: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2},
        paper: {p: 3},
        content: { width: '100%' },
    }

    const router = useRouter()

    const [getCart, setCart] = React.useState(Cart.dataInit)
    const [trg, setTrg] = React.useState(0)

    React.useEffect(() => {setCart(Cart.getStorage())},[trg])

    return (
    <LayoutPage title="Cart" trg={trg}>

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
                                <ShoppingCartCard key={data.id} data={data} setTrg={setTrg} />
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