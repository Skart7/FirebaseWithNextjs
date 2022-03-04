import type {Data} from '../../utils/interfaces'

const dataInit = {data: [], qty: 0, amount: 0}

const getAmount = (storage: any) => {
  storage.amount = storage.data.reduce((acc:any, i:any) => acc + (parseInt(i.price) * i.count ), 0)
}
const getQty = (storage: any) => {
  storage.qty = storage.data.reduce((acc:any, i:any) => acc + (parseInt(i.count)), 0)
}
const saveCart = (storage: any) => {
    window.localStorage.setItem('cart', JSON.stringify(storage) )
}


function init() {
  const storage = JSON.parse(window.localStorage.getItem('cart') as any)

  storage || window.localStorage.setItem('cart', JSON.stringify(dataInit) )
}
function getStorage() {
  return JSON.parse(window.localStorage.getItem('cart') as any) || dataInit
}
function increase({data}:Data) {
  const storage = JSON.parse(window.localStorage.getItem('cart') as any)

  const existProduct = storage.data.find( (item:any) => item.id === data.id)

  if(existProduct) {
    existProduct.count++
    existProduct.total_price = (parseInt(existProduct.PRICE) * existProduct.COUNT)
  }
  else {
    storage.data.push({ 
      id: data.id,
      name: data.name,
      image: data.image || null,
      stock: Number(data.qty),
      price: Number(data.price),
      count: 1,
      total_price: Number(data.price)
    })
  }
  getAmount(storage)
  getQty(storage)
  saveCart(storage)
} 
function decrease({data}:Data) {
  const storage = JSON.parse(window.localStorage.getItem('cart') as any)

  const existProduct = storage.data.find( (item:any) => item.id === data.id)

  if(existProduct && existProduct.count === 1) {
    storage.data.splice(storage.data.indexOf(existProduct), 1)
  }
  else {
    existProduct.count--
    existProduct.total_price = (parseInt(existProduct.price) * existProduct.count)
  }
  getAmount(storage)
  getQty(storage)
  saveCart(storage)
} 
function deleteProduct({data}:Data) {
  const storage = JSON.parse(window.localStorage.getItem('cart') as any)

  const existProduct = storage.data.find( (item:any) => item.id === data.id)

  if(existProduct) {
    storage.data.splice(storage.data.indexOf(existProduct), 1)
  }
  getAmount(storage)
  getQty(storage)
  saveCart(storage)
}
function findProduct({data, setExistProduct}:{data:any, setExistProduct:React.Dispatch<React.SetStateAction<boolean>>}) {
  const storage = JSON.parse(window.localStorage.getItem('cart') as any)

  const existProduct = storage.data.find( (item:any) => item.id === data.id)

  if(existProduct) {
    return setExistProduct(true)
  }
  return setExistProduct(false)
}
function deleteStorage() {
  window.localStorage.removeItem('cart')
  window.localStorage.setItem('cart', JSON.stringify(dataInit))
}

const Cart = {dataInit, increase, init, decrease, deleteProduct, findProduct, getStorage, deleteStorage}
export default Cart