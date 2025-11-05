export const sidebarLinks = [
  {
    name: "Dashboard",icon: "/icons/dashboard.svg", path: "/"
  },
  {
    name: "Accounts", icon: "/icons/account.svg", path: "/accounts"
  },
  {
    name: "Product", icon: "/icons/product.svg", path: "/product"
    },
    {
    name: "Orders", icon: "/icons/order.svg", path: "/orders"
  }
];


export   const products = [
    {
      id: 1,
      name: "Blue Summer Dress",
      price: 1200,
      quantity: 25,
      product_type: "Women",
      description: "Light and comfortable summer wear",
    },
    {
      id: 2,
      name: "Men’s Formal Shirt",
      price: 950,
      quantity: 40,
      product_type: "Men",
      description: "Cotton slim fit office wear",
    },
    {
      id: 3,
      name: "Kids Hoodie",
      price: 650,
      quantity: 30,
      product_type: "Kids",
      description: "Soft fleece hoodie for winter",
    },
  ];

  export const account = [
  {
    "id": 1,
    "name": "TechVision Pvt Ltd",
    "mobile_number": "+91 9876543210",
    "email": "contact@techvision.com",
    "website": "https://techvision.com",
    "number_of_employees": 120,
    "gst_number": "29ABCDE1234F1Z5",
    "address": "12th Cross, Indiranagar, Bengaluru, Karnataka",
    "industry": "Information Technology",
    "sector": "Software Development",
    "primary_contact": "Ravi Kumar"
  },
  {
    "id": 2,
    "name": "BrightMart Retailers",
    "mobile_number": "+91 9845123478",
    "email": "support@brightmart.in",
    "website": "https://brightmart.in",
    "number_of_employees": 85,
    "gst_number": "27XYZPQ5678K2A3",
    "address": "Plot 45, Sector 12, Navi Mumbai, Maharashtra",
    "industry": "Retail",
    "sector": "E-commerce",
    "primary_contact": "Sneha Patel"
  },
  {
    "id": 3,
    "name": "EduSpark Academy",
    "mobile_number": "+91 9701234567",
    "email": "info@eduspark.ac.in",
    "website": "https://eduspark.ac.in",
    "number_of_employees": 50,
    "gst_number": "33LMNOP9123R3C2",
    "address": "5th Main Road, Anna Nagar, Chennai, Tamil Nadu",
    "industry": "Education",
    "sector": "EdTech",
    "primary_contact": "Dr. Meena Raj"
  },
  {
    "id": 4,
    "name": "GreenLeaf Organics",
    "mobile_number": "+91 9912345678",
    "email": "sales@greenleaf.in",
    "website": "https://greenleaf.in",
    "number_of_employees": 40,
    "gst_number": "09QWER1234T5Z7",
    "address": "NH-24, Sector 62, Noida, Uttar Pradesh",
    "industry": "Agriculture",
    "sector": "Organic Products",
    "primary_contact": "Anil Verma"
  },
  {
    "id": 5,
    "name": "BuildPro Constructions",
    "mobile_number": "+91 9023456781",
    "email": "projects@buildpro.co.in",
    "website": "https://buildpro.co.in",
    "number_of_employees": 200,
    "gst_number": "06ZXCV6789L1P9",
    "address": "Plot 8, DLF Phase 3, Gurugram, Haryana",
    "industry": "Infrastructure",
    "sector": "Construction",
    "primary_contact": "Vikram Singh"
  }
]


export const contacts = [
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@techcorp.com",
    "mobile_number": "+91 9876543210",
    "fax":"+91 9876543211"
  },
  {
    "id": 2,
    "name": "Priya Sharma",
    "email": "priya@brightworks.in",
    "mobile_number": "+91 9123456789",
     "fax":"+91 9876543211"
  },
  {
    "id": 3,
    "name": "Michael Lee",
    "email": "michael@infotechglobal.com",
    "mobile_number": "+1 234 567 8900",
     "fax":"+91 9876543211"
  },
  {
    "id": 4,
    "name": "Sara Khan",
    "email": "sara.k@nextinnovations.com",
    "mobile_number": "+44 7788 221133",
     "fax":"+91 9876543211"
  }
]

export const orders = [
  {
    "order_id": "ORD-1001",
    "customer_id": 1,
    "customer_name": "haran",
    "discount_price": 50,
    "total_price": 500,
    "product_id": "PROD-301",
    "quantity": 2,
    "product_type": "Electronics",
    "final_amount": 450,
    "delivery_info": {
      "requested_date": "2025-10-25",
      "delivery_date": "2025-10-30"
    },
    "shipping_method": "Express",
    "payment_terms": "Net 15",
    "freight_terms": "Prepaid"
  },
  {
    "order_id": "ORD-1002",
    "customer_id": 2,
    "customer_name": "mame",
    "discount_price": 0,
    "total_price": 1200,
    "product_id": "PROD-205",
    "quantity": 5,
    "product_type": "Clothing",
    "final_amount": 1200,
    "delivery_info": {
      "requested_date": "2025-10-26",
      "delivery_date": "2025-11-01"
    },
    "shipping_method": "Standard",
    "payment_terms": "Net 30",
    "freight_terms": "Collect"
  },
  {
    "order_id": "ORD-1003",
    "customer_id": 3,
    "customer_name": "saran",
    "discount_price": 100,
    "total_price": 1500,
    "product_id": "PROD-110",
    "quantity": 3,
    "product_type": "Furniture",
    "final_amount": 1400,
    "delivery_info": {
      "requested_date": "2025-10-27",
      "delivery_date": "2025-11-05"
    },
    "shipping_method": "Freight",
    "payment_terms": "Advance Payment",
    "freight_terms": "Prepaid"
  },
  {
    "order_id": "ORD-1004",
    "customer_id": 4,
    "customer_name": "kiran",
    "discount_price": 75,
    "total_price": 900,
    "product_id": "PROD-505",
    "quantity": 1,
    "product_type": "Appliance",
    "final_amount": 825,
    "delivery_info": {
      "requested_date": "2025-10-29",
      "delivery_date": "2025-11-03"
    },
    "shipping_method": "Courier",
    "payment_terms": "COD",
    "freight_terms": "Collect"
  },
  {
    "order_id": "ORD-1005",
    "customer_id":5,
    "customer_name": "raman",
    "discount_price": 200,
    "total_price": 2200,
    "product_id": "PROD-801",
    "quantity": 4,
    "product_type": "Computer Accessories",
    "final_amount": 2000,
    "delivery_info": {
      "requested_date": "2025-10-28",
      "delivery_date": "2025-11-06"
    },
    "shipping_method": "Air Freight",
    "payment_terms": "Net 10",
    "freight_terms": "Prepaid"
  }
]

