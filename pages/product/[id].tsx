import React from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic'

const LayoutPage = dynamic(() => import("../../components/LayoutPage"))

import {Box, Typography, Paper, Fade, Button} from '@mui/material'

import {products} from '../../utils/data'
import Cart from '../../components/storage/cart'

export default function ProductPage() {

    const router = useRouter()

    const [existProduct, setExistProduct] = React.useState(false)
    const [trg, setTrg] = React.useState(0)
    
    const detail:any = products.find( data => data.id === Number(router.query.id) ? data : undefined)

    const Styles: any = {
        paper: {display: 'flex', justifyContent: 'space-between', gridGap: '1vw', p: 5},
        image: { maxWidth: 500, width: '100%', height: '100%' },
    }

    const ActionTrg = () => setTrg(state => state + 1)
    const AddToCart = () => {Cart.increase({data: detail != undefined ? detail: false});ActionTrg()}
    
    React.useEffect(() => {Cart.findProduct({data: detail != undefined ? detail: false, setExistProduct})}, [detail, trg])
    
    return (
        <LayoutPage title="Product Page" trg={trg}>
            
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
                        <Button disabled={existProduct} variant="contained" sx={{ my: 1 }} onClick={AddToCart}>Add to card</Button>
                    </Box>
                </Paper>
            </Fade>
            )
        }

        </LayoutPage>
    )
}