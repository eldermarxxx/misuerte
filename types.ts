export interface Raffle {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  pricePerNumber: number;
  totalNumbers: number;
  soldNumbers: number;
  endDate: string;
  status: 'active' | 'completed' | 'coming_soon';
}

export interface CartItem {
  raffleId: string;
  raffleTitle: string;
  numbers: number[];
  price: number;
}

export interface UserTicket {
  id: string;
  raffleId: string;
  raffleTitle: string;
  numbers: number[];
  purchaseDate: string;
  status: 'pending' | 'confirmed';
  userName: string;
  userPhone: string;
}

export interface PromoPack {
  quantity: number;
  discount: number; // Percentage off, e.g., 0.10 for 10%
  label: string;
}

export type Language = 'pt' | 'es' | 'en';