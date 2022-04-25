import type { NextPage } from 'next'
import React from 'react'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import axios from 'axios'

import {Box,Button,Typography,Container, Paper, Grow, Divider} from '@mui/material'
const TextField = dynamic(() => import("@mui/material/TextField"))
const Loading = dynamic(() => import("../components/Loading"))

const KeyboardBackspaceRoundedIcon = dynamic(() => import("@mui/icons-material/KeyboardBackspaceRounded"))


import {defaultStyles} from '../theme/theme'
import { BASE_URL } from '../utils/url'
import { selectUser } from '../redux/slices/user'
import { useAppSelector } from '../redux/hooks'

interface IHandleChangeValue {
    target: HTMLInputElement
}

const Login: NextPage = () => {

    const router = useRouter()
    const User = useAppSelector(selectUser)
    const Styles: any = {
        centerId: { display: 'flex', alignItems: 'center', justifyContent: 'center', p: 5 },
        footer: { my: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center'},
        container: {flexGrow: 1, my: 10, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'},
        header: {my: 1, textAlign: 'center', width: '100%'},
        textfield: {my: 1},
    }

    const errorEmailInit = 'Your real Email'
    const errorPasInit = 'Password length must be 6 characters'

    const [email, setEmail] = React.useState("")
    const [pass, setPass] = React.useState("")
    const [errorEmail, setErrorEmail] = React.useState(false)
    const [errorPass, setErrorPass] = React.useState(false)

    const Back = () => router.back()
    const HandlerChangeEmail = (e: IHandleChangeValue) => {setEmail(e.target.value);setErrorEmail(false)}
    const HandlerChangePass = (e: IHandleChangeValue) => {setPass(e.target.value);setErrorPass(false)}

    const SubmitFormLogin = async (e: any) => {
        e.preventDefault()

        if(!email) {
            setErrorEmail(true)
        }
        if(!pass || pass.length < 6) {
            setErrorPass(true)
        }

        if(errorEmail || errorPass) {
            return
        }
        await axios.post(`${BASE_URL}/api/user/login`, { email, pass }).then( res => {
            if(res.data.msg) {
                return router.reload()
            }
        })
    }
    const SubmitFormCreate = async (e: any) => {
        e.preventDefault()

        if(!email) {
            setErrorEmail(true)
        }
        if(!pass || pass.length < 6) {
            setErrorPass(true)
        }

        if(errorEmail || errorPass) {
            return
        }

        await axios.post(`${BASE_URL}/api/user/create`, { email, pass}).then(res => {
            if(res.data.msg) {
                router.reload()
            }
        })
    }

    React.useEffect(() => {
        if(User.data.auth) {
            router.push('/')
        }
    }, [User, router])

    return (
    <>
        <Box sx={defaultStyles.layoutPage}>

        {
            User.data.auth ? <Loading/> : 
            <Container maxWidth="lg" sx={Styles.container}>
            <Grow in={true}>
                <Paper sx={Styles.centerId}>
                    <Box sx={{ maxWidth: 350, width: '100%', p: 1 }}>
                        <Box sx={Styles.header}>
                            <Typography variant="h6">Login with {process.env.WEBNAME}</Typography>
                        </Box>
                        <Box sx={{ py: 2 }}>
                            <TextField 
                                variant="outlined"
                                fullWidth
                                size="small"
                                label="Email"
                                type="email"
                                name="email"
                                sx={Styles.textfield}
                                error={errorEmail}
                                helperText={errorEmailInit}
                                onChange={HandlerChangeEmail as any}
                            />
                            <TextField 
                                variant="outlined"
                                fullWidth
                                size="small"
                                label="Password"
                                type="password"
                                sx={Styles.textfield}
                                error={errorPass}
                                helperText={errorPasInit}
                                onChange={HandlerChangePass as any}
                            />
                        </Box>
                        <Box sx={Styles.footer}>
                            <Button variant="contained" fullWidth onClick={SubmitFormLogin}>Login</Button>
                        </Box>
                        <Divider sx={{ py: 1 }} />
                        <Box sx={Styles.footer}>
                            <Button variant="text" onClick={Back}><KeyboardBackspaceRoundedIcon /></Button>
                            <Button variant="text" onClick={SubmitFormCreate}>Create</Button>
                        </Box>
                    </Box>
                </Paper>
            </Grow>
        </Container>
        }

        </Box>
    </>
    )
}

export default Login