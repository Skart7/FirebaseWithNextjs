import React from 'react'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'

import {Box,AppBar,Toolbar,Container,IconButton,Typography,Badge} from '@mui/material'

const MenuRoundedIcon = dynamic(() => import("@mui/icons-material/MenuRounded"))
const LocalMallRoundedIcon = dynamic(() => import("@mui/icons-material/LocalMallRounded"))
const PersonRoundedIcon = dynamic(() => import("@mui/icons-material/PersonRounded"))
const LoginRoundedIcon = dynamic(() => import("@mui/icons-material/LoginRounded"))

const DrawerMenu = dynamic(() => import("./DrawerMenu"))
import {pageUrl} from '../utils/url'
import Cart from './storage/cart'

import { selectUser } from '../redux/slices/user'
import { useAppSelector } from '../redux/hooks'

interface IHeader {
    trg?: number,
}

export default function Header({trg}:IHeader) {

    const Styles: any = {
        boxWrapper: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', gridGap: '1vw', p: 1},
        headerLeft: {display: 'flex', alignItems: 'center', gridGap: '1vw'},
        headerRight: {display: 'flex', alignItems: 'center', gridGap: '1vw'},
    }

    const [toggleMenu, setToggleMenu] = React.useState(false)
    const [getCart, setCart] = React.useState(Cart.dataInit)
    const User = useAppSelector(selectUser)

    const OpenDrawerMenu = () => setToggleMenu(true)

    React.useEffect(() => {setCart(Cart.getStorage())},[trg])

    return (
    <>
        <AppBar position="static" sx={{ boxShadow: 0 }}>
            <Toolbar>
                <Container maxWidth="lg">
                    <Box sx={Styles.boxWrapper}>
                        <Box sx={Styles.headerLeft}>
                            <IconButton onClick={OpenDrawerMenu}><MenuRoundedIcon/></IconButton>
                            <NextLink href={pageUrl.home}><Typography variant="h6" sx={{cursor: 'pointer'}}>{process.env.WEBNAME}</Typography></NextLink>
                        </Box>
                        <Box sx={Styles.headerRight}>  
                            {
                                (
                                !User.data.auth ? (
                                    <NextLink href={pageUrl.login} passHref>
                                        <IconButton>
                                            <LoginRoundedIcon/>
                                        </IconButton>
                                    </NextLink>
                                    ) : (
                                    <NextLink href={pageUrl.account} passHref>
                                        <IconButton>
                                            <PersonRoundedIcon/>
                                        </IconButton>
                                    </NextLink>
                                    )
                                )
                            } 
                            <NextLink href={pageUrl.cart} passHref>
                                <IconButton>
                                <Badge color="primary" badgeContent={getCart.qty} max={99}><LocalMallRoundedIcon/></Badge>
                                </IconButton>
                            </NextLink>
                        </Box>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>

        <DrawerMenu 
            toggleMenu={toggleMenu}
            setToggleMenu={setToggleMenu}
        />
    </>
    )
}