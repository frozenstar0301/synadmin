import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Paper } from '@mui/material';
import { ForgetPwScreen, FontItem, ImageItem } from '../../types/index';

interface Props {
  screen: Partial<ForgetPwScreen>;
  fonts: FontItem[];
  images: ImageItem[];
}

export const ForgetPwScreenPreview: React.FC<Props> = ({ screen, fonts, images }) => {
  const [fontsLoaded, setFontsLoaded] = useState<{ [key: string]: boolean }>({});
  const backgroundImage = images.find(img => img.id === screen.background_image_id);
  const buttonImage = images.find(img => img.id === screen.button_image_id);
  const signinFont = fonts.find(font => font.id === screen.font_id);
  const subpanelImage = images.find(img => img.id === screen.subpanel_image_id);
  const emailImage = images.find(img => img.id === screen.email_image_id);
  
  const emailBorderColor = screen.email_border_color || '#ffffff';

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

  useEffect(() => {
    const style = document.createElement('style');
    const fontFaces = fonts.map(font => `
      @font-face {
        font-family: "${font.name}";
        src: url("${font.url}") format("truetype");
        font-weight: normal;
        font-style: normal;
      }
    `).join('\n');

    style.textContent = fontFaces;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [fonts]);

  const fontStyle = signinFont ? {
    fontFamily: `"${signinFont.name}", Arial`,
    '& *': {
      fontFamily: `"${signinFont.name}", Arial !important`,
    }
  } : {
    fontFamily: 'Arial',
    '& *': {
      fontFamily: 'Arial !important',
    }
  };

  return (
    <Paper
      sx={{
        width: '100%',
        height: '100%',
        aspectRatio: '16/9',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#1B3B1B',
        ...fontStyle,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '600px',
          borderRadius: '80px',
          padding: '1.5rem',
          backgroundImage: backgroundImage ? `url(${backgroundImage.url})` : 'none',
          backgroundColor: backgroundImage ? 'transparent' : '#85BD38',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            color: 'white',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
            ...fontStyle,
          }}
        >
          Forget Password
        </Typography>

        <Box
          sx={{
            width: '90%',
            position: 'relative',
            borderRadius: '50px',
            padding: '2rem',
            overflow: 'hidden',
          }}
        >
          {subpanelImage && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${subpanelImage.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.3,
                zIndex: 0,
              }}
            />
          )}
          
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: subpanelImage ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.3)',
              zIndex: 0,
            }}
          />
          
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Box sx={{ marginBottom: '1rem' }}>
              <Typography
                sx={{
                  color: 'white',
                  marginBottom: '0.5rem',
                  ...fontStyle,
                }}
              >
                Email
              </Typography>
              <Box sx={{ position: 'relative', width: '100%' }}>
                {emailImage && (
                  <Box
                    component="img"
                    src={emailImage.url}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: '25px',
                    }}
                    alt=""
                  />
                )}
                <TextField
                  fullWidth
                  placeholder="Enter your email."
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    '& .MuiOutlinedInput-root': {
                      bgcolor: emailImage ? 'transparent' : '#8BC34A',
                      borderRadius: '25px',
                      '& fieldset': {
                        borderColor: emailBorderColor,
                        borderWidth: '1px',
                      },
                      '&:hover fieldset': {
                        borderColor: emailBorderColor,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: emailBorderColor,
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: 'white',
                      ...fontStyle,
                    },
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginTop: '0.5rem',
                marginBottom: '1rem',
                color: 'white',
                ...fontStyle,
                '& a': {
                  color: '#CCE8A6',
                  textDecoration: 'underline',
                  ...fontStyle,
                },
              }}
            >
              <Typography sx={{ color: 'white', fontWeight: 'bold', ...fontStyle }}>
                Already sent?{' '}
                <a href="#" style={{ ...fontStyle, color: '#CCE8A6' }}>Sign In</a>
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              <Button
                sx={{
                  width: '30%',
                  height: '40px',
                  bgcolor: buttonImage ? 'transparent' : '#D3EDB0',
                  color: 'white',
                  borderRadius: '25px',
                  textTransform: 'none',
                  position: 'relative',
                  padding: '30px 16px',
                  overflow: 'hidden',
                  ...fontStyle,
                  '&:hover': {
                    bgcolor: buttonImage ? 'rgba(255, 255, 255, 0.5)' : '#D3EDB0',
                  },
                }}
              >
                {buttonImage && (
                  <Box
                    component="img"
                    src={buttonImage.url}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    alt=""
                  />
                )}
                <Typography
                  sx={{
                    position: buttonImage ? 'relative' : 'static',
                    zIndex: 1,
                    fontSize: "1.5rem",
                    fontWeight: 'bold',
                    ...fontStyle,
                  }}
                >
                  Register
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
