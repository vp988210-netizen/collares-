import { store } from '../models/store';
import { Order, OrderCustomer, OrderStatus, ShippingAddress } from '../models/types';
import { ALLOWED_ORDER_STATUSES, isValidEmail, isValidPhone } from '../utils/validation';

export interface CreateOrderDto {
  customer: OrderCustomer;
  shippingAddress: ShippingAddress;
  items?: any[];
  paymentMethod?: string;
  notes?: string;
}

export const getAllOrders = (): Order[] => {
  return [...store.orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const getOrderById = (id: number): Order | undefined => {
  return store.orders.find((o) => o.id === id);
};

export const createOrder = (data: CreateOrderDto): Order => {
  if (!data.customer) {
    throw new Error('La información del cliente es obligatoria');
  }

  if (!data.customer.name || !data.customer.name.trim()) {
    throw new Error('El nombre completo del cliente es obligatorio');
  }

  if (!isValidEmail(data.customer.email)) {
    throw new Error('El correo electrónico ingresado no tiene un formato válido');
  }

  if (!isValidPhone(data.customer.phone)) {
    throw new Error('El número telefónico debe contener entre 7 y 15 dígitos válidos');
  }

  if (!data.shippingAddress) {
    throw new Error('La dirección de envío es obligatoria');
  }

  if (
    !data.shippingAddress.address?.trim() ||
    !data.shippingAddress.city?.trim() ||
    !data.shippingAddress.department?.trim()
  ) {
    throw new Error('Dirección, ciudad y departamento son campos obligatorios para el envío');
  }

  // Use items provided in payload, or fallback to current cart items
  const items = (data.items && data.items.length > 0) ? data.items : [...store.cart.items];

  if (!items || items.length === 0) {
    throw new Error('No se puede crear un pedido sin productos en la cesta');
  }

  // Calculate subtotal from verified items
  const subtotal = items.reduce((sum, item) => {
    const p = Number(item.price) || 0;
    const q = Number(item.quantity) || 1;
    return sum + p * q;
  }, 0);

  const shipping = subtotal > 140000 ? 0 : 10000;
  const total = subtotal + shipping;

  const newOrder: Order = {
    id: store.getNextOrderId(),
    customer: {
      name: data.customer.name.trim(),
      email: data.customer.email.trim(),
      phone: data.customer.phone.trim(),
    },
    shippingAddress: {
      address: data.shippingAddress.address.trim(),
      city: data.shippingAddress.city.trim(),
      department: data.shippingAddress.department.trim(),
      postalCode: data.shippingAddress.postalCode?.trim() || '00000',
      notes: data.shippingAddress.notes?.trim(),
    },
    items,
    subtotal,
    shipping,
    total,
    status: 'pending',
    paymentMethod: data.paymentMethod || 'Tarjeta',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.orders.unshift(newOrder);

  // If order was created from current cart, reset cart
  if (!data.items || data.items.length === 0 || JSON.stringify(data.items) === JSON.stringify(store.cart.items)) {
    store.cart.items = [];
    store.recalculateCart();
  }

  return newOrder;
};

export const updateOrderStatus = (id: number, status: OrderStatus): Order => {
  if (!status || !ALLOWED_ORDER_STATUSES.includes(status)) {
    throw new Error(
      `El estado "${status}" no es válido. Estados permitidos: ${ALLOWED_ORDER_STATUSES.join(', ')}`
    );
  }

  const order = store.orders.find((o) => o.id === id);
  if (!order) {
    const error: any = new Error(`El pedido con ID #${id} no existe`);
    error.statusCode = 404;
    throw error;
  }

  order.status = status;
  order.updatedAt = new Date().toISOString();
  return order;
};
