export const mockOrderCounts = {
  all: 156,
  pending: 23,
  processing: 42,
  shipped: 31,
  delivered: 48,
  cancelled: 8,
  refunded: 4,
}

export const mockOrders = [
  {
    id: "ORD-7352",
    date: "2023-06-15T10:30:00",
    customer: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      avatar: "/abstract-aj.png",
      phone: "(555) 123-4567",
      address: {
        street: "123 Main St",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
      },
      createdAt: "2022-03-15",
    },
    items: [
      {
        name: "Wireless Noise-Cancelling Headphones",
        sku: "HDPHN-001",
        price: 249.99,
        quantity: 1,
        image: "/vibrant-headphones.png",
        total: 249.99,
      },
      {
        name: "Bluetooth Portable Speaker",
        sku: "SPKR-003",
        price: 79.99,
        quantity: 1,
        image: "/sleek-wireless-audio.png",
        total: 79.99,
      },
    ],
    total: 329.98,
    subtotal: 329.98,
    tax: 27.22,
    shipping: 0,
    paymentStatus: "paid",
    status: "delivered",
    timeline: [
      {
        status: "pending",
        title: "Order Placed",
        timestamp: "2023-06-15T10:30:00",
      },
      {
        status: "processing",
        title: "Processing",
        timestamp: "2023-06-15T11:45:00",
      },
      {
        status: "shipped",
        title: "Shipped",
        timestamp: "2023-06-16T09:15:00",
        note: "Package shipped via Express Shipping",
      },
      {
        status: "delivered",
        title: "Delivered",
        timestamp: "2023-06-18T14:20:00",
      },
    ],
  },
  {
    id: "ORD-6291",
    date: "2023-06-14T15:45:00",
    customer: {
      name: "Sarah Miller",
      email: "sarah.miller@example.com",
      avatar: "/abstract-geometric-sm.png",
      phone: "(555) 987-6543",
      address: {
        street: "456 Oak Ave",
        city: "Chicago",
        state: "IL",
        zip: "60611",
      },
      createdAt: "2021-11-05",
    },
    items: [
      {
        name: "Smart Watch Series 5",
        sku: "WTCH-005",
        price: 399.99,
        quantity: 1,
        image: "/modern-smartwatch-display.png",
        total: 399.99,
      },
    ],
    total: 399.99,
    subtotal: 399.99,
    tax: 36.0,
    shipping: 4.99,
    paymentStatus: "paid",
    status: "shipped",
    timeline: [
      {
        status: "pending",
        title: "Order Placed",
        timestamp: "2023-06-14T15:45:00",
      },
      {
        status: "processing",
        title: "Processing",
        timestamp: "2023-06-14T16:30:00",
      },
      {
        status: "shipped",
        title: "Shipped",
        timestamp: "2023-06-15T11:20:00",
        note: "Package shipped via Standard Shipping",
      },
    ],
  },
  {
    id: "ORD-5183",
    date: "2023-06-14T09:15:00",
    customer: {
      name: "Michael Chen",
      email: "michael.chen@example.com",
      avatar: "/microphone-crowd.png",
      phone: "(555) 234-5678",
      address: {
        street: "789 Pine St",
        city: "Seattle",
        state: "WA",
        zip: "98101",
      },
      createdAt: "2022-08-22",
    },
    items: [
      {
        name: "Wireless Earbuds",
        sku: "ERBD-002",
        price: 129.99,
        quantity: 1,
        image: "/sleek-wireless-earbuds.png",
        total: 129.99,
      },
      {
        name: "Portable Power Bank",
        sku: "PWBK-001",
        price: 49.99,
        quantity: 1,
        image: "/sleek-power-on-the-go.png",
        total: 49.99,
      },
      {
        name: "USB-C Charging Cable",
        sku: "CBLE-003",
        price: 19.99,
        quantity: 2,
        image: "/suspension-bridge-fog.png",
        total: 39.98,
      },
    ],
    total: 219.96,
    subtotal: 219.96,
    tax: 19.8,
    shipping: 0,
    paymentStatus: "paid",
    status: "processing",
    timeline: [
      {
        status: "pending",
        title: "Order Placed",
        timestamp: "2023-06-14T09:15:00",
      },
      {
        status: "processing",
        title: "Processing",
        timestamp: "2023-06-14T10:30:00",
      },
    ],
  },
  {
    id: "ORD-4072",
    date: "2023-06-13T14:20:00",
    customer: {
      name: "Emily Rodriguez",
      email: "emily.rodriguez@example.com",
      avatar: "/placeholder.svg?height=40&width=40&query=ER",
      phone: "(555) 345-6789",
      address: {
        street: "321 Maple Rd",
        city: "Austin",
        state: "TX",
        zip: "78701",
      },
      createdAt: "2023-01-10",
    },
    items: [
      {
        name: "Yoga Mat",
        sku: "YOGA-001",
        price: 45.99,
        quantity: 1,
        image: "/rolled-yoga-mat.png",
        total: 45.99,
      },
      {
        name: "Fitness Tracker",
        sku: "FTNS-002",
        price: 89.99,
        quantity: 1,
        image: "/wrist-tech-lifestyle.png",
        total: 89.99,
      },
    ],
    total: 135.98,
    subtotal: 135.98,
    tax: 11.22,
    shipping: 5.99,
    paymentStatus: "paid",
    status: "pending",
    timeline: [
      {
        status: "pending",
        title: "Order Placed",
        timestamp: "2023-06-13T14:20:00",
      },
    ],
  },
  {
    id: "ORD-3961",
    date: "2023-06-12T11:05:00",
    customer: {
      name: "David Wilson",
      email: "david.wilson@example.com",
      avatar: "/placeholder.svg?height=40&width=40&query=DW",
      phone: "(555) 456-7890",
      address: {
        street: "654 Elm St",
        city: "Boston",
        state: "MA",
        zip: "02108",
      },
      createdAt: "2022-05-18",
    },
    items: [
      {
        name: "Premium T-Shirt",
        sku: "TSRT-001",
        price: 29.99,
        quantity: 2,
        image: "/classic-plain-tee.png",
        variant: "Black, Size L",
        total: 59.98,
      },
      {
        name: "Premium T-Shirt",
        sku: "TSRT-001",
        price: 29.99,
        quantity: 1,
        image: "/classic-plain-tee.png",
        variant: "White, Size M",
        total: 29.99,
      },
    ],
    total: 89.97,
    subtotal: 89.97,
    tax: 7.42,
    shipping: 4.99,
    paymentStatus: "failed",
    status: "cancelled",
    timeline: [
      {
        status: "pending",
        title: "Order Placed",
        timestamp: "2023-06-12T11:05:00",
      },
      {
        status: "cancelled",
        title: "Cancelled",
        timestamp: "2023-06-12T11:35:00",
        note: "Payment failed, order automatically cancelled",
      },
    ],
  },
  {
    id: "ORD-2850",
    date: "2023-06-11T16:30:00",
    customer: {
      name: "Olivia Thompson",
      email: "olivia.thompson@example.com",
      avatar: "/placeholder.svg?height=40&width=40&query=OT",
      phone: "(555) 567-8901",
      address: {
        street: "987 Cedar Ln",
        city: "Denver",
        state: "CO",
        zip: "80202",
      },
      createdAt: "2022-09-30",
    },
    items: [
      {
        name: "Digital Art Software",
        sku: "SFTW-003",
        price: 199.99,
        quantity: 1,
        image: "/3d-scene-creation.png",
        total: 199.99,
      },
    ],
    total: 199.99,
    subtotal: 199.99,
    tax: 16.5,
    shipping: 0,
    paymentStatus: "paid",
    status: "delivered",
    timeline: [
      {
        status: "pending",
        title: "Order Placed",
        timestamp: "2023-06-11T16:30:00",
      },
      {
        status: "processing",
        title: "Processing",
        timestamp: "2023-06-11T17:15:00",
      },
      {
        status: "delivered",
        title: "Delivered",
        timestamp: "2023-06-11T17:30:00",
        note: "Digital product delivered via email",
      },
    ],
  },
  {
    id: "ORD-1749",
    date: "2023-06-10T13:45:00",
    customer: {
      name: "James Brown",
      email: "james.brown@example.com",
      avatar: "/placeholder.svg?height=40&width=40&query=JB",
      phone: "(555) 678-9012",
      address: {
        street: "753 Birch Ave",
        city: "Miami",
        state: "FL",
        zip: "33130",
      },
      createdAt: "2021-12-05",
    },
    items: [
      {
        name: "Essential Oil Diffuser",
        sku: "HOME-005",
        price: 59.99,
        quantity: 1,
        image: "/glowing-vial.png",
        total: 59.99,
      },
    ],
    total: 59.99,
    subtotal: 59.99,
    tax: 4.95,
    shipping: 5.99,
    paymentStatus: "refunded",
    status: "refunded",
    timeline: [
      {
        status: "pending",
        title: "Order Placed",
        timestamp: "2023-06-10T13:45:00",
      },
      {
        status: "processing",
        title: "Processing",
        timestamp: "2023-06-10T14:30:00",
      },
      {
        status: "shipped",
        title: "Shipped",
        timestamp: "2023-06-11T10:15:00",
      },
      {
        status: "delivered",
        title: "Delivered",
        timestamp: "2023-06-13T15:20:00",
      },
      {
        status: "refunded",
        title: "Refunded",
        timestamp: "2023-06-15T09:45:00",
        note: "Customer reported product defect, full refund issued",
      },
    ],
  },
  {
    id: "ORD-0638",
    date: "2023-06-09T09:10:00",
    customer: {
      name: "Sophia Garcia",
      email: "sophia.garcia@example.com",
      avatar: "/placeholder.svg?height=40&width=40&query=SG",
      phone: "(555) 789-0123",
      address: {
        street: "159 Walnut St",
        city: "Portland",
        state: "OR",
        zip: "97201",
      },
      createdAt: "2022-07-12",
    },
    items: [
      {
        name: "Wireless Noise-Cancelling Headphones",
        sku: "HDPHN-001",
        price: 249.99,
        quantity: 1,
        image: "/vibrant-headphones.png",
        total: 249.99,
      },
    ],
    total: 249.99,
    subtotal: 249.99,
    tax: 20.62,
    shipping: 0,
    paymentStatus: "pending",
    status: "pending",
    timeline: [
      {
        status: "pending",
        title: "Order Placed",
        timestamp: "2023-06-09T09:10:00",
      },
    ],
  },
]
