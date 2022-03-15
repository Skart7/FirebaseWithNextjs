import React from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic'

const LayoutPage = dynamic(() => import("../../components/LayoutPage"))

import {Box, Typography, Paper, Fade, Button} from '@mui/material'

import {products} from '../../utils/data'

import {useCart} from '../../utils/provider/cart'

export default function ProductPage() {

    const router = useRouter()

    const {getCart, Increase} = useCart()

    const detail:any = products.find( data => data.id === Number(router.query.id) ? data : undefined)

    const Styles: any = {
        paper: {display: 'flex', justifyContent: 'space-between', gridGap: '1vw', p: 5},
        image: { maxWidth: 500, width: '100%', height: '100%' },
    }

    const AddToCart = () => {Increase({data: detail != undefined ? detail: false})}

    const FindProduct = () => {
        const exist = getCart.data.find( prop => prop.id === Number(router.query.id))

        if(exist) { return true }
        return false
    }
    
    return (
        <LayoutPage title="Product Page">
            
        {
            detail != undefined && (
            <Fade in={true}>
                <Paper sx={Styles.paper}>
                    <Box sx={Styles.image}>
                        <Image
                            src={detail.image}
                            alt={detail.name}
                            loading="lazy"
                            layout="responsive"
                            placeholder="blur"
                            blurDataURL={detail.image}
                            height={500}
                            width={500}
                            objectFit="contain"
                        />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="h5" sx={{ my: 1 }}>{detail.name}</Typography>
                        <Typography variant="h3" sx={{ my: 1 }}>{detail.price} $</Typography>
                        <Button disabled={FindProduct()} variant="contained" sx={{ my: 1 }} onClick={AddToCart}>Add to card</Button>
                    </Box>
                </Paper>
            </Fade>
            )
        }

        </LayoutPage>
    )
}