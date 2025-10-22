import MenuItem from "./components/MenuItem"
import OrderContents from "./components/OrderContents"
import OrderTotals from "./components/OrderTotals"
import TipPercentageForm from "./components/TipPercentageForm"
import { menuItems } from "./data/db"
import useOrder from "./hooks/useOrder"

function App() {

  const { order, tip, setTip, addItem, removeItem, placeOrder, savedOrders } = useOrder()

  // 💡 CÁLCULO DE RESUMEN DE PROPINAS Y ÓRDENES
  const totalTips = savedOrders.reduce((sum, savedOrder) => {
    // La propina se calcula como: (subtotal * porcentaje de propina)
    const tipAmount = savedOrder.subtotal * savedOrder.tip;
    return sum + tipAmount;
  }, 0);
  
  const totalOrders = savedOrders.length;
  // -------------------------------------------------------------

  console.log("🛎️ Estado actual de la orden:", order)
  console.log("💾 Historial de Órdenes Guardadas:", savedOrders)

  return (
    <>
      <header className=" bg-teal-400 py-5">
        <h1 className="text-center text-4xl font-black">Calculadora de Propinas y Consumo</h1>
      </header>

      {/* 💡 INICIO DE SECCIÓN DE HISTORIAL DE ÓRDENES Y RESUMEN */}
      {savedOrders.length > 0 && (
          <section className="max-w-7xl mx-auto pt-10 px-5">
              
              {/* Bloque de Resumen */}
              <div className="bg-teal-100 p-4 mb-6 rounded-lg shadow-inner border border-teal-300">
                  <h2 className="font-black text-3xl text-teal-800 mb-2">Resumen Global</h2>
                  <p className="text-xl font-bold text-gray-700">
                      Órdenes Cargadas: <span className="text-teal-700">{totalOrders}</span>
                  </p>
                  <p className="text-xl font-bold text-gray-700">
                      Total de Propinas Acumuladas: <span className="text-green-600">${totalTips.toFixed(2)}</span>
                  </p>
              </div>
              
              <h3 className="font-black text-3xl mb-5 text-gray-700">Historial de Órdenes Guardadas</h3>

              <div className="space-y-4">
                  {/* El .map() sigue siendo el mismo */}
                  {savedOrders.map((savedOrder, index) => (
                      <div key={savedOrder.id} className="p-4 border rounded-lg bg-white shadow-md">
                          <p className="font-bold text-lg text-teal-600">
                              Orden #{savedOrders.length - index} 
                              <span className="text-sm font-normal text-gray-500 ml-2">(ID: {savedOrder.id})</span>
                          </p>
                          
                          {/* Calculamos y mostramos el monto de la propina individual */}
                          <p>Subtotal: <span className="font-semibold">${savedOrder.subtotal.toFixed(2)}</span></p>
                          <p>Propina %: <span className="font-semibold">{(savedOrder.tip * 100).toFixed(0)}%</span></p>
                          <p>Monto de Propina: <span className="font-semibold text-green-500">${(savedOrder.subtotal * savedOrder.tip).toFixed(2)}</span></p>
                          
                          <p className="text-xl font-black mt-1">Total: <span className="text-red-500">${savedOrder.total.toFixed(2)}</span></p>
                          
                          <p className="text-sm mt-2 text-gray-600">Ítems:</p>
                          <ul className="text-sm ml-4 list-disc text-gray-600">
                              {savedOrder.items.map(item => (
                                  <li key={item.id}>{item.name} x {item.quantity} - Total: ${item.price * item.quantity}</li>
                              ))}
                          </ul>
                      </div>
                  ))}
              </div>
          </section>
      )}
      {/* 💡 FIN DE SECCIÓN DE HISTORIAL DE ÓRDENES */}

      <main className=" max-w-7xl mx-auto py-20 grid md:grid-cols-2">
        <div className='p-5'>
          <h2 className='font-black text-4xl'>Menú</h2>

          <div className='mt-10 space-y-3'>
            {menuItems.map(item => (
              <MenuItem 
                key={item.id}
                item={item}
                addItem={addItem}
              />
            ))}
          </div>
        </div>

        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          {order.length ? (
            <>
              <OrderContents
                order={order}
                removeItem={removeItem}
              />
              <TipPercentageForm 
                setTip={setTip}
                tip={tip}
              />
              <OrderTotals 
                order={order}
                tip={tip}
                placeOrder={placeOrder}
              />
            </>
          ) : (
            <p className="text-center">La orden esta vacia</p>
          )}


        </div>
      </main>

    </>
  )
}

export default App