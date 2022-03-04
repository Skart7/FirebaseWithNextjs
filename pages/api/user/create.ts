import nc from 'next-connect'
import type {NextApiRequest, NextApiResponse} from 'next'
import jwt from 'jsonwebtoken'
import nookies from 'nookies'
import { auth } from '../../../utils/firebase/config'
import {CreateDataUser} from '../../../utils/firebase/querys/user'
const handler = nc()

handler.post(async (req:NextApiRequest, res:NextApiResponse) => {

    try {
        const {email, pass} = req.body

        const resData = await auth.createUserWithEmailAndPassword(email, pass)

        if(resData.user.uid) {
            await CreateDataUser({
                uid: resData.user.uid,
                name: '',
                age: null,
                gender: '',
            })

            const token = await jwt.sign(
                {
                  uid: resData.user.uid,
                  name: '',
                  age: null,
                  gender: '',
                  email: resData.user.email,
                  auth: true,
                },
                    process.env.JWT_REFRESH_SECRET,
                {
                  expiresIn: '1d',
                }
            )
            
            await nookies.set({res}, 'fbtoken', token, {
                maxAge: 3600 * 24 * 1,
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'lax',
            })

            return res.send({msg: true})
        }

        return res.send({err: true})
    }
    catch (e) {
        console.log(e.message, "CREATE")
        
    }
})

export default handler