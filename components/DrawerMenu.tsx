import React from 'react'
import NextLink from 'next/link'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'

import {Box,Drawer,IconButton,List,ListItem,ListItemText,ListItemIcon,Typography,Divider} from '@mui/material'

const ArrowBackIosNewRoundedIcon = dynamic(() => import("@mui/icons-material/ArrowBackIosNewRounded"))
const HomeRoundedIcon = dynamic(() => import("@mui/icons-material/HomeRounded"))
const LoginRoundedIcon = dynamic(() => import("@mui/icons-material/LoginRounded"))
const PersonRoundedIcon = dynamic(() => import("@mui/icons-material/PersonRounded"))
const GradeRoundedIcon = dynamic(() => import("@mui/icons-material/GradeRounded"))
const LogoutRoundedIcon = dynamic(() => import("@mui/icons-material/LogoutRounded"))

import {pageUrl} from '../utils/url'
import { selectUser } from '../redux/slices/user'
import { useAppSelector } from '../redux/hooks'
import {Logout} from '../utils/user/logout' 

interface IDrawerMenu {
    toggleMenu: boolean,
    setToggleMenu: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function DrawerMenu({toggleMenu, setToggleMenu}:IDrawerMenu) {

    const Styles: any = {
        window: {minWidth: 325, width: '100%', p: 2},
        header: {display: 'flex',justifyContent: 'space-between',alignItems: 'center'},
        divider: {my: 1}
    }

    const router = useRouter()
    const User = useAppSelector(selectUser)

    const CloseDrawerMenu = () => setToggleMenu(false)

    return (
    <>
        <Drawer
            anchor="left"
            open={toggleMenu}
            onClose={CloseDrawerMenu}
        >
            <Box sx={Styles.window}>
                <Box sx={Styles.header}>
                    <NextLink href="/" passHref>
                        <Typography variant="h6" sx={{cursor: 'pointer'}}>{process.env.WEBNAME}</Typography>
                    </NextLink>
                    <IconButton size="small" onClick={CloseDrawerMenu}><ArrowBackIosNewRoundedIcon /></IconButton>
                </Box>
                <List>
                <Divider sx={Styles.divider} />
                {
                    !User.data.auth ? (
                    <ListItem 
                        selected={router.asPath === pageUrl.login} 
                        button 
                        onClick={ () => router.push(pageUrl.login) }
                    >
                        <ListItemIcon>
                            <LoginRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="body1">Login</Typography>
                        </ListItemText>
                    </ListItem>
                    ) : (
                    <>
                        <ListItem 
                            selected={router.asPath === pageUrl.account} 
                            button 
                            onClick={ () => router.push(pageUrl.account) }
                        >
                            <ListItemIcon>
                                <PersonRoundedIcon />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="body1">My account</Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem 
                            selected={router.asPath === pageUrl.orders} 
                            button 
                            onClick={ () => router.push(pageUrl.orders) }
                        >
                            <ListItemIcon>
                                <GradeRoundedIcon />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="body1">My orders</Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem 
                            button 
                            onClick={ () => Logout() }
                        >
                            <ListItemIcon>
                                <LogoutRoundedIcon />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="body1">Logout</Typography>
                            </ListItemText>
                        </ListItem>
                    </>
                    )
                }
                <Divider sx={Styles.divider} />
                    <ListItem 
                        selected={router.asPath === pageUrl.home} 
                        button 
                        onClick={ () => router.push(pageUrl.home) }
                    >
                        <ListItemIcon>
                            <HomeRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="body1">Home</Typography>
                        </ListItemText>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    </>
    )
}