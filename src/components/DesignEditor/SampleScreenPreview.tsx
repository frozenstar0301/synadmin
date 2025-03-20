import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { FontItem, ImageItem, SampleScreen } from '../../types/index';

interface Props {
  screen: Partial<SampleScreen>;
  fonts: FontItem[];
  images: ImageItem[];
}

export const SampleScreenPreview: React.FC<Props> = ({ screen, fonts, images }) => {
  const [fontsLoaded, setFontsLoaded] = useState<{ [key: string]: boolean }>({});
  const backgroundImage = images.find(img => img.id === screen.background_image_id);

  // Font loading logic remains the same
  useEffect(() => {
    const loadFonts = async () => {
      const loadedFonts: { [key: string]: boolean } = {};

      for (const font of fonts) {
        if (!document.fonts.check(`12px "${font.name}"`) && !fontsLoaded[font.id]) {
          try {
            const fontFace = new FontFace(font.name, `url(${font.url})`);
            await fontFace.load();
            document.fonts.add(fontFace);
            loadedFonts[font.id] = true;
          } catch (error) {
            console.error(`Error loading font ${font.name}:`, error);
            loadedFonts[font.id] = false;
          }
        }
      }

      setFontsLoaded(prev => ({ ...prev, ...loadedFonts }));
    };

    loadFonts();
  }, [fonts]);



  return (
    <Paper
      sx={{
        width: '100%',
        height: '100%',
        aspectRatio: '16/9',
        overflow: 'hidden',
        position: 'relative',
        backgroundImage: backgroundImage ? `url(${backgroundImage.url})` : 'none',
        backgroundColor: backgroundImage ? 'transparent' : '#1B3B1B',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      
    </Paper>
  );
};
