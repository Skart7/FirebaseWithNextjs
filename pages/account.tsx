import React from 'react'
import dynamic from 'next/dynamic'

import {Button, Fade, Paper, Box} from '@mui/material'

const TextField = dynamic(() => import("@mui/material/TextField"))
const LayoutPage = dynamic(() => import("../components/LayoutPage"))
const Loading = dynamic(() => import("../components/Loading"))

import { selectUser } from '../redux/slices/user'
import { useAppSelector } from '../redux/hooks'
import axios from 'axios'
import { BASE_URL } from '../utils/url'
import { useRouter } from 'next/router'

export default function AccountPage() {

    const Styles: any = {
        paper: {p: 3, textAlign: 'center'},
        field: {m: 1},
        wrapperButton: { my: 2 }
    }

    const User = useAppSelector(selectUser)
    const router = useRouter()

    const [getAge, setAge] = React.useState('')
    const [getGender, setGender] = React.useState('')
    const [getName, setName] = React.useState('')

    const UpdateDataUser = async () => {
        const doc = User.data.uid
        const updateData = {
            age: getAge || User.data.age,
            gender: getGender || User.data.gender,
            name: getName || User.data.name
        }
        await axios.post(`${BASE_URL}/api/user/update`, {doc, updateData})
        return router.reload()
    }
    
    return (
    <>
    <LayoutPage title="About account">

    <Fade in={true}>
    {
        !User.data.auth ? <Loading /> :
        <Paper sx={Styles.paper}>
            <TextField
                sx={Styles.field}
                label="Email"
                variant="outlined"
                disabled
                value={User.data.email}
            />
            <TextField
                sx={Styles.field}
                label="Name"
                variant="outlined"
                defaultValue={User.data.name || ''}
                onChange={ (e) => setName(e.target.value) }
            />
            <TextField
                sx={Styles.field}
                label="Age"
                variant="outlined"
                defaultValue={User.data.age || ''}
                onChange={ (e) => setAge(e.target.value) }
            />
            <TextField
                sx={Styles.field}
                label="Gender"
                variant="outlined"
                defaultValue={User.data.gender || ''}
                onChange={ (e) => setGender(e.target.value) }
            />
            <Box sx={Styles.wrapperButton}>
                <Button variant="contained" onClick={UpdateDataUser}>Update data</Button>
            </Box>
        </Paper>
    }
    </Fade>

    </LayoutPage>
    </>
    )
}