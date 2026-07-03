export interface Order {
  id: string;
  customerName: string;
  items: string[];
  total: number;
  status: 'PENDING' | 'PREPARING' | 'ON_THE_WAY' | 'DELIVERED';
  createdAt: Date;
}
