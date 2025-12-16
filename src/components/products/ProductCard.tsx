import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const inWishlist = isInWishlist(product.id);
  
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  return (
    <>
      <div className="product-card animate-fade-in group">
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="product-image transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Badges */}
            {product.isNew && <span className="badge-new">NEW</span>}
            {product.isSale && !product.isNew && (
              <span className="badge-sale">{discount}% OFF</span>
            )}

            {/* Quick Actions */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
              <Button
                variant="secondary"
                size="icon"
                onClick={handleWishlistToggle}
                className={`bg-background/90 backdrop-blur-sm hover:bg-background shadow-md transition-all duration-300 hover:scale-110 ${
                  inWishlist ? 'text-destructive' : ''
                }`}
              >
                <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={handleQuickView}
                className="bg-background/90 backdrop-blur-sm hover:bg-background shadow-md transition-all duration-300 hover:scale-110"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick View Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-foreground/90 backdrop-blur-sm text-background text-center py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button onClick={handleQuickView} className="text-sm font-medium hover:underline">
                Quick View
              </button>
            </div>
          </div>
        </Link>

        <div className="p-4">
          <Link to={`/product/${product.id}`}>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              {product.subcategory}
            </p>
            <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center gap-1 mt-2">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mt-2">
              <span className="font-semibold text-foreground">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Sizes Preview */}
            <div className="flex gap-1 mt-3">
              {product.sizes.slice(0, 4).map((size) => (
                <span
                  key={size}
                  className="text-xs px-2 py-1 border border-border rounded text-muted-foreground"
                >
                  {size}
                </span>
              ))}
              {product.sizes.length > 4 && (
                <span className="text-xs px-2 py-1 text-muted-foreground">
                  +{product.sizes.length - 4}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      <QuickViewModal
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
