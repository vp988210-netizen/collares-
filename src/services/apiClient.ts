export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  pagination?: {
    page: number;
    limit: number;
    count: number;
    total: number;
    totalPages: number;
  };
}

const API_BASE = '/api';

async function request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data: ApiResponse<T> = await response.json();

  if (!response.ok || !data.success) {
    const errorMsg = data.message || `Error en la solicitud HTTP (${response.status})`;
    throw new Error(errorMsg);
  }

  return data.data as T;
}

export const api = {
  // Products
  getProducts: async (filters: {
    category?: string;
    material?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    page?: number;
    limit?: number;
  } = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.material) params.set('material', filters.material);
    if (filters.minPrice !== undefined) params.set('minPrice', String(filters.minPrice));
    if (filters.maxPrice !== undefined) params.set('maxPrice', String(filters.maxPrice));
    if (filters.search) params.set('search', filters.search);
    if (filters.page) params.set('page', String(filters.page));
    if (filters.limit) params.set('limit', String(filters.limit));

    const qs = params.toString() ? `?${params.toString()}` : '';
    const response = await fetch(`${API_BASE}/products${qs}`);
    const data = await response.json();
    return data;
  },

  getProductById: (id: number | string) => request(`/products/${id}`),

  createProduct: (productData: any) =>
    request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    }),

  updateProduct: (id: number | string, productData: any) =>
    request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    }),

  patchProduct: (id: number | string, patchData: any) =>
    request(`/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(patchData),
    }),

  deleteProduct: (id: number | string) =>
    request(`/products/${id}`, {
      method: 'DELETE',
    }),

  // Categories
  getCategories: () => request('/categories'),
  getCategoryById: (id: number | string) => request(`/categories/${id}`),

  // Customizations
  createCustomization: (customizationData: {
    productId: number;
    text: string;
    material: string;
    font?: string;
    symbol?: string;
    chainLength?: string;
    petPhone?: string;
    reflective?: boolean;
    airtag?: boolean;
  }) =>
    request('/customizations', {
      method: 'POST',
      body: JSON.stringify(customizationData),
    }),

  getCustomizationById: (id: number | string) => request(`/customizations/${id}`),

  updateCustomization: (id: number | string, data: any) =>
    request(`/customizations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteCustomization: (id: number | string) =>
    request(`/customizations/${id}`, {
      method: 'DELETE',
    }),

  // Cart
  getCart: () => request('/cart'),

  addCartItem: (item: {
    productId?: number;
    name: string;
    price?: number;
    quantity?: number;
    details?: string;
    image?: string;
    customization?: any;
  }) =>
    request('/cart/items', {
      method: 'POST',
      body: JSON.stringify(item),
    }),

  updateCartItem: (id: string, quantity: number) =>
    request(`/cart/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }),

  removeCartItem: (id: string) =>
    request(`/cart/items/${id}`, {
      method: 'DELETE',
    }),

  clearCart: () =>
    request('/cart', {
      method: 'DELETE',
    }),

  // Orders
  getOrders: () => request('/orders'),
  getOrderById: (id: number | string) => request(`/orders/${id}`),

  createOrder: (orderData: {
    customer: { name: string; email: string; phone: string };
    shippingAddress: { address: string; city: string; department: string; postalCode?: string };
    items?: any[];
    paymentMethod?: string;
  }) =>
    request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  updateOrderStatus: (id: number | string, status: string) =>
    request(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  // Customers
  getCustomers: () => request('/customers'),
  createCustomer: (customerData: any) =>
    request('/customers', {
      method: 'POST',
      body: JSON.stringify(customerData),
    }),

  // Favorites
  getFavorites: () => request('/favorites'),
  addFavorite: (productId: number) =>
    request('/favorites', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    }),
  removeFavorite: (productId: number) =>
    request(`/favorites/${productId}`, {
      method: 'DELETE',
    }),
};
