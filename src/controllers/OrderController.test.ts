import { OrderController } from './OrderController';
import { Request, Response } from 'express';

describe('OrderController', () => {
  let orderController: OrderController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    orderController = new OrderController();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return all orders with status 200', () => {
    orderController.getAll(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalled();
    
    const jsonArgs = (mockResponse.json as jest.Mock).mock.calls[0][0];
    expect(jsonArgs).toHaveLength(3);
  });

  it('should return an order by id with status 200', () => {
    mockRequest.params = { id: '2' };
    
    orderController.getById(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    const jsonArgs = (mockResponse.json as jest.Mock).mock.calls[0][0];
    expect(jsonArgs.id).toBe('2');
  });

  it('should return 404 if order not found', () => {
    mockRequest.params = { id: '999' };
    
    orderController.getById(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Order not found' });
  });

  it('should create a new order and return 201', () => {
    mockRequest.body = {
      customerName: 'Carlos',
      items: ['Suco'],
      total: 10
    };
    
    orderController.create(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    const jsonArgs = (mockResponse.json as jest.Mock).mock.calls[0][0];
    expect(jsonArgs.customerName).toBe('Carlos');
    expect(jsonArgs.status).toBe('PENDING');
  });

  it('should return 400 if required fields are missing on create', () => {
    mockRequest.body = {
      customerName: 'Carlos'
    };
    
    orderController.create(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Missing required fields' });
  });
});
