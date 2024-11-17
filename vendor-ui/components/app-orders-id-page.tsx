'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// This would typically come from a database or API
const getOrderDetails = (id: string) => ({
  id: parseInt(id),
  customerName: 'John Doe',
  totalAmount: 100,
  dateCreated: '2023-05-20',
  orderLines: [
    { product: 'Widget A', quantity: 2, price: 25 },
    { product: 'Gadget B', quantity: 1, price: 50 },
  ],
  trackingNumber: '',
})

export function BlockPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [order, setOrder] = useState(getOrderDetails(params.id))
  const [trackingNumber, setTrackingNumber] = useState('')

  const handleSubmitTracking = async (e: React.FormEvent) => {
    e.preventDefault()
    // This would typically be an API call to update the order
    setOrder({ ...order, trackingNumber })
    alert('Tracking number submitted successfully!')
  }

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => router.back()} className="mb-4">Back to Order List</Button>
      <Card>
        <CardHeader>
          <CardTitle>Order #{order.id} Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Customer: {order.customerName}</p>
          <p>Date Created: {order.dateCreated}</p>
          <p>Total Amount: ${order.totalAmount}</p>
          <h3 className="font-semibold mt-4 mb-2">Order Lines:</h3>
          <ul>
            {order.orderLines.map((line, index) => (
              <li key={index}>
                {line.product} - Quantity: {line.quantity}, Price: ${line.price}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Tracking Number:</h3>
            {order.trackingNumber ? (
              <p>{order.trackingNumber}</p>
            ) : (
              <form onSubmit={handleSubmitTracking} className="flex gap-2">
                <Input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                  required
                />
                <Button type="submit">Submit</Button>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}