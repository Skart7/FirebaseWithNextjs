import axios from 'axios'
import {BASE_URL} from '../url'

export async function Logout() {
    await axios.post(`${BASE_URL}/api/user/logout`).then(res => {
        if(res.data.msg) {
            window.location.href = '/'
        }
    })
}