import type {Data} from '../../utils/interfaces'
import React from 'react'
import Image from 'next/image'
import NextLink from 'next/link'

import {Box, Typography, Card, Link} from '@mui/material'

export default function CatalogCard({data}:Data) {

    const Styles: any = {
        imagebox: { width: '100%', height: '100%', position: 'relative'},
        titlebox: {my: 1, height: 41, overflow: 'hidden'},
        bottombox: {mt: 1},
    }

    return (
    <Card sx={{p: 1}}>
        <NextLink href={'/product/[id]'} as={`/product/${data.id}`}>
        <Link underline="none" sx={{ cursor: 'pointer' }}>
            <Box sx={Styles.imagebox}>
            <Image
                src={data.image}
                height={150}
                width={150}
                alt={data.name}
                objectFit="contain"
                loading="lazy"
                layout="responsive"
                placeholder="blur"
                blurDataURL={data.image}
            />
            </Box>
            <Box sx={Styles.titlebox}>
                <Typography variant="body2">{data.name}</Typography>
            </Box>
        </Link>
        </NextLink>
        <Box sx={Styles.bottombox}>
            <Typography variant="h5">{data.price} $</Typography>
        </Box>
    </Card>
    ) 
}