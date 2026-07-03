import { OrderService } from './OrderService';

describe('OrderService', () => {
  let orderService: OrderService;

  beforeEach(() => {
    orderService = new OrderService();
  });

  it('should return all initial orders', () => {
    const orders = orderService.getAllOrders();
    expect(orders).toHaveLength(3);
  });

  it('should return an order by id', () => {
    const order = orderService.getOrderById('1');
    expect(order).toBeDefined();
    expect(order?.customerName).toBe('João Silva');
  });

  it('should return undefined for non-existent order id', () => {
    const order = orderService.getOrderById('999');
    expect(order).toBeUndefined();
  });

  it('should create a new order', () => {
    const newOrderData = {
      customerName: 'Ana Souza',
      items: ['Pizza de Calabresa'],
      total: 45.00
    };

    const createdOrder = orderService.createOrder(newOrderData);

    expect(createdOrder).toHaveProperty('id', '4');
    expect(createdOrder.customerName).toBe('Ana Souza');
    expect(createdOrder.status).toBe('PENDING');
    expect(createdOrder.createdAt).toBeInstanceOf(Date);

    const orders = orderService.getAllOrders();
    expect(orders).toHaveLength(4);
  });
});
