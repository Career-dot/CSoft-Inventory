export const products = [

  {
    id: 1,
    name: "MacBook Pro 14",
    sku: "MBP-001",
    category: "Electronics",
    price: 1899,
    stock: 45,
    warehouse: "Main Warehouse",
    status: "In Stock"
  },

  {
    id: 2,
    name: "Wireless Mouse",
    sku: "MOU-002",
    category: "Accessories",
    price: 29,
    stock: 120,
    warehouse: "Main Warehouse",
    status: "In Stock"
  },

  {
    id: 3,
    name: "Mechanical Keyboard",
    sku: "KEY-003",
    category: "Accessories",
    price: 89,
    stock: 8,
    warehouse: "Lahore Warehouse",
    status: "Low Stock"
  },

  {
    id: 4,
    name: "Dell Monitor 24",
    sku: "MON-004",
    category: "Electronics",
    price: 249,
    stock: 4,
    warehouse: "Main Warehouse",
    status: "Low Stock"
  },

  {
    id: 5,
    name: "USB-C Hub",
    sku: "HUB-005",
    category: "Accessories",
    price: 49,
    stock: 76,
    warehouse: "Faisalabad Warehouse",
    status: "In Stock"
  },

  {
    id: 6,
    name: "Webcam HD",
    sku: "CAM-006",
    category: "Electronics",
    price: 79,
    stock: 22,
    warehouse: "Lahore Warehouse",
    status: "In Stock"
  }

];


export const warehouses = [

  {
    id: 1,
    name: "Main Warehouse",
    location: "Faisalabad",
    products: 156,
    stock: 1240,
    capacity: "78%"
  },

  {
    id: 2,
    name: "Lahore Warehouse",
    location: "Lahore",
    products: 92,
    stock: 680,
    capacity: "62%"
  },

  {
    id: 3,
    name: "Faisalabad Warehouse",
    location: "Faisalabad",
    products: 74,
    stock: 420,
    capacity: "48%"
  }

];


export const suppliers = [

  {
    id: 1,
    name: "ABC Traders",
    contact: "0300-1234567",
    email: "abc@example.com",
    products: 25,
    status: "Active"
  },

  {
    id: 2,
    name: "Tech World Ltd.",
    contact: "0312-7654321",
    email: "tech@example.com",
    products: 18,
    status: "Active"
  },

  {
    id: 3,
    name: "Global Supplies",
    contact: "0321-4567890",
    email: "global@example.com",
    products: 12,
    status: "Active"
  },

  {
    id: 4,
    name: "Digital Source",
    contact: "0333-9876543",
    email: "digital@example.com",
    products: 9,
    status: "Inactive"
  }

];


export const stockIn = [

  {
    id: 1,
    product: "MacBook Pro 14",
    supplier: "ABC Traders",
    warehouse: "Main Warehouse",
    quantity: 20,
    date: "24 Aug 2026"
  },

  {
    id: 2,
    product: "Wireless Mouse",
    supplier: "Tech World Ltd.",
    warehouse: "Main Warehouse",
    quantity: 50,
    date: "23 Aug 2026"
  },

  {
    id: 3,
    product: "USB-C Hub",
    supplier: "Global Supplies",
    warehouse: "Faisalabad Warehouse",
    quantity: 30,
    date: "21 Aug 2026"
  }

];


export const stockOut = [

  {
    id: 1,
    product: "MacBook Pro 14",
    warehouse: "Main Warehouse",
    quantity: 5,
    reason: "Customer Order",
    date: "24 Aug 2026"
  },

  {
    id: 2,
    product: "Wireless Mouse",
    warehouse: "Main Warehouse",
    quantity: 15,
    reason: "Customer Order",
    date: "23 Aug 2026"
  },

  {
    id: 3,
    product: "Webcam HD",
    warehouse: "Lahore Warehouse",
    quantity: 4,
    reason: "Internal Use",
    date: "22 Aug 2026"
  }

];


export const stockChartData = [

  {
    month: "Mar",
    stockIn: 420,
    stockOut: 260
  },

  {
    month: "Apr",
    stockIn: 520,
    stockOut: 310
  },

  {
    month: "May",
    stockIn: 470,
    stockOut: 350
  },

  {
    month: "Jun",
    stockIn: 620,
    stockOut: 390
  },

  {
    month: "Jul",
    stockIn: 710,
    stockOut: 430
  },

  {
    month: "Aug",
    stockIn: 780,
    stockOut: 470
  }

];


export const categoryData = [

  {
    name: "Electronics",
    value: 420
  },

  {
    name: "Accessories",
    value: 310
  },

  {
    name: "Office",
    value: 180
  },

  {
    name: "Other",
    value: 120
  }

];