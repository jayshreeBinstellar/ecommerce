import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'];
const priceRanges = [
  { label: 'Under ₹1000', min: 0, max: 1000 },
  { label: '₹1000 - ₹2500', min: 1000, max: 2500 },
  { label: '₹2500 - ₹5000', min: 2500, max: 5000 },
  { label: 'Above ₹5000', min: 5000, max: Infinity },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('newest');

  // Sync category with URL params
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by size (single selection)
    if (selectedSize) {
      filtered = filtered.filter((p) =>
        p.sizes.includes(selectedSize)
      );
    }

    // Filter by price
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      filtered = filtered.filter(
        (p) => p.price >= range.min && p.price <= range.max
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return filtered;
  }, [selectedCategory, selectedSize, selectedPriceRange, sortBy]);

  const selectSize = (size: string) => {
    setSelectedSize(selectedSize === size ? null : size);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSize(null);
    setSelectedPriceRange(null);
  };

  const hasFilters = selectedCategory || selectedSize || selectedPriceRange !== null;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category */}
      <div className="animate-fade-in">
        <h4 className="font-semibold mb-3">Category</h4>
        <div className="space-y-2">
          {['women', 'men', 'kids'].map((cat, index) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-300 transform hover:translate-x-1 ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground scale-[1.02] shadow-md'
                  : 'hover:bg-secondary'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h4 className="font-semibold mb-3">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <button
              key={index}
              onClick={() => setSelectedPriceRange(selectedPriceRange === index ? null : index)}
              className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-300 transform hover:translate-x-1 ${
                selectedPriceRange === index
                  ? 'bg-primary text-primary-foreground scale-[1.02] shadow-md'
                  : 'hover:bg-secondary'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes - Single Selection */}
      <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h4 className="font-semibold mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size, index) => (
            <button
              key={size}
              onClick={() => selectSize(size)}
              className={`px-3 py-1.5 text-sm border rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                selectedSize === size
                  ? 'bg-foreground text-background border-foreground shadow-md'
                  : 'border-border hover:border-foreground hover:shadow-sm'
              }`}
              style={{ animationDelay: `${index * 0.02}s` }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container-custom py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold">
              {selectedCategory
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}'s Collection`
                : 'All Products'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile Filter */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                  {hasFilters && (
                    <span className="ml-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      !
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
                {hasFilters && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full mt-6"
                  >
                    Clear All Filters
                  </Button>
                )}
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 animate-fade-in">
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm animate-scale-in">
                {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                <button onClick={() => setSelectedCategory(null)} className="hover:text-primary transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedSize && (
              <span
                className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm animate-scale-in"
              >
                Size: {selectedSize}
                <button onClick={() => setSelectedSize(null)} className="hover:text-primary transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedPriceRange !== null && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm animate-scale-in">
                {priceRanges[selectedPriceRange].label}
                <button onClick={() => setSelectedPriceRange(null)} className="hover:text-primary transition-colors">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-primary hover:underline transition-all duration-200 hover:translate-x-0.5"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Filters</h3>
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No products found matching your criteria.
                </p>
                <Button onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
