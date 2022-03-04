import {db} from '../config'

interface ReqDataOrder { uid: string }
interface ReqDataCreateOrder {
    name: string, email: string, uid: string, comment: string, payment: string, prepayment: number, orderstatus: boolean, cart: { data: any[], qty: number, amount: number }
}

export async function GetOrders(uid:ReqDataOrder) 
{
    const res = await db.collection('orders').where('user.uid', "==", uid).get()
    
    const arr = []

    res.forEach( doc => {
        arr.push(doc.data())
    })
    return arr
}

export async function CreateOrder(
{name, email, uid, comment, payment, cart, prepayment, orderstatus}:ReqDataCreateOrder) 
{
    const data = {
        user: {
            name: name,
            email: email,
            uid: uid
        },
        info: {
            payment: payment,
            date: new Date(),
            comment: comment,
            prepayment: prepayment,
            orderstatus: orderstatus,
        },
        cart
    }

    const docRef = db.collection('orders')
    const res = await docRef.add(data)
    return res
}