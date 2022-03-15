import React from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import {Box, Typography, IconButton} from '@mui/material'

const ClearRoundedIcon = dynamic(() => import("@mui/icons-material/ClearRounded"))

import {useCart} from '../../utils/provider/cart'

interface Data {
    data: {
        id: number
        name: string
        price: number
        qty: number
        image: string,
        count: number,
        total_price: number,
    },
}

export default function ShoppingCartCard({data}:Data) {

    const Styles: any = {
        card: {p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center'},
        image: { position: 'relative', height: 75, width: 75 }
    }

    const {DeleteProduct} = useCart()

    const RemoveProductFromCart = () => {DeleteProduct({data})}

    return (
    <Box sx={Styles.card}>
        <Box sx={Styles.image}>
            <Image
                src={data.image}
                alt={data.name}
                width={75}
                height={75}
                objectFit="contain"
                loading="lazy"
                layout="responsive"
                placeholder="blur"
                blurDataURL={data.image}
            />
        </Box>
        <Box>
            <Typography variant="body2" sx={{ my: 1 }}>{data.name}</Typography>
            <Typography variant="body2" sx={{ my: 1 }}>{data.count}</Typography>
            <Typography variant="body2" sx={{ my: 1 }}>{data.total_price} $</Typography>
        </Box>
        <Box>
            <IconButton onClick={RemoveProductFromCart}><ClearRoundedIcon/></IconButton>
        </Box>
    </Box>
    )
}