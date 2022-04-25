import React from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import {Box, Typography, IconButton} from '@mui/material'

const ClearRoundedIcon = dynamic(() => import("@mui/icons-material/ClearRounded"))
const AddRoundedIcon = dynamic(() => import("@mui/icons-material/AddRounded"))
const RemoveRoundedIcon = dynamic(() => import("@mui/icons-material/RemoveRounded"))

import {useCart} from '../../utils/provider/cart'

interface Data {
    data: {
        id: number
        name: string
        price: number
        stock: number
        image: string,
        count: number,
        total_price: number,
        category: string
    },
}

export default function ShoppingCartCard({data}:Data) {

    const Styles: any = {
        card: {p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'background.default', mb: 1, borderRadius: 1},
        image: { position: 'relative', height: 75, width: 75 }
    }

    const {DeleteProduct, Increase, Decrease} = useCart()

    const RemoveProductFromCart = () => {DeleteProduct({data})}

    const IncreaseProductForCart = () => {
        if(data.stock > data.count) {
            Increase({data})
        }
    }
    const DecreaseProductForCart = () => {
        Decrease({data})
    }

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
            <Typography variant="body2" sx={{ my: 1 }}>{data.category}</Typography>
            <Typography variant="body2" sx={{ my: 1 }}>{data.total_price} $</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <IconButton onClick={DecreaseProductForCart}><RemoveRoundedIcon/></IconButton>
            <Typography variant="body2">{data.count}</Typography>
            <IconButton onClick={IncreaseProductForCart}><AddRoundedIcon/></IconButton>
        </Box>
        <Box>
            <IconButton onClick={RemoveProductFromCart}><ClearRoundedIcon/></IconButton>
        </Box>
    </Box>
    )
}