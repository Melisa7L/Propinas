import { useState, useEffect } from "react"
import type { MenuItem, OrderItem } from "../types"

type SavedOrder = {
    id: number
    items: OrderItem[]
    tip: number
    subtotal: number
    total: number
}

export default function useOrder() {
    const [order, setOrder] = useState<OrderItem[]>([])
    const [tip, setTip] = useState(0)
const [savedOrders, setSavedOrders] = useState<SavedOrder[]>([])
useEffect(() => {
        console.log("📋 **[useEffect]** Historial ACTUALIZADO de órdenes:", savedOrders)
    }, [savedOrders])
    const addItem = (item: MenuItem) => {
        const existingItem = order.find(orderItem => orderItem.id === item.id)

        if (existingItem) {
            const updatedOrder = order.map(orderItem =>
                orderItem.id === item.id
                    ? { ...orderItem, quantity: orderItem.quantity + 1 }
                    : orderItem
            )
            setOrder(updatedOrder)
        } else {
            const newItem = { ...item, quantity: 1 }
            setOrder([...order, newItem])
        }
    }

    const removeItem = (id: MenuItem['id']) => {
        setOrder(order.filter(item => item.id !== id))
    }

    const placeOrder = () => {

        console.log("🚀 Colocando orden...",order)

        //if (order.length === 0) return

        const subtotal = order.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        )
        const total = subtotal + subtotal * tip

        // ✅ Clonamos los ítems para que no se borren al limpiar el estado
        const newOrder: SavedOrder = {
            id: Date.now(),
            items: order.map(item => ({ ...item })), // 👈 copia real del contenido
            tip,
            subtotal,
            total,
        }

        setSavedOrders(prev => [...prev, newOrder])

        console.log("✅ Orden guardada:", newOrder)
        console.log("📋 Historial actual de órdenes:", [...savedOrders, newOrder])

        alert("Orden guardada correctamente ✅")

        // 🔄 Limpia el pedido actual
        setOrder([])
        setTip(0)
    console.log("🧹 Estado de la orden limpiado.",order)
    }

    return {
        order,
        tip,
        setTip,
        addItem,
        removeItem,
        placeOrder,
        savedOrders,
    }
}
