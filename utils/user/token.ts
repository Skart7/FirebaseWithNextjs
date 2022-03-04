import jwt from 'jsonwebtoken'
import nookies from 'nookies'

export const RefreshToken = async (user, res) => {
    const token = await jwt.sign(
        {
            uid: user.uid,
            name: user.name,
            age: user.age,
            gender: user.gender,
            email: user.email,
            auth: user.auth,
        },
            process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: '1d',
        }
    )
    
    nookies.set({res}, 'fbtoken', token, {
        maxAge: 3600 * 24 * 1,
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'lax',
    })
} 