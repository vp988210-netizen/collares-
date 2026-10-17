import { store } from '../models/store';
import { Customer } from '../models/types';
import { isValidEmail, isValidPhone } from '../utils/validation';

export const getAllCustomers = (): Customer[] => {
  return store.customers;
};

export const getCustomerById = (id: number): Customer | undefined => {
  return store.customers.find((c) => c.id === id);
};

export const createCustomer = (data: Partial<Customer>): Customer => {
  if (!data.name || !data.name.trim()) {
    throw new Error('El nombre del cliente es obligatorio');
  }

  if (!data.email || !isValidEmail(data.email)) {
    throw new Error('Debe proporcionar un correo electrónico válido');
  }

  if (!data.phone || !isValidPhone(data.phone)) {
    throw new Error('El teléfono proporcionado no es válido');
  }

  if (!data.address || !data.address.trim()) {
    throw new Error('La dirección es obligatoria');
  }

  const existing = store.customers.find(
    (c) => c.email.toLowerCase() === data.email!.trim().toLowerCase()
  );
  if (existing) {
    const error: any = new Error(`Ya existe un cliente registrado con el correo "${data.email}"`);
    error.statusCode = 409;
    throw error;
  }

  const newCustomer: Customer = {
    id: store.getNextCustomerId(),
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    address: data.address.trim(),
    city: data.city?.trim() || 'Medellín',
    department: data.department?.trim() || 'Antioquia',
    createdAt: new Date().toISOString(),
  };

  store.customers.push(newCustomer);
  return newCustomer;
};

export const updateCustomer = (id: number, data: Partial<Customer>): Customer => {
  const index = store.customers.findIndex((c) => c.id === id);
  if (index === -1) {
    const error: any = new Error(`El cliente con ID ${id} no existe`);
    error.statusCode = 404;
    throw error;
  }

  if (data.email && !isValidEmail(data.email)) {
    throw new Error('El correo electrónico no es válido');
  }
  if (data.phone && !isValidPhone(data.phone)) {
    throw new Error('El teléfono no es válido');
  }

  const current = store.customers[index];
  const updated: Customer = {
    ...current,
    ...(data.name && { name: data.name.trim() }),
    ...(data.email && { email: data.email.trim() }),
    ...(data.phone && { phone: data.phone.trim() }),
    ...(data.address && { address: data.address.trim() }),
    ...(data.city && { city: data.city.trim() }),
    ...(data.department && { department: data.department.trim() }),
  };

  store.customers[index] = updated;
  return updated;
};

export const deleteCustomer = (id: number): boolean => {
  const index = store.customers.findIndex((c) => c.id === id);
  if (index === -1) {
    const error: any = new Error(`El cliente con ID ${id} no existe`);
    error.statusCode = 404;
    throw error;
  }
  store.customers.splice(index, 1);
  return true;
};
