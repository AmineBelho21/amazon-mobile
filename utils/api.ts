const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface Article {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  glbUrl: null | string;
  createdAt: string;
}

interface Order {
  id: number;
  userId: number;
  createdAt: string;
  items: Item[];
}

interface Item {
  id: number;
  orderId: number;
  articleId: number;
  quantity: number;
  createdAt: string;
  article: Article;
}

export const getArticles = async (): Promise<Article[]> => {
  const response = await fetch(`${API_URL}/articles`);
  return response.json();
};

export const getArticleById = async (id: number): Promise<Article> => {
  const response = await fetch(`${API_URL}/articles/${id}`);
  return response.json();
};

export const createOrder = async (items: (Article & { quantity: number })[], token: string) => {
  console.log('📤 API: Creating order...');
  console.log('API URL:', `${API_URL}/orders`);
  console.log('Items:', items.map((item) => ({ articleId: item.id, quantity: item.quantity })));
  console.log('Token (first 20 chars):', token.substring(0, 20) + '...');
  
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify({
      items: items.map((item) => ({ articleId: item.id, quantity: item.quantity })),
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  
  console.log('📥 API: Order response status:', response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ API: Order creation failed:', errorText);
    throw new Error(`Failed to create order: ${response.status} - ${errorText}`);
  }
  
  const data = await response.json();
  console.log('✅ API: Order created:', data);
  return data;
};

export const createPaymentIntent = async (amount: number, email: string) => {
  console.log('📤 API: Creating payment intent...');
  console.log('API URL:', `${API_URL}/orders/payment-sheet`);
  console.log('Amount:', amount);
  console.log('Email:', email);
  
  const response = await fetch(`${API_URL}/orders/payment-sheet`, {
    method: 'POST',
    body: JSON.stringify({ amount, currency: 'usd', email }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  console.log('📥 API: Payment intent response status:', response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ API: Payment intent creation failed:', errorText);
    throw new Error(`Failed to create payment intent: ${response.status} - ${errorText}`);
  }
  
  const data = await response.json();
  console.log('✅ API: Payment intent created');
  return data;
};

export const getOrders = async (token: string): Promise<Order[]> => {
  console.log('📤 API: Fetching orders...');
  console.log('Token (first 20 chars):', token.substring(0, 20) + '...');
  
  const response = await fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  console.log('📥 API: Orders response status:', response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ API: Failed to fetch orders:', errorText);
    throw new Error(`Failed to fetch orders: ${response.status} - ${errorText}`);
  }
  
  const data = await response.json();
  console.log('✅ API: Orders fetched:', data.length, 'orders');
  return data;
};