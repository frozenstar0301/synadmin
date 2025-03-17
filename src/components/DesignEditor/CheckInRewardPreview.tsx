import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { CheckInScreen, FontItem, ImageItem } from '../../types/index';
import defaultMarkImage from '../../assets/Calendar.png';
import defaultGemImage from '../../assets/gem.png';
import defaultCardImage from '../../assets/itemicon.png';
import defaultGetImage from '../../assets/get.png';


interface Props {
  screen: Partial<CheckInScreen>;
  fonts: FontItem[];
  images: ImageItem[];
}

export const CheckInRewardPreview: React.FC<Props> = ({ screen, fonts, images }) => {
  const [fontsLoaded, setFontsLoaded] = useState<{ [key: string]: boolean }>({});
  const markImage = images.find(img => img.id === screen.mark_image_id);
  const background1Image = images.find(img => img.id === screen.background1_image_id);
  const background2Image = images.find(img => img.id === screen.background2_image_id);
  const buttonImage = images.find(img => img.id === screen.button_image_id);
  const signinFont = fonts.find(font => font.id === screen.font_id);
  const subpanelImage = images.find(img => img.id === screen.subpanel_image_id);
  const cardContentImage = images.find(img => img.id === screen.card_content_bg_image_id);
  const cardTitleImage = images.find(img => img.id === screen.card_title_bg_image_id);
  const gemImage = images.find(img => img.id === screen.gem_image_id);
  const cardImage = images.find(img => img.id === screen.card_icon_image_id);
  const getImage = images.find(img => img.id === screen.get_image_id);

  const cardBorderColor = screen.card_border_color || '#4FC3F7';

  // Font loading logic
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
  }, [fonts, fontsLoaded]);

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

  // Mock data for rewards
  const rewards = [
    { day: 1, amount: 100000, type: 'gem', selected: false, completed: false },
    { day: 2, amount: null, type: 'get', selected: true, completed: false },
    { day: 3, amount: 250000, type: 'gem', selected: false, completed: false },
    { day: 4, amount: null, type: 'card', selected: false, completed: false },
    { day: 5, amount: 300000, type: 'gem', selected: false, completed: false },
    { day: 6, amount: null, type: 'card', selected: false, completed: false },
    { day: 7, amount: 400000, type: 'gem', selected: false, completed: false },
  ];

  const remainingTime = "5:22:19:4";

  return (
    <Paper
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#0B2A0B',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        ...fontStyle,
      }}
    >
      <Box
        sx={{
          width: '100%',
          backgroundColor: background2Image ? 'transparent' : '#7AB82E',
          backgroundImage: background2Image ? `url(${background2Image.url})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '30px 30px 0 0',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'visible',
          pb: 10,
        }}
      >
        {/* Semi-ellipse with calendar/mark icon */}
        <Box
          sx={{
            position: 'absolute',
            top: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            height: '80px',
            maxHeight: '9%',
            borderRadius: '80px 80px 0 0',
            backgroundColor: background1Image ? 'transparent' : '#7AB82E',
            backgroundImage: background1Image ? `url(${background1Image.url})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingTop: '0px',
          }}
        >
          <Box
            sx={{
              width: '80px',
              height: '80px',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: '-30px',
              zIndex: 5,
            }}
          >
            {markImage ? (
              <Box
                component="img"
                src={markImage.url}
                sx={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'contain',
                }}
                alt="Calendar Icon"
              />
            ) : (
              <Box
                component="img"
                src={defaultMarkImage} // Use the imported default image
                sx={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'contain',
                }}
                alt="Calendar Icon"
              />
            )}
          </Box>
        </Box>

        {/* Title */}
        <Box sx={{ textAlign: 'center', mt: 0, mb: 1 }}>
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              lineHeight: 1.2,
              ...fontStyle,
            }}
          >
            CHECK IN
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              lineHeight: 1.2,
              ...fontStyle,
            }}
          >
            REWARD
          </Typography>
        </Box>

        {/* Subtitle */}
        <Typography
          variant="subtitle1"
          sx={{
            color: 'rgb(255, 255, 255, 0.7)',
            mb: 2,
            fontSize: '0.9rem',
            ...fontStyle,
          }}
        >
          Come back tommorow and get this one!
        </Typography>

        <Box
          sx={{
            position: 'relative',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            borderRadius: '20px',
            padding: '6px 16px',
            mb: 3,
            width: '80%',
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '300px',
            alignItems: 'center',
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
          <Typography
            variant="body2"
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.85rem',
              position: 'relative',
              zIndex: 1,
              ...fontStyle,
            }}
          >
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                marginRight: 1,
                color: '#7AB82E', // Green color for the clock icon
              }}
            >
              ⏱
            </Box>
            <Box
              component="span"
              sx={{
                color: '#7AB82E',
              }}
              pr='10px'
            >
              Remain Time{' '}
            </Box>
            <Box
              component="span"
              sx={{
                color: 'white',
              }}
            >
              {remainingTime}
            </Box>
          </Typography>
        </Box>

        {/* Container for reward cards */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '600px',
            px: 2,
          }}
        >
          {/* Reward cards */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              width: '100%',
            }}
          >
            {rewards.map((reward) => (
              <Box
                key={reward.day}
                sx={{
                  width: 'calc(100% / 7 - 8px)',
                  minWidth: '70px',
                  aspectRatio: '0.7',
                  borderRadius: '12px',
                  position: 'relative',
                  // Enhanced styling for selected card (DAY 2)
                  ...(reward.selected ? {
                    boxShadow: '0 0 0 3px #FFD700, 0 0 12px 4px rgba(255, 215, 0, 0.8), 0 0 20px 6px rgba(255, 215, 0, 0.4)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: '10px',
                      border: `3px solid ${cardBorderColor}`,
                      boxShadow: `0 0 10px 3px rgba(79, 195, 247, 0.9), inset 0 0 6px 2px rgba(79, 195, 247, 0.7)`,
                      pointerEvents: 'none',
                      zIndex: 2
                    },
                  } : {}),
                  backgroundColor: reward.completed
                    ? '#8BC34A'
                    : reward.selected
                      ? '#8BC34A'
                      : 'rgba(255, 255, 255, 0.25)',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    padding: '4px',
                    textAlign: 'center',
                    position: 'relative',
                    backgroundColor: cardTitleImage ? 'transparent' : 'rgba(255, 255, 255)',
                    opacity: 0.3,
                    overflow: 'hidden',
                  }}
                >
                  {cardTitleImage && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${cardTitleImage.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 0,
                      }}
                    />
                  )}
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#7AB82E',
                      fontWeight: 'medium',
                      fontSize: '0.8rem',
                      position: 'relative',
                      zIndex: 1,
                      ...fontStyle,
                    }}
                  >
                    DAY {reward.day}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    height: '75%',
                    padding: '8px 4px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {cardContentImage && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${cardContentImage.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.2,
                        zIndex: 0,
                      }}
                    />
                  )}

                  <Box
                    sx={{
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      zIndex: 1,
                      marginTop: '10px',
                    }}
                  >
                    {reward.type === 'gem' && (
                      gemImage ? (
                        <Box
                          component="img"
                          src={gemImage.url}
                          sx={{
                            width: '65px',
                            height: '65px',
                            objectFit: 'contain',
                          }}
                          alt="Gem"
                        />
                      ) : (
                        <Box
                          component="img"
                          src={defaultGemImage}
                          sx={{
                            width: '65px',
                            height: '65px',
                            objectFit: 'contain',
                          }}
                          alt="Get"
                        />
                      )
                    )}
                    {reward.type === 'get' && (
                      getImage ? (
                        <Box
                          component="img"
                          src={getImage.url}
                          sx={{
                            width: '65px',
                            height: '65px',
                            objectFit: 'contain',
                          }}
                          alt="Get"
                        />
                      ) : (
                        <Box
                          component="img"
                          src={defaultGetImage}
                          sx={{
                            width: '65px',
                            height: '65px',
                            objectFit: 'contain',
                          }}
                          alt="Get"
                        />
                      )
                    )}
                    {reward.type === 'card' && (
                      cardImage ? (
                        <Box
                          component="img"
                          src={cardImage.url}
                          sx={{
                            width: '65px',
                            height: '65px',
                            objectFit: 'contain',
                          }}
                          alt="Card"
                        />
                      ) : (
                        <Box
                          component="img"
                          src={defaultCardImage}
                          sx={{
                            width: '65px',
                            height: '65px',
                            objectFit: 'contain',
                          }}
                          alt="Get"
                        />
                      )
                    )}
                  </Box>

                  <Box
                    sx={{
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '5px',
                    }}
                  >
                    {reward.amount && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.3)',
                          fontWeight: 'bold',
                          fontSize: '0.75rem',
                          position: 'relative',
                          zIndex: 1,
                          ...fontStyle,
                        }}
                      >
                        {reward.amount}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Button
          sx={{
            mt: 4,
            mb: 3,
            backgroundColor: buttonImage ? 'transparent' : '#14E47B',
            color: 'white',
            borderRadius: '25px',
            padding: '8px 40px',
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: '1.1rem',
            border: '5px solid #5CFF84',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              backgroundColor: buttonImage ? 'rgba(255, 255, 255, 0.1)' : '#14E47B',
            },
            ...fontStyle,
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
              position: 'relative',
              zIndex: 1,
              ...fontStyle,
            }}
          >
            Collect
          </Typography>
        </Button>
      </Box>
    </Paper>
  );
};
