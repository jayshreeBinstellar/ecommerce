import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-fashion.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Fashion collection" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-2xl">
          {/* Content */}
          <div className="animate-slide-up">
            <p className="text-primary font-medium tracking-widest uppercase mb-4">
              New Season Arrivals
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6 text-balance">
              Discover Your
              <span className="block text-primary">Perfect Style</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-8">
              Curated collections for men, women, and kids. Premium quality, 
              timeless designs that elevate your everyday wardrobe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button size="lg" className="btn-primary text-lg px-8">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/products?sale=true">
                <Button size="lg" variant="outline" className="btn-outline text-lg px-8">
                  View Sale
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-12 mt-12">
              <div>
                <p className="text-3xl font-heading font-bold text-foreground">50K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-foreground">1000+</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-foreground">4.8★</p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
