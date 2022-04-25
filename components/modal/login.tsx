import React from 'react'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { useRouter } from 'next/router'

import { Box, Grow, Modal, Typography, IconButton, TextField, Button, Divider } from '@mui/material'
import { BASE_URL } from '../../utils/url'

const CloseRoundedIcon = dynamic(() => import("@mui/icons-material/CloseRounded"))

interface IHandleChangeValue {
    target: HTMLInputElement
}

const LoginModal = ({setOpenLogin, openLogin}) => {

    const Styles: any = {
        footer: { my: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center'},
        header: { my: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center'},
        textfield: {my: 1},
        wrapper: { position: 'fixed',p: 3,zIndex: 1000,pb: 10,top: '50%',left: '50%',transform: 'translate(-50%, -50%)',maxWidth: 450,width: '100%',borderRadius: 2,boxShadow: 24, bgcolor: 'background.paper' }
    }

    const router = useRouter()

    const errorEmailInit = 'Your real Email'
    const errorPasInit = 'Password length must be 6 characters'

    const [email, setEmail] = React.useState("")
    const [pass, setPass] = React.useState("")
    const [errorEmail, setErrorEmail] = React.useState(false)
    const [errorPass, setErrorPass] = React.useState(false)

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
    
  return (
    <>
    <Modal
        onClick={ () => setOpenLogin(false) }
        open={openLogin}
    >
        <Box sx={Styles.wrapper} onClick={ (e) => e.stopPropagation() }>

        <Grow in={openLogin}>

            <Box>
                <Box sx={Styles.header}>
                    <Typography variant="h6">Login with {process.env.WEBNAME}</Typography>
                    <IconButton onClick={ () => setOpenLogin(false) }><CloseRoundedIcon fontSize="small" /></IconButton>
                </Box>

                <Box>
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
                        <Button variant="text" onClick={SubmitFormCreate}>Create</Button>
                    </Box>
                </Box>
            </Box>

        </Grow>

        </Box>
    </Modal>
    </>
  )
}

export default LoginModal