import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import axios from 'axios'

const LayoutPage = dynamic(() => import("../components/LayoutPage"))
const Loading = dynamic(() => import("../components/Loading"))
const CheckoutCardForCard = dynamic(() => import("../components/checkout/card"))
const BlockUserData = dynamic(() => import("../components/checkout/blocks/userdata"))
const BlockPayment = dynamic(() => import("../components/checkout/blocks/payment"))
const BlockComment = dynamic(() => import("../components/checkout/blocks/comment"))
const SnackbarComp = dynamic(() => import("../components/Snackbar"))

import { selectUser } from '../redux/slices/user'
import { useAppSelector } from '../redux/hooks'
import { BASE_URL } from '../utils/url'
import {useCart} from '../utils/provider/cart'

import { Box, Grow, Typography, Divider, Paper, Button } from '@mui/material'

export default function Checkout() {

    const Styles: any = {
        contentCart: {minHeight: 0, maxHeight: 300, overflowY: 'scroll', width: '100%', height: '100%'},
        wrapperPage: {display: 'flex', justifyContent: 'space-between', gridGap: '0.5vw', alignItems: 'start'},
        contentBoxLeft: {width: '70%'},
        contentBoxRight: {width: '30%', p: 2},
        contentCartBottom: {mt: 2, textAlign: 'end', fontWeight: 600},
    }

    const User = useAppSelector(selectUser)
    const router = useRouter()
    const {getCart, DeleteStorage} = useCart()

    const alertDefault = { message: "", severity: "", status: false }
    const [alert, setAlert] = React.useState<{status: boolean, message: string, severity: any}>(alertDefault)

    const AlertMessage = {
        emptyUserData: "Fill in user data",
        emptyPaymentMethod: "Select a payment method",
        loading: "Wait a bit",
        success: "Success!"
    }

    const [uData, setuData] = React.useState({email:'',name:''})
    const HandleChangeUserData = (e:any) => {
        setuData({...uData, [e.target.name]:e.target.value})
        setAlert(alertDefault)
    }

    const [payment, setPayment] = React.useState('select payment')
    const HandleChangePayment = (e:any) => {
        setPayment(e.target.value)
        setAlert(alertDefault)
    }

    const [comment, setComment]= React.useState('')
    const HandleChangeComment = (e:any) =>{
        setComment(e.target.value)
        setAlert(alertDefault)
    }

    const [getSnackbar, setSnackbar] = React.useState(false)

    const SubmitForm = async () => {

        const name = uData.name || User.data.name
        const email = uData.email || User.data.email
        const uid = User.data.uid

        if(name === '' || email === "") {
            setAlert({message: AlertMessage.emptyUserData, severity: 'error', status: true})
            setSnackbar(true)
            return
        }
        if(payment === 'select payment') {
            setAlert({message: AlertMessage.emptyPaymentMethod, severity: 'error', status: true})
            setSnackbar(true)
            return
        }

        setAlert({message: AlertMessage.loading, severity: 'info', status: true})
        setSnackbar(true)

        const data = {
            name, 
            email, 
            uid, 
            comment, 
            payment, 
            cart: getCart, 
            prepayment: payment === 'card' ? getCart.amount : 0, 
            orderstatus: payment === 'card' ? true: false
        }
        await axios.post(`${BASE_URL}/api/order/create`, {data}).then( res => {
            if(res.data.msg) {
                DeleteStorage()
                setAlert({message: AlertMessage.success, severity: 'success', status: true})
                setSnackbar(true)
                return router.push('/orders')
            }
        })
        
    }

    return (
    <>
    {
        !User.data.auth ? <Loading /> : 
        <LayoutPage title="Checkout">
        <Grow in={true}>
            <Box sx={Styles.wrapperPage}>
                <Box sx={Styles.contentBoxLeft}>

                    <BlockUserData
                       uData={uData}
                       HandleChangeUserData={HandleChangeUserData} 
                       name={User.data.name}
                       email={User.data.email}
                    />
                    <BlockPayment
                        payment={payment}
                        HandleChangePayment={HandleChangePayment}
                    />
                    <BlockComment
                        comment={comment}
                        HandleChangeComment={HandleChangeComment}
                    />
                </Box>
                <Paper sx={Styles.contentBoxRight}>
                    <Box sx={Styles.contentCart}>
                    {
                        getCart.data.map(data => (
                            <CheckoutCardForCard key={data.id} data={data} />
                        ))
                    }
                    </Box>
                    <Divider />
                    <Box sx={Styles.contentCartBottom}>
                        <Typography variant="h5">Total {getCart.amount} $</Typography>
                        <Typography variant="h6">Count {getCart.qty}</Typography>
                    </Box>
                    <Box>
                    <Button
                        sx={{ width: '100%', mt: 2}}
                        variant="contained"
                        onClick={SubmitForm}
                        disabled={alert.status}
                    >Submit order</Button>
                    </Box>
                </Paper>
            </Box>
        </Grow>
        </LayoutPage>
    }


    <SnackbarComp 
        getSnackbar={getSnackbar}
        setSnackbar={setSnackbar}
        message={alert.message}
        severity={alert.severity}
    />

    </>
    )
}