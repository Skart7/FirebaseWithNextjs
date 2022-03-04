import React from 'react'
import Image from 'next/image'
import { Box, Typography } from '@mui/material'

export default function CheckoutCardForCard({data}) {

    const Styles: any = {
        wrapper: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1},
        image: {position: 'relative', height: 75, width: 75},
        desc: {textAlign: 'end'},
        text: {height: 24, overflow: 'hidden'}
    }

    return (
    <>
    <Box sx={Styles.wrapper}>
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
        <Box sx={Styles.desc}>
            <Typography sx={Styles.text} variant="body1">{data.name}</Typography>
            <Typography sx={Styles.text} variant="body1">{data.price} $</Typography>
            <Typography sx={Styles.text} variant="body1">{data.count}</Typography>
        </Box>
    </Box>
    </>
    )
}