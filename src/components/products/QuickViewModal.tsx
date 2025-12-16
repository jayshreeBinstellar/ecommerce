import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Minus, Plus, Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addToCart(product, quantity, selectedSize, selectedColor);
      onClose();
    }
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-square bg-secondary">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                NEW
              </span>
            )}
            {product.isSale && discount > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded-full">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                {product.subcategory}
              </p>
              <h2 className="text-2xl font-heading font-bold mb-2">{product.name}</h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-gold text-gold'
                          : 'text-border'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Color: {selectedColor || 'Select'}</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 text-sm border rounded-lg transition-all duration-200 hover:scale-105 ${
                        selectedColor === color
                          ? 'bg-foreground text-background border-foreground'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Size: {selectedSize || 'Select'}</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 text-sm border rounded-lg transition-all duration-200 hover:scale-105 ${
                        selectedSize === size
                          ? 'bg-foreground text-background border-foreground'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">Quantity</p>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={handleWishlistToggle}
                className={`h-12 w-12 transition-all duration-300 ${
                  inWishlist ? 'text-destructive border-destructive' : ''
                }`}
              >
                <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current' : ''}`} />
              </Button>
              <Button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
                className="flex-1 h-12 gap-2"
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>
            </div>

            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="text-center text-sm text-primary hover:underline mt-4"
            >
              View Full Details
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
