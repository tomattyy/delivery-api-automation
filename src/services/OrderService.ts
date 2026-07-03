import { Order } from '../models/Order';

export class OrderService {
  private orders: Order[] = [
    {
      id: '1',
      customerName: 'João Silva',
      items: ['Pizza Margherita', 'Coca-Cola 2L'],
      total: 55.90,
      status: 'DELIVERED',
      createdAt: new Date('2024-05-10T19:30:00Z')
    },
    {
      id: '2',
      customerName: 'Maria Santos',
      items: ['Hamburguer Artesanal', 'Batata Frita'],
      total: 35.50,
      status: 'ON_THE_WAY',
      createdAt: new Date()
    },
    {
      id: '3',
      customerName: 'José Oliveira',
      items: ['Sushi Combo 30 peças'],
      total: 89.90,
      status: 'PREPARING',
      createdAt: new Date()
    }
  ];

  public getAllOrders(): Order[] {
    return this.orders;
  }

  public getOrderById(id: string): Order | undefined {
    return this.orders.find(order => order.id === id);
  }

  public getOrderByCustomerName(customerName: string): Order | undefined {
    return this.orders.find(order => order.customerName === customerName);
  }

  public createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order {
    const newOrder: Order = {
      ...orderData,
      id: (this.orders.length + 1).toString(),
      status: 'PENDING',
      createdAt: new Date()
    };
    this.orders.push(newOrder);
    return newOrder;
  }
}
