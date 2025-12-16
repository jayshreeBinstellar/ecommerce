import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { products } from '@/data/products';

const Navbar = () => {
  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof products>([]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products?category=women', label: 'Women' },
    { href: '/products?category=men', label: 'Men' },
    { href: '/products?category=kids', label: 'Kids' },
    { href: '/products', label: 'All Products' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    const [path, query] = href.split('?');
    if (location.pathname !== path) return false;
    if (!query) return location.pathname === path && !location.search;
    return location.search === `?${query}`;
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      const results = products.filter(
        (p) =>
          p.name.toLowerCase().includes(value.toLowerCase()) ||
          p.category.toLowerCase().includes(value.toLowerCase()) ||
          p.subcategory.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (productId: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    navigate(`/product/${productId}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      isActive(link.href) ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/wishlist"
                  className="text-lg font-medium transition-colors hover:text-primary text-foreground"
                >
                  Wishlist
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl lg:text-3xl font-heading font-bold tracking-tight">
              ELEGANCE
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium tracking-wide transition-all duration-300 relative group hover:text-primary ${
                  isActive(link.href) ? 'text-primary' : 'text-foreground'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActive(link.href) ? 'right-0' : 'right-full group-hover:right-0'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden sm:flex"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/wishlist" className="relative hidden sm:block">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-medium animate-scale-in">
                    {totalWishlistItems}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for products..."
                className="input-elegant pl-12"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            
            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 mx-4 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50 animate-fade-in">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleResultClick(product.id)}
                    className="w-full flex items-center gap-4 p-3 hover:bg-secondary transition-colors text-left"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{product.price.toLocaleString()} · {product.subcategory}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            {searchQuery && searchResults.length === 0 && (
              <div className="absolute left-0 right-0 mt-2 mx-4 bg-background border border-border rounded-xl shadow-lg p-6 text-center z-50 animate-fade-in">
                <p className="text-muted-foreground">No products found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
