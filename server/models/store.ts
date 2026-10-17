import {
  Product,
  Category,
  Customization,
  Cart,
  Order,
  Customer,
  Favorite,
} from './types';

class DataStore {
  public products: Product[] = [];
  public categories: Category[] = [];
  public customizations: Customization[] = [];
  public cart: Cart = {
    items: [],
    subtotal: 0,
    itemCount: 0,
    shipping: 0,
    total: 0,
  };
  public orders: Order[] = [];
  public customers: Customer[] = [];
  public favorites: Favorite[] = [];

  private nextProductId = 1;
  private nextCategoryId = 1;
  private nextCustomizationId = 1;
  private nextOrderId = 1001;
  private nextCustomerId = 1;

  constructor() {
    this.seed();
  }

  private seed() {
    // 1. Seed Categories (at least 5 as requested)
    this.categories = [
      {
        id: this.nextCategoryId++,
        name: 'Personalizados',
        slug: 'personalizados',
        description: 'Collares con nombres grabados, palabras y mensajes únicos.',
      },
      {
        id: this.nextCategoryId++,
        name: 'Iniciales',
        slug: 'iniciales',
        description: 'Collares y medallas con iniciales delicadas en oro y plata.',
      },
      {
        id: this.nextCategoryId++,
        name: 'Parejas',
        slug: 'parejas',
        description: 'Diseños que se complementan para parejas y almas gemelas.',
      },
      {
        id: this.nextCategoryId++,
        name: 'Familia',
        slug: 'familia',
        description: 'Joyas para mamá, hijos y seres queridos que llevamos cerca.',
      },
      {
        id: this.nextCategoryId++,
        name: 'Fechas',
        slug: 'fechas',
        description: 'Inmortaliza un aniversario o fecha que lo cambió todo.',
      },
      {
        id: this.nextCategoryId++,
        name: 'Zodiacales',
        slug: 'zodiacales',
        description: 'Constelaciones y signos astrológicos en plata y latón macizo.',
      },
      {
        id: this.nextCategoryId++,
        name: 'Regalos',
        slug: 'regalos',
        description: 'Ediciones especiales presentadas en estuche de atelier.',
      },
      {
        id: this.nextCategoryId++,
        name: 'Mascotas',
        slug: 'mascotas',
        description: 'Collares de cuero curtido vegetal con grabado láser y chapa QR.',
      },
    ];

    // 2. Seed Products (at least 8 products as requested, covering personalized necklaces + artisan atelier)
    this.products = [
      {
        id: this.nextProductId++,
        name: 'Collar con Nombre',
        description: 'Collar personalizado en tipografía cursiva fina, cortado con láser de precisión y pulido a mano.',
        price: 89900,
        material: 'Plata',
        category: 'Personalizados',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXvmRAPwpE3u1Rq120SuFp4gL15DKBHuTqTWpsMp4Jrw_3sD2kqm6sgcf1u_Px0QviyTT9gtOeBuWSmBfL1EJdAwsonHkyaf90fcrMpMstsZC6pyYv7LbAMqXDqXck3aRUZAUEg-6jTwkFqrp7t7aZlAJ1CAZv02lsnS2sWt1y3-K-sQxte4nH6K7QP-9u0w2eagAAIbyOkauEvziFaPlI80_mWPWT2qYZByRHmZul',
        available: true,
        speciesCategory: 'both',
        rating: 4.95,
        reviewCount: 312,
        badge1: 'Más Vendido',
        badge2: 'Garantía 5 Años',
        width: 'Cadena 1.5mm / Colgante 25mm',
        colors: ['#e6e6e6', '#ffd0c2', '#fff1c7'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: this.nextProductId++,
        name: 'Collar Inicial',
        description: 'Medalla circular con inicial en bajo relieve, acabado satinado y cadena delicada ajustable.',
        price: 79900,
        material: 'Oro',
        category: 'Iniciales',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvHIyfkM23K2JEgd8xfrwOu-WLVOI4n_zWfD5pxvMJWvSOC-IecsDO5OpV0TZm3zVOFZQkr3W6yEcub7umHkgaHherTxGoj8LNuES3ZmQ_W1lwqcnnNB4lhhuWFz3iDk4Ct-bkpIOE-n6HRjIJDZTj2HrnANGBVTbG1zTH_U5QYFn0UIta9uZ2RYEkHRPAXx43Nh75860u7gpEW5xteQHCLtROjVJtoqj62t56WEo4',
        available: true,
        speciesCategory: 'both',
        rating: 4.98,
        reviewCount: 184,
        badge1: 'Edición Atelier',
        badge2: 'Personalizable',
        width: 'Dije 14mm',
        colors: ['#fff1c7', '#ffd0c2', '#e6e6e6'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: this.nextProductId++,
        name: 'Collar Corazón',
        description: 'Dije de corazón minimalista con grabado interior secreto de inicial o micro fecha.',
        price: 84900,
        material: 'Oro Rosa',
        category: 'Personalizados',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABF30h9u6d1_Xp6o4uJz2q6-N7n8n1YdF0K8eK0oF_3k1l3k_8u8o8l1k3l_1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0',
        available: true,
        speciesCategory: 'both',
        rating: 4.92,
        reviewCount: 145,
        badge1: 'Favorito Parejas',
        colors: ['#ffd0c2', '#fff1c7', '#e6e6e6'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: this.nextProductId++,
        name: 'Collar Pareja',
        description: 'Set dúo de collares magnéticos o entrelazados con coordenadas o iniciales de ambos.',
        price: 119900,
        material: 'Plata',
        category: 'Parejas',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFm2_9q48yQ0oF_3k1l3k_8u8o8l1k3l_1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0',
        available: true,
        speciesCategory: 'both',
        rating: 4.96,
        reviewCount: 220,
        badge1: 'Pack Dúo',
        badge2: 'Envío Gratis',
        colors: ['#e6e6e6', '#2b2b2b'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: this.nextProductId++,
        name: 'Collar Mamá',
        description: 'Colgante grabado con silueta o nombres de los hijos, con detalles en piedras naturales o estrellas.',
        price: 94900,
        material: 'Oro',
        category: 'Familia',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV3e0q0oF_3k1l3k_8u8o8l1k3l_1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0',
        available: true,
        speciesCategory: 'both',
        rating: 4.99,
        reviewCount: 290,
        badge1: 'Especial Mamá',
        colors: ['#fff1c7', '#ffd0c2', '#e6e6e6'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: this.nextProductId++,
        name: 'Collar Familia',
        description: 'Placa de múltiples aros o barras grabadas individualmente con cada miembro de la familia.',
        price: 104900,
        material: 'Plata',
        category: 'Familia',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuER4f1q0oF_3k1l3k_8u8o8l1k3l_1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0',
        available: true,
        speciesCategory: 'both',
        rating: 4.89,
        reviewCount: 95,
        badge1: 'Hasta 4 Nombres',
        colors: ['#e6e6e6', '#fff1c7'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: this.nextProductId++,
        name: 'Collar Zodiacal',
        description: 'Moneda astronómica con constelación grabada y diamante de laboratorio incrustado.',
        price: 89900,
        material: 'Oro',
        category: 'Zodiacales',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuFZ5g2q0oF_3k1l3k_8u8o8l1k3l_1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0',
        available: true,
        speciesCategory: 'both',
        rating: 4.93,
        reviewCount: 168,
        badge1: '12 Constelaciones',
        colors: ['#fff1c7', '#e6e6e6', '#ffd0c2'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: this.nextProductId++,
        name: 'Collar con Fecha',
        description: 'Barra horizontal o vertical pulida con fechado en números romanos o tradicional.',
        price: 79900,
        material: 'Plata',
        category: 'Fechas',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuG01h3q0oF_3k1l3k_8u8o8l1k3l_1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0',
        available: true,
        speciesCategory: 'both',
        rating: 4.91,
        reviewCount: 110,
        badge1: 'Números Romanos',
        colors: ['#e6e6e6', '#ffd0c2', '#fff1c7'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // Artisan Pet Collar Models (for seamless compatibility with the Stitch workshop)
      {
        id: this.nextProductId++,
        name: 'Collar Siena Artisan',
        description: 'Cuero curtido vegetal español 3.5mm con ceras naturales, remaches macizos y grabado láser.',
        price: 89900,
        material: 'Latón Dorado',
        category: 'Mascotas',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXvmRAPwpE3u1Rq120SuFp4gL15DKBHuTqTWpsMp4Jrw_3sD2kqm6sgcf1u_Px0QviyTT9gtOeBuWSmBfL1EJdAwsonHkyaf90fcrMpMstsZC6pyYv7LbAMqXDqXck3aRUZAUEg-6jTwkFqrp7t7aZlAJ1CAZv02lsnS2sWt1y3-K-sQxte4nH6K7QP-9u0w2eagAAIbyOkauEvziFaPlI80_mWPWT2qYZByRHmZul',
        available: true,
        speciesCategory: 'perro',
        rating: 4.95,
        reviewCount: 312,
        badge1: 'Más Vendido Mascota',
        badge2: 'Garantía 5 Años',
        width: '25 mm (M-XL) · 18 mm (XS-S)',
        colors: ['#732b17', '#579b8a', '#b86963', '#2b2b2b'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: this.nextProductId++,
        name: 'Collar Pétalo Silvestre',
        description: 'Piel flor teñida al anilina en tono rosa pétalo suave con herrajes oro rosa satinado.',
        price: 94900,
        material: 'Oro Rosa',
        category: 'Mascotas',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvHIyfkM23K2JEgd8xfrwOu-WLVOI4n_zWfD5pxvMJWvSOC-IecsDO5OpV0TZm3zVOFZQkr3W6yEcub7umHkgaHherTxGoj8LNuES3ZmQ_W1lwqcnnNB4lhhuWFz3iDk4Ct-bkpIOE-n6HRjIJDZTj2HrnANGBVTbG1zTH_U5QYFn0UIta9uZ2RYEkHRPAXx43Nh75860u7gpEW5xteQHCLtROjVJtoqj62t56WEo4',
        available: true,
        speciesCategory: 'both',
        rating: 4.98,
        reviewCount: 184,
        badge1: 'Edición Pastel',
        width: '20 mm · Cantos con cera de abeja',
        colors: ['#d98a84', '#ffd0c2', '#b8a6be'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: this.nextProductId++,
        name: 'Collar Felino Seda & Breakaway',
        description: 'Cuero napa ultraligero 1.2mm con hebilla elástica de liberación rápida y cascabel removible.',
        price: 74900,
        material: 'Plata Vintage',
        category: 'Mascotas',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFm2_9q48yQ0oF_3k1l3k_8u8o8l1k3l_1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0l1k2l3k4l5k6l7k8l9k0',
        available: true,
        speciesCategory: 'gato',
        rating: 4.96,
        reviewCount: 240,
        badge1: 'Seguridad Felina',
        width: '12 mm · Antiahorque',
        colors: ['#86c6b4', '#b8a6be', '#d98a84'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    // 3. Seed Customizations (at least 3 as requested)
    this.customizations = [
      {
        id: this.nextCustomizationId++,
        productId: 1,
        text: 'JULIAN',
        material: 'Oro',
        font: 'Elegante',
        symbol: 'heart',
        chainLength: '45cm',
        basePrice: 89900,
        customizationCost: 60000,
        finalPrice: 149900,
        createdAt: new Date().toISOString(),
      },
      {
        id: this.nextCustomizationId++,
        productId: 2,
        text: 'VALENTINA',
        material: 'Plata',
        font: 'Moderna',
        symbol: 'star',
        chainLength: '50cm',
        basePrice: 79900,
        customizationCost: 20000,
        finalPrice: 99900,
        createdAt: new Date().toISOString(),
      },
      {
        id: this.nextCustomizationId++,
        productId: 9,
        text: 'TOBY',
        petPhone: '+34 612 345 678',
        material: 'Latón Dorado',
        font: 'Clásica',
        symbol: 'bone',
        chainLength: '45cm',
        reflective: true,
        airtag: false,
        basePrice: 89900,
        customizationCost: 25000,
        finalPrice: 114900,
        createdAt: new Date().toISOString(),
      },
    ];

    // 4. Seed Customers
    this.customers = [
      {
        id: this.nextCustomerId++,
        name: 'Julian Calle',
        email: 'julian.calle@email.com',
        phone: '3001234567',
        address: 'Calle 10 #20-30',
        city: 'Medellín',
        department: 'Antioquia',
        createdAt: new Date().toISOString(),
      },
      {
        id: this.nextCustomerId++,
        name: 'Clara Morales',
        email: 'clara.morales@email.com',
        phone: '612345678',
        address: 'Calle Velázquez 42',
        city: 'Madrid',
        department: 'Madrid',
        createdAt: new Date().toISOString(),
      },
    ];

    // 5. Seed Orders (at least 2 as requested)
    this.orders = [
      {
        id: this.nextOrderId++,
        customer: {
          name: 'Julian Calle',
          email: 'julian.calle@email.com',
          phone: '3000000000',
        },
        shippingAddress: {
          address: 'Calle 10 #20-30',
          city: 'Medellín',
          department: 'Antioquia',
          postalCode: '050021',
        },
        items: [
          {
            id: 'item-101',
            productId: 1,
            name: 'Collar con Nombre "JULIAN"',
            price: 149900,
            quantity: 1,
            details: 'Oro 18k · Tipografía Elegante · Símbolo Corazón · 45cm',
            customization: {
              productId: 1,
              text: 'JULIAN',
              material: 'Oro',
              font: 'Elegante',
              symbol: 'heart',
              chainLength: '45cm',
              finalPrice: 149900,
            },
          },
        ],
        subtotal: 149900,
        shipping: 10000,
        total: 159900,
        status: 'confirmed',
        paymentMethod: 'Tarjeta',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: this.nextOrderId++,
        customer: {
          name: 'Clara Morales',
          email: 'clara.morales@email.com',
          phone: '612345678',
        },
        shippingAddress: {
          address: 'Calle Velázquez 42, 3º Dcha',
          city: 'Madrid',
          department: 'Madrid',
          postalCode: '28001',
        },
        items: [
          {
            id: 'item-102',
            productId: 9,
            name: 'Collar Siena Artisan "TOBY"',
            price: 114900,
            quantity: 1,
            details: 'Cuero Coñac · Latón Macizo · Grabado Láser +34 612 345 678',
          },
        ],
        subtotal: 114900,
        shipping: 0,
        total: 114900,
        status: 'production',
        paymentMethod: 'PSE',
        createdAt: new Date(Date.now() - 43200000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    // 6. Seed Initial Cart
    this.cart = {
      items: [
        {
          id: 'cart-seed-1',
          productId: 1,
          name: 'Collar con Nombre "JULIAN"',
          price: 149900,
          quantity: 1,
          details: 'Oro · Tipografía Elegante · 45cm',
          image: this.products[0].image,
        },
      ],
      subtotal: 149900,
      itemCount: 1,
      shipping: 10000,
      total: 159900,
    };

    // 7. Seed Favorites
    this.favorites = [
      { productId: 1, addedAt: new Date().toISOString() },
      { productId: 2, addedAt: new Date().toISOString() },
    ];
  }

  public getNextProductId(): number {
    return this.nextProductId++;
  }

  public getNextCategoryId(): number {
    return this.nextCategoryId++;
  }

  public getNextCustomizationId(): number {
    return this.nextCustomizationId++;
  }

  public getNextOrderId(): number {
    return this.nextOrderId++;
  }

  public getNextCustomerId(): number {
    return this.nextCustomerId++;
  }

  public recalculateCart(): void {
    const subtotal = this.cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const itemCount = this.cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const shipping = subtotal > 140000 || subtotal === 0 ? 0 : 10000;
    const total = subtotal + shipping;

    this.cart.subtotal = subtotal;
    this.cart.itemCount = itemCount;
    this.cart.shipping = shipping;
    this.cart.total = total;
  }
}

export const store = new DataStore();
