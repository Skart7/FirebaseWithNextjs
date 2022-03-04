import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import {defaultStyles} from '../theme/theme'
const Header = dynamic(() => import("./Header"))
const Footer = dynamic(() => import("./Footer"))

import {Container, Box} from '@mui/material'

interface ILayoutPage {
    title: string,
    children: any,
    trg?: number,
}

export default function LayoutPage({title, children, trg}:ILayoutPage) {

    return (
    <>
        <Head>
            <title>{title ? title : process.env.WEBNAME}</title>
        </Head>

        <Box sx={defaultStyles.layoutPage}>
            <Header trg={trg} />
            <Container maxWidth="lg" sx={defaultStyles.container}>{children}</Container>
            <Footer/>
        </Box>

       
    </>
    )
}