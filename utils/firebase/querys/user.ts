import {db} from '../config'

interface ReqDataCreateUser { uid: string, name: string, age: number, gender: string }
interface ReqDataUser { uid: string }
interface ReqDataUserUpdate { doc: string, updateData: { age: number, gender: string, name: string } }

export async function CreateDataUser(
{uid, name, age, gender}:ReqDataCreateUser) 
{
    const data = { uid: uid, name: name, age: age, gender: gender }
    const docRef = await db.collection("users").doc(uid)
    const res = await docRef.set(data)
    return res
}


export async function GetDataUser(
{uid}:ReqDataUser) 
{
    const response = await db.collection("users").doc(uid).get()
    return response.data()
}

export async function UpdateDataUser(
{doc, updateData}:ReqDataUserUpdate) 
{
    await db.collection("users").doc(doc).update(updateData)
}