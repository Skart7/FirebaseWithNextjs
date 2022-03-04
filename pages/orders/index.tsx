import React from 'react'
import dynamic from 'next/dynamic'
import useSWR from 'swr' 
import axios from 'axios'

import {Grow, Paper} from '@mui/material'

const LayoutPage = dynamic(() => import("../../components/LayoutPage"))
const Loading = dynamic(() => import("../../components/Loading"))
const CardOrder = dynamic(() => import("../../components/account/orders/card"))

import { GetOrders } from '../../utils/firebase/querys/order'
import { useAppSelector } from '../../redux/hooks'
import { selectUser } from '../../redux/slices/user'
import { BASE_URL } from '../../utils/url'

export default function AccountPage() {

    const Styles: any = {
        paper: {p: 3},
    }

    const User = useAppSelector(selectUser)

    const [loading, setLoading] = React.useState(false)

    const url = 'getorder'
    const fetch = async () => {
        setLoading(true)
        if(!User.data.auth) {
            return window.location.href = '/'
        }
        const response = await axios.post(`${BASE_URL}/api/order/get`, {uid:User.data.uid})
        setLoading(false)
        return response.data.msg
    }

    const {data}:any = useSWR(url, fetch)

    return (
    <>
    <LayoutPage title="My orders">

        {
            loading ? <Loading /> :
            <Grow in={true}>
                <Paper sx={Styles.paper}>
                {
                    data != undefined && (
                        data.map( (item, index) => (
                            <CardOrder key={index} data={item} />
                        ))
                    )
                }
                </Paper>
            </Grow>
        }

    </LayoutPage>
    </>
    )
}