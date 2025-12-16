import { useState, useCallback } from 'react';

interface UseColorChangeResult {
  isLoading: boolean;
  error: string | null;
  generateColorVariant: (imageUrl: string, currentColor: string, targetColor: string) => Promise<string | null>;
}

// Color mapping for CSS filter-based color changes (fallback)
const colorFilters: Record<string, string> = {
  'White': 'brightness(1.3) saturate(0)',
  'Black': 'brightness(0.3) saturate(0)',
  'Navy': 'hue-rotate(220deg) saturate(1.5) brightness(0.6)',
  'Light Blue': 'hue-rotate(200deg) saturate(0.8) brightness(1.2)',
  'Red': 'hue-rotate(0deg) saturate(2) brightness(0.9)',
  'Burgundy': 'hue-rotate(350deg) saturate(1.5) brightness(0.6)',
  'Charcoal': 'brightness(0.5) saturate(0.3)',
  'Gray': 'brightness(0.8) saturate(0.2)',
  'Brown': 'hue-rotate(30deg) saturate(1.2) brightness(0.6)',
  'Olive': 'hue-rotate(80deg) saturate(0.8) brightness(0.7)',
  'Khaki': 'hue-rotate(45deg) saturate(0.6) brightness(1.1)',
  'Cream': 'brightness(1.2) saturate(0.3) sepia(0.3)',
  'Blush': 'hue-rotate(330deg) saturate(0.6) brightness(1.1)',
  'Pink': 'hue-rotate(330deg) saturate(1.2) brightness(1.1)',
  'Lavender': 'hue-rotate(270deg) saturate(0.6) brightness(1.1)',
  'Mint': 'hue-rotate(150deg) saturate(0.6) brightness(1.2)',
  'Emerald': 'hue-rotate(150deg) saturate(1.5) brightness(0.7)',
  'Forest Green': 'hue-rotate(120deg) saturate(1.2) brightness(0.5)',
  'Yellow': 'hue-rotate(60deg) saturate(2) brightness(1.2)',
  'Blue': 'hue-rotate(200deg) saturate(1.5) brightness(0.8)',
  'Tan': 'hue-rotate(40deg) saturate(0.5) brightness(1)',
  'Oatmeal': 'brightness(1.1) saturate(0.4) sepia(0.2)',
  'Dusty Rose': 'hue-rotate(340deg) saturate(0.5) brightness(1)',
  'Ivory': 'brightness(1.2) saturate(0.2) sepia(0.1)',
  'Camel': 'hue-rotate(35deg) saturate(0.8) brightness(0.9)',
  'Beige': 'brightness(1.1) saturate(0.4) sepia(0.3)',
  'Light Denim': 'hue-rotate(210deg) saturate(0.6) brightness(1.1)',
  'Dark Denim': 'hue-rotate(220deg) saturate(0.8) brightness(0.6)',
  'Green': 'hue-rotate(120deg) saturate(1.2) brightness(0.8)',
  'Floral Pink': 'hue-rotate(340deg) saturate(1.2) brightness(1.1)',
  'Floral Blue': 'hue-rotate(210deg) saturate(1) brightness(1)',
  'Floral Green': 'hue-rotate(130deg) saturate(1) brightness(1)',
  'Dark Blue': 'hue-rotate(220deg) saturate(1.2) brightness(0.5)',
  'Medium Wash': 'hue-rotate(210deg) saturate(0.7) brightness(0.9)',
};

export const useColorChange = (): UseColorChangeResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateColorVariant = useCallback(async (
    imageUrl: string,
    currentColor: string,
    targetColor: string
  ): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate loading for smoother UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return the filter to be applied (we'll handle this differently)
      // For now, return null to indicate we should use CSS filters
      return null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change color');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, generateColorVariant };
};

export const getColorFilter = (color: string): string => {
  return colorFilters[color] || 'none';
};
