import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';

const orderService = new OrderService();

export class OrderController {
  public getAll(req: Request, res: Response): void {
    const orders = orderService.getAllOrders();
    res.status(200).json(orders);
  }

  public getById(req: Request, res: Response): void {
    const { id } = req.params;
    const order = orderService.getOrderById(id);

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.status(200).json(order);
  }

  public create(req: Request, res: Response): void {
    try {
      const { customerName, items, total } = req.body;

      if (!customerName || !items || !total) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }

      const newOrder = orderService.createOrder({ customerName, items, total });
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  }

  public getByCustomerName(req: Request, res: Response): void {
    const { customerName } = req.params;
    const order = orderService.getOrderByCustomerName(customerName);

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    res.status(200).json(order);
  }
}
