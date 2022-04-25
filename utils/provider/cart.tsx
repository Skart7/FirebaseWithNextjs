import React from 'react'

type CartType = {
    getCart: { data: any[], qty: number, amount: number },
    Increase: ({data}) => void
    Decrease: ({data}) => void
    DeleteProduct: ({data}) => void
    DeleteStorage: () => void
    GetStorage: () => void
}

type Props = {
    children: React.ReactNode
}

const cartContextDefaultValue: CartType = {
    getCart: { data: [], qty: 0, amount: 0 },
    Increase: () => {},
    Decrease: () => {},
    DeleteProduct: () => {},
    DeleteStorage: () => {},
    GetStorage: () => {},
}

const CartContext = React.createContext<CartType>(cartContextDefaultValue)

export function useCart() {
    return React.useContext(CartContext)
}

export function CartProvider({children}:Props) {

    const dataInit = {data: [], qty: 0, amount: 0}

    const [getCart, setCart] = React.useState(dataInit)

    function Init() {
        const storage = JSON.parse(window.localStorage.getItem('cart') as any)
        return storage || window.localStorage.setItem('cart', JSON.stringify(dataInit) )
    }

    const getAmount = (storage: any) => {
        storage.amount = storage.data.reduce((acc:any, i:any) => acc + (parseInt(i.price) * i.count ), 0)
    }
    const getQty = (storage: any) => {
        storage.qty = storage.data.reduce((acc:any, i:any) => acc + (parseInt(i.count)), 0)
    }
    const saveCart = (storage: any) => {
          window.localStorage.setItem('cart', JSON.stringify(storage) )
    }
    const [trigger, setTrigger] = React.useState(0)

    const Increase = ({data}) => {
        const storage = JSON.parse(window.localStorage.getItem('cart') as any)

        const existProduct = storage.data.find( (item:any) => item.id === data.id)
      
        if(existProduct) {
          existProduct.count++
          existProduct.total_price = (parseInt(existProduct.price) * existProduct.count)
        }
        else {
          storage.data.push({ 
            id: data.id,
            name: data.name,
            image: data.image || null,
            stock: Number(data.qty),
            price: Number(data.price),
            count: 1,
            total_price: Number(data.price),
            category: data.category
          })
        }
        getAmount(storage)
        getQty(storage)
        saveCart(storage)
        setTrigger(state => state + 1)
    }
    const Decrease = ({data}) => {
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
        setTrigger(state => state + 1)
    } 
    const DeleteProduct = ({data}) => {
        const storage = JSON.parse(window.localStorage.getItem('cart') as any)

        const existProduct = storage.data.find( (item:any) => item.id === data.id)
      
        if(existProduct) {
          storage.data.splice(storage.data.indexOf(existProduct), 1)
        }
        getAmount(storage)
        getQty(storage)
        saveCart(storage)
        setTrigger(state => state + 1)
    }
    const DeleteStorage = () => {
        window.localStorage.removeItem('cart')
        window.localStorage.setItem('cart', JSON.stringify(dataInit))
        setTrigger(state => state + 1)
    }
    const GetStorage = () => {
        return JSON.parse(window.localStorage.getItem('cart') as any) || dataInit
    }

    React.useEffect(() => {
        Init()
        setCart(GetStorage())
    }, [trigger])

    const value = {
        getCart,
        Increase,
        Decrease,
        DeleteProduct,
        DeleteStorage,
        GetStorage,
    }

    return (
    <>
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    </>
    )
}