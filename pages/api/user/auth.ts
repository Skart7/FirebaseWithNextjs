import nc from 'next-connect'
import type {NextApiRequest, NextApiResponse} from 'next'
import jwt from 'jsonwebtoken'
import {GetDataUser} from '../../../utils/firebase/querys/user'
import ClearCookies from '../../../utils/user/clearcookies'
import {RefreshToken} from '../../../utils/user/token'
const handler = nc()

handler.post(async (req:NextApiRequest, res:NextApiResponse) => {

    try {
        const {data} = req.body
        
        if(data) {
            const JWTData = jwt.verify(data, process.env.JWT_REFRESH_SECRET)  

            const userData = await GetDataUser({uid: JWTData.uid})
   
            if(!userData) {
                await ClearCookies(req, res)
                return res.send({err: true})
            }

            const userOption = {
                uid: userData.uid,
                name: userData.name,
                age: userData.age,
                gender: userData.gender,
                email: JWTData.email,
                auth: true,
            }
  
            await RefreshToken(userOption, res)
            return res.send({ msg: userOption })
        }
        return res.send({err: true})
    }
    catch (e) {
        console.log(e.message, "AUTH")
        
    }
})

export default handler