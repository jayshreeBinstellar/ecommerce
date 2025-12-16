import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">ELEGANCE</h3>
            <p className="text-background/70 mb-6">
              Discover timeless fashion for the whole family. Quality meets style in every piece.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=women" className="text-background/70 hover:text-background transition-colors">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link to="/products?category=men" className="text-background/70 hover:text-background transition-colors">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link to="/products?category=kids" className="text-background/70 hover:text-background transition-colors">
                  Kids' Collection
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-background/70 hover:text-background transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/enquiry" className="text-background/70 hover:text-background transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-background/70">
                <Mail className="h-4 w-4" />
                <span>hello@elegance.com</span>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Phone className="h-4 w-4" />
                <span>+91 1800 123 4567</span>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="h-4 w-4 mt-1" />
                <span>123 Fashion Street,<br />Mumbai, India 400001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center text-background/50 text-sm">
          <p>© 2024 Elegance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
