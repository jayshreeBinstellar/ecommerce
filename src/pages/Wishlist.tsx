import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product, 1, product.sizes[0], product.colors[0]);
    removeFromWishlist(product.id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-heading font-bold">My Wishlist</h1>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <Heart className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <h2 className="text-2xl font-heading font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">
                Save items you love by clicking the heart icon on products.
              </p>
              <Link to="/products">
                <Button className="gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistItems.map((product, index) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-4 bg-card rounded-xl border border-border animate-fade-in hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link to={`/product/${product.id}`} className="flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${product.id}`}>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {product.subcategory}
                      </p>
                      <h3 className="font-medium text-lg hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-semibold">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.sizes.slice(0, 5).map((size) => (
                        <span
                          key={size}
                          className="text-xs px-2 py-0.5 bg-secondary rounded"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromWishlist(product.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      size="sm"
                      className="gap-2"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span className="hidden sm:inline">Add to Cart</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
