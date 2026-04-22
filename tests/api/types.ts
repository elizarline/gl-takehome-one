export interface Pet {
  id?: number;
  name: string;
  status?: 'available' | 'pending' | 'sold';
  photoUrls: string[];
  category?: { id: number; name: string };
  tags?: { id: number; name: string }[];
}

export interface Order {
  id?: number;
  petId: number;
  quantity: number;
  shipDate?: string;
  status?: 'placed' | 'approved' | 'delivered';
  complete?: boolean;
}

export interface User {
  id?: number;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  userStatus?: number;
}

export interface ApiResponse {
  code: number;
  type: string;
  message: string;
}