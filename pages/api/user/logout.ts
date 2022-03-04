import nc from 'next-connect'
import type {NextApiRequest, NextApiResponse} from 'next'
import ClearCookies from '../../../utils/user/clearcookies'

const handler = nc()

handler.post(async (req:NextApiRequest, res:NextApiResponse) => {

    try {
        ClearCookies(req, res)
        return res.send({ msg: true })
    }
    catch (e) {
        console.log(e.message, "LOGOUT")
        
    }
})

export default handler