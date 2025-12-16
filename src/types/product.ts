export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'men' | 'women' | 'kids';
  subcategory: string;
  sizes: string[];
  colors: string[];
  images: string[];
  description: string;
  isNew?: boolean;
  isSale?: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface FilterOptions {
  category: string | null;
  priceRange: [number, number];
  sizes: string[];
  sortBy: 'newest' | 'price-low' | 'price-high' | 'popular';
}
