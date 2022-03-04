import nc from 'next-connect'
import type {NextApiRequest, NextApiResponse} from 'next'
import {CreateOrder} from '../../../utils/firebase/querys/order'
const handler = nc()

handler.post(async (req:NextApiRequest, res:NextApiResponse) => {

    try {
        const {data} = req.body
        // not tested
        if(data) {
            await CreateOrder({
                name: data.name,
                email: data.email, 
                uid: data.uid, 
                comment: data.comment, 
                payment: data.payment, 
                cart: data.getCart, 
                prepayment: data.prepayment, 
                orderstatus: data.orderstatus
            })
            return res.send({msg: true})
        }
        return res.send({err: true})
    }
    catch (e) {
        console.log(e.message, "AUTH")
        
    }
})

export default handler