import nc from 'next-connect'
import type {NextApiRequest, NextApiResponse} from 'next'
import {UpdateDataUser} from '../../../utils/firebase/querys/user'
const handler = nc()

handler.post(async (req:NextApiRequest, res:NextApiResponse) => {

    try {
        const {doc, updateData} = req.body
        
        if(doc && updateData) {
            await UpdateDataUser({doc, updateData})
            return res.send({msg: true})
        }
        return res.send({err: true})
    }
    catch (e) {
        console.log(e.message, "UPDATE")
        
    }
})

export default handler