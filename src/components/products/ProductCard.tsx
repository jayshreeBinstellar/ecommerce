import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card animate-fade-in">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="product-image"
          />
          
          {/* Badges */}
          {product.isNew && <span className="badge-new">NEW</span>}
          {product.isSale && !product.isNew && (
            <span className="badge-sale">{discount}% OFF</span>
          )}

          {/* Quick Actions */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="flex-1 bg-background/90 backdrop-blur-sm hover:bg-background"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                className="flex-1 bg-foreground text-background hover:bg-foreground/90"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Quick Add
              </Button>
            </div>
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
  );
};

export default ProductCard;
