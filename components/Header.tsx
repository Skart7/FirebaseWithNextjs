import React from 'react'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'

import {Box,AppBar,Toolbar,Container,IconButton,Typography,Badge, Divider} from '@mui/material'

const MenuRoundedIcon = dynamic(() => import("@mui/icons-material/MenuRounded"))
const LocalMallRoundedIcon = dynamic(() => import("@mui/icons-material/LocalMallRounded"))
const PersonRoundedIcon = dynamic(() => import("@mui/icons-material/PersonRounded"))
const LoginRoundedIcon = dynamic(() => import("@mui/icons-material/LoginRounded"))

const DrawerMenu = dynamic(() => import("./DrawerMenu"))
const LoginModal = dynamic(() => import("./modal/login"))

import {pageUrl} from '../utils/url'

import {useCart} from '../utils/provider/cart'

import { selectUser } from '../redux/slices/user'
import { useAppSelector } from '../redux/hooks'

export default function Header() {

    const Styles: any = {
        boxWrapper: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', gridGap: '1vw', p: 1},
        headerLeft: {display: 'flex', alignItems: 'center', gridGap: '1vw'},
        headerRight: {display: 'flex', alignItems: 'center', gridGap: '1vw'},
    }

    const [toggleMenu, setToggleMenu] = React.useState(false)
    const [openLogin, setOpenLogin] = React.useState(false)
    
    const User = useAppSelector(selectUser)
    const {getCart} = useCart()

    const OpenDrawerMenu = () => setToggleMenu(true)

    return (
    <>
        <AppBar position="static" sx={{ boxShadow: 0, bgcolor: 'background.default' }}>
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
                                    <IconButton onClick={() => setOpenLogin(true)}>
                                        <LoginRoundedIcon />
                                    </IconButton>
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
        <Divider />

        {
            !User.data.auth && (
            <LoginModal 
                openLogin={openLogin} 
                setOpenLogin={setOpenLogin}
            />
            )
        }
        <DrawerMenu 
            toggleMenu={toggleMenu}
            setToggleMenu={setToggleMenu}
        />
    </>
    )
}