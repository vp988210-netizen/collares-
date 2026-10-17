import { Router, Request, Response } from 'express';

const router = Router();

export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'NOVA / Paws & Craft - API REST de Tienda de Collares Personalizados',
    version: '1.0.0',
    description:
      'API RESTful completa para la gestión de productos, personalizaciones de collares en tiempo real, cesta de compra reactiva, pedidos con flujo de taller, clientes y favoritos.',
    contact: {
      name: 'Soporte Técnico API',
      email: 'soporte@tiendadecollares.com',
    },
  },
  servers: [
    {
      url: '/api',
      description: 'Servidor API Local / Producción',
    },
  ],
  paths: {
    '/products': {
      get: {
        summary: 'Obtener lista de collares con filtros y paginación',
        description: 'Permite filtrar por categoría, material, rango de precios, búsqueda por palabra clave y paginar resultados.',
        parameters: [
          { name: 'category', in: 'query', schema: { type: 'string' }, description: 'Filtrar por categoría (ej: Personalizados, Parejas, Iniciales, Mascotas)' },
          { name: 'material', in: 'query', schema: { type: 'string' }, description: 'Filtrar por material (ej: Oro, Plata, Oro Rosa, Latón)' },
          { name: 'minPrice', in: 'query', schema: { type: 'number' }, description: 'Precio mínimo' },
          { name: 'maxPrice', in: 'query', schema: { type: 'number' }, description: 'Precio máximo' },
          { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Búsqueda por texto en nombre o descripción' },
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 }, description: 'Número de página' },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 12 }, description: 'Límite de resultados por página' },
        ],
        responses: {
          200: {
            description: 'Lista de productos obtenida correctamente',
            content: {
              'application/json': {
                example: {
                  success: true,
                  data: [
                    {
                      id: 1,
                      name: 'Collar con Nombre',
                      description: 'Collar personalizado en plata con tipografía cursiva',
                      price: 89900,
                      material: 'Plata',
                      category: 'Personalizados',
                      image: 'https://...',
                      available: true,
                    },
                  ],
                  pagination: { page: 1, limit: 12, count: 1, total: 8, totalPages: 1 },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Crear un nuevo producto',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                name: 'Collar Luna Creciente',
                description: 'Collar con dije de luna en plata de ley',
                price: 92000,
                material: 'Plata',
                category: 'Personalizados',
                available: true,
              },
            },
          },
        },
        responses: {
          201: { description: 'Producto creado exitosamente' },
          400: { description: 'Datos inválidos o faltantes' },
        },
      },
    },
    '/products/{id}': {
      get: {
        summary: 'Obtener un producto por ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Producto encontrado' },
          404: { description: 'Producto no encontrado' },
        },
      },
      put: {
        summary: 'Actualizar completamente un producto',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Producto actualizado' },
          400: { description: 'Error de validación' },
          404: { description: 'Producto no encontrado' },
        },
      },
      patch: {
        summary: 'Actualizar parcialmente un producto',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Producto actualizado' },
          404: { description: 'Producto no encontrado' },
        },
      },
      delete: {
        summary: 'Eliminar un producto',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Producto eliminado' },
          404: { description: 'Producto no encontrado' },
        },
      },
    },
    '/customizations': {
      post: {
        summary: 'Crear una personalización de collar con cálculo de precio de servidor',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                productId: 1,
                text: 'JULIAN',
                material: 'Oro',
                font: 'Elegante',
                symbol: 'heart',
                chainLength: '45cm',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Personalización creada con precio de servidor',
            content: {
              'application/json': {
                example: {
                  success: true,
                  data: {
                    id: 4,
                    productId: 1,
                    text: 'JULIAN',
                    material: 'Oro',
                    font: 'Elegante',
                    symbol: 'heart',
                    chainLength: '45cm',
                    basePrice: 89900,
                    customizationCost: 40000,
                    finalPrice: 129900,
                  },
                },
              },
            },
          },
          400: { description: 'Texto inválido, material o longitud no permitidos' },
          404: { description: 'El producto asociado no existe' },
        },
      },
    },
    '/customizations/{id}': {
      get: {
        summary: 'Consultar una personalización existente',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Personalización obtenida' },
          404: { description: 'No encontrada' },
        },
      },
      put: {
        summary: 'Modificar una personalización',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Personalización actualizada' },
          400: { description: 'Validación fallida' },
        },
      },
      delete: {
        summary: 'Eliminar una personalización',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Personalización eliminada' },
        },
      },
    },
    '/cart': {
      get: {
        summary: 'Consultar la cesta de compra con cálculo reactivo de subtotal y total',
        responses: {
          200: {
            description: 'Estado actual de la cesta',
            content: {
              'application/json': {
                example: {
                  success: true,
                  data: {
                    items: [],
                    subtotal: 0,
                    itemCount: 0,
                    shipping: 0,
                    total: 0,
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Vaciar completamente la cesta',
        responses: { 200: { description: 'Cesta vaciada' } },
      },
    },
    '/cart/items': {
      post: {
        summary: 'Añadir un producto o collar personalizado a la cesta',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                productId: 1,
                name: 'Collar con Nombre "JULIAN"',
                price: 149900,
                quantity: 1,
                details: 'Oro · Tipografía Elegante · 45cm',
              },
            },
          },
        },
        responses: {
          201: { description: 'Item añadido a la cesta' },
          400: { description: 'Cantidad inválida (< 1) o datos erróneos' },
        },
      },
    },
    '/cart/items/{id}': {
      put: {
        summary: 'Actualizar la cantidad de un ítem en la cesta',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { example: { quantity: 2 } } },
        },
        responses: {
          200: { description: 'Cantidad actualizada' },
          400: { description: 'Cantidad menor a 1' },
          404: { description: 'Ítem no encontrado en la cesta' },
        },
      },
      delete: {
        summary: 'Eliminar un ítem de la cesta',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Ítem eliminado' },
          404: { description: 'Ítem no encontrado' },
        },
      },
    },
    '/orders': {
      get: {
        summary: 'Obtener lista de todos los pedidos registrados',
        responses: { 200: { description: 'Lista de pedidos' } },
      },
      post: {
        summary: 'Registrar un nuevo pedido de taller (checkout)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: {
                customer: {
                  name: 'Julian Calle',
                  email: 'cliente@email.com',
                  phone: '3000000000',
                },
                shippingAddress: {
                  address: 'Calle 10 #20-30',
                  city: 'Medellín',
                  department: 'Antioquia',
                },
                items: [],
                paymentMethod: 'Tarjeta',
              },
            },
          },
        },
        responses: {
          201: { description: 'Pedido creado exitosamente con número de seguimiento' },
          400: { description: 'Datos de cliente o dirección inválidos' },
        },
      },
    },
    '/orders/{id}': {
      get: {
        summary: 'Consultar el detalle de un pedido por ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Pedido encontrado' },
          404: { description: 'Pedido no encontrado' },
        },
      },
    },
    '/orders/{id}/status': {
      patch: {
        summary: 'Actualizar el estado del pedido (pending, confirmed, production, shipped, delivered, cancelled)',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              example: { status: 'production' },
            },
          },
        },
        responses: {
          200: { description: 'Estado actualizado' },
          400: { description: 'Estado inválido' },
          404: { description: 'Pedido no encontrado' },
        },
      },
    },
    '/customers': {
      get: {
        summary: 'Listar clientes registrados',
        responses: { 200: { description: 'Lista de clientes' } },
      },
      post: {
        summary: 'Registrar un nuevo cliente',
        responses: { 201: { description: 'Cliente creado' } },
      },
    },
    '/categories': {
      get: {
        summary: 'Obtener categorías de collares disponibles',
        responses: { 200: { description: 'Lista de categorías' } },
      },
    },
    '/favorites': {
      get: {
        summary: 'Listar collares marcados como favoritos',
        responses: { 200: { description: 'Lista de favoritos' } },
      },
      post: {
        summary: 'Añadir collar a favoritos',
        responses: { 201: { description: 'Añadido a favoritos' } },
      },
    },
    '/favorites/{productId}': {
      delete: {
        summary: 'Eliminar collar de favoritos',
        parameters: [{ name: 'productId', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: { 200: { description: 'Eliminado de favoritos' } },
      },
    },
  },
};

router.get('/docs.json', (_req: Request, res: Response) => {
  res.json(openApiSpec);
});

router.get('/docs', (_req: Request, res: Response) => {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Documentación API REST | Tienda de Collares Personalizados</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #fff8f6;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .topbar {
      background: #8d4b47 !important;
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .topbar h1 {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .topbar a {
      color: #ffdad7;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 9999px;
      background: rgba(255,255,255,0.15);
      transition: all 0.2s;
    }
    .topbar a:hover {
      background: white;
      color: #8d4b47;
    }
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info .title {
      color: #211a17 !important;
      font-weight: 800;
    }
    .swagger-ui .btn.authorize {
      color: #8d4b47;
      border-color: #8d4b47;
    }
    .swagger-ui .opblock.opblock-get .opblock-summary-method { background: #436276; }
    .swagger-ui .opblock.opblock-post .opblock-summary-method { background: #366759; }
    .swagger-ui .opblock.opblock-put .opblock-summary-method { background: #d98a84; }
    .swagger-ui .opblock.opblock-patch .opblock-summary-method { background: #b86963; }
    .swagger-ui .opblock.opblock-delete .opblock-summary-method { background: #ba1a1a; }
  </style>
</head>
<body>
  <div class="topbar">
    <div style="display: flex; align-items: center; gap: 10px;">
      <span style="font-size: 22px;">💎</span>
      <h1>API REST Oficial · Tienda de Collares Personalizados</h1>
    </div>
    <div style="display: flex; gap: 8px;">
      <a href="/">← Volver a la Tienda</a>
      <a href="/api/docs.json" target="_blank">Ver JSON OpenAPI</a>
    </div>
  </div>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        url: '/api/docs.json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
        layout: "BaseLayout"
      });
    };
  </script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

export default router;
