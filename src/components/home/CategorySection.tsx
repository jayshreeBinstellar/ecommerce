import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import categoryWomen from '@/assets/category-women.jpg';
import categoryMen from '@/assets/category-men.jpg';
import categoryKids from '@/assets/category-kids.jpg';

const categories = [
  {
    id: 'women',
    name: 'Women',
    description: 'Elegant styles for every occasion',
    image: categoryWomen,
  },
  {
    id: 'men',
    name: 'Men',
    description: 'Sophisticated essentials',
    image: categoryMen,
  },
  {
    id: 'kids',
    name: 'Kids',
    description: 'Playful & comfortable',
    image: categoryKids,
  },
];

const CategorySection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our curated collections designed for every member of your family
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="category-card group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-xl">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                <h3 className="text-3xl font-heading font-bold text-background mb-2">
                  {category.name}
                </h3>
                <p className="text-background/80 mb-4">{category.description}</p>
                <div className="flex items-center gap-2 text-background font-medium group-hover:gap-4 transition-all">
                  Shop Now
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
