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

import Cart from '../components/storage/cart'
import { selectUser } from '../redux/slices/user'
import { useAppSelector } from '../redux/hooks'
import { BASE_URL } from '../utils/url'

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

    const [getCart, setCart] = React.useState(Cart.dataInit)
    React.useEffect(() => {setCart(Cart.getStorage())},[])

    const [uData, setuData] = React.useState({email:'',name:''})
    const HandleChangeUserData = (e:any) => setuData({...uData, [e.target.name]:e.target.value})

    const [payment, setPayment] = React.useState('select payment')
    const HandleChangePayment = (e:any) => setPayment(e.target.value)

    const [comment, setComment]= React.useState('')
    const HandleChangeComment = (e:any) => setComment(e.target.value)

    const SubmitForm = async () => {
        const data = {
            name: uData.name || User.data.name, 
            email: uData.email || User.data.email, 
            uid: User.data.uid, 
            comment: comment, 
            payment: payment, 
            cart: getCart, 
            prepayment: payment === 'card' ? getCart.amount : 0, 
            orderstatus: payment === 'card' ? true: false
        }
        await axios.post(`${BASE_URL}/api/order/create,`, {data})
        await Cart.deleteStorage()
        return router.push('/orders')
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
                    <Box>
                       <Button
                        sx={{ width: '100%', mt: 2}}
                        variant="contained"
                        onClick={SubmitForm}
                       >Submit order</Button>
                    </Box>
                </Box>
                <Paper sx={Styles.contentBoxRight}>
                    <Typography variant="h6">New Order</Typography>

                    <Box sx={Styles.contentCart}>
                    {
                        getCart.data.map(data => (
                            <CheckoutCardForCard key={data.id} data={data} />
                        ))
                    }
                    </Box>
                    <Divider />
                    <Box sx={Styles.contentCartBottom}>
                        <Typography variant="body1">Total {getCart.amount}</Typography>
                        <Typography variant="body1">Count {getCart.qty}</Typography>
                    </Box>
                </Paper>
            </Box>
        </Grow>
        </LayoutPage>
    }
    </>
    )
}