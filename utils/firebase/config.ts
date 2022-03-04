import firebase from 'firebase/compat/app'
import'firebase/compat/firestore'
import 'firebase/compat/auth'

const clientCredentials = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROGECT_ID,
  storageBucket: process.env.FB_STORAGE,
  messagingSenderId: process.env.FB_MESSAGING_SENDER,
  appId: process.env.FB_APP_ID
}

const app = firebase.initializeApp(clientCredentials)
export const auth = firebase.auth()
export const db = firebase.firestore(app)