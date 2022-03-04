import nc from 'next-connect'
import type {NextApiRequest, NextApiResponse} from 'next'
import {GetOrders} from '../../../utils/firebase/querys/order'
const handler = nc()

handler.post(async (req:NextApiRequest, res:NextApiResponse) => {

    try {
        const {uid} = req.body
        
        if(uid) {
            const response = await GetOrders(uid)
            return res.send({msg: response})
        }
    }
    catch (e) {
        console.log(e.message, "AUTH")
        
    }
})

export default handler