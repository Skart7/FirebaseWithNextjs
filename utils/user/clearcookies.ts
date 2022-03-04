import nookies from 'nookies'

export default function ClearCookies(req, res) {
    const cookies = nookies.get({req})

    for (const cookie of Object.keys(cookies)) {
        nookies.destroy({res}, cookie, {
            maxAge: new Date(0),
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'lax',
        })
    }
}