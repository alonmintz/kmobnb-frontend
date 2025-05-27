import { useParams } from "react-router";

export function HostOrderPage() {
  const params = useParams();

  console.log('params', params)

  return (
    <section className="host-order-page">
      <header className="section-title">
        <h1>{params.orderId ? `Order ID: ${params.orderId}` : "No order!"}</h1>
      </header>
      <div className="host-order-contents">
        
      </div>
    </section>
  )
}