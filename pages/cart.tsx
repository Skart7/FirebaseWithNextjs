import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import {Box, Typography, Button, Divider, Paper, Grow, IconButton} from '@mui/material'
import { pageUrl } from '../utils/url'
import {useCart} from '../utils/provider/cart'

const LayoutPage = dynamic(() => import("../components/LayoutPage"))
const ShoppingCartCard = dynamic(() => import("../components/cart/card"))

const KeyboardBackspaceRoundedIcon = dynamic(() => import("@mui/icons-material/KeyboardBackspaceRounded"))



export default function ShoppingCart() {

    const Styles: any = {
        header: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1},
        paper: {p: 2},
        content: { width: '100%', height: '50vh', mt: 1},
    }

    const router = useRouter()
    const {getCart} = useCart()

    return (
    <LayoutPage title="Cart">

        <Grow in={true}>
            <Box>
                <Paper sx={Styles.paper}>
                    <Box sx={Styles.header}>
                        <IconButton onClick={ () => router.push(pageUrl.home) }>
                            <KeyboardBackspaceRoundedIcon/>
                        </IconButton>
                        {
                            getCart.data.length > 0 && 
                            <Button 
                                variant="contained" 
                                onClick={() => router.push(pageUrl.checkout)}>
                                Checkout Order | {getCart.amount} $
                            </Button>
                        }
                    </Box>
                    <Divider />
                    <Box sx={Styles.content}>
                    {
                        getCart.data.length > 0 
                        ? (
                            getCart.data.map( (data:any) => (
                                <ShoppingCartCard key={data.id} data={data} />
                            ))
                        )
                        :  (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                                <Typography variant="body2">Your cart is empty :(</Typography>
                            </Box>
                        )
                    }
                    </Box>
                </Paper>
            </Box>
        </Grow>

    </LayoutPage>
    )
}