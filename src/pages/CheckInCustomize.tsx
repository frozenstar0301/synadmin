// src/pages/SignUpCustomize.tsx
import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
  Backdrop,
  Alert,
  Snackbar,
  useTheme,
  alpha,
  Chip,
  Fade,
  useMediaQuery
} from '@mui/material';
import {
  Image as ImageIcon,
  TextFields as TextFieldsIcon,
  ColorLens as ColorLensIcon,
  Visibility as VisibilityIcon,
  Dashboard as DashboardIcon,
  Palette as PaletteIcon
} from '@mui/icons-material';
import { BackgroundSelector } from '../components/DesignEditor/BackgroundSelector';
import { ButtonDesigner } from '../components/DesignEditor/ButtonDesigner';
import { useImages } from '../hooks/useImages';
import { useFonts } from '../hooks/useFonts';
import { useCheckInScreens } from '../hooks/useCheckInScreens';
import { FontItem, ImageItem, CheckInScreen } from '../types/index';
import { ColorPicker } from '../components/DesignEditor/ColorPicker';
import { CheckInRewardPreview } from '../components/DesignEditor/CheckInRewardPreview';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface AlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}

interface CheckInCustomizeProps {
  id?: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Fade in={value === index}>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`design-tabpanel-${index}`}
        aria-labelledby={`design-tab-${index}`}
        {...other}
        style={{
          height: '100%',
          display: value === index ? 'block' : 'none',
          overflow: 'auto'
        }}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    </Fade>
  );
}

export const CheckInCustomize = ({ id }: CheckInCustomizeProps) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const { images, uploadImage, isUploading: isUploadingImage } = useImages();
  const { fonts, uploadFont, isUploading: isUploadingFont } = useFonts();
  const { saveScreen, loadScreen } = useCheckInScreens();

  const [screen, setScreen] = useState<Partial<CheckInScreen>>({
    card_border_color: '#ffffff',
  });
  const [tabValue, setTabValue] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: '',
    severity: 'success'
  });

  // Expose save function to parent component
  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveScreen(screen);
      setAlert({
        open: true,
        message: 'Screen saved successfully!',
        severity: 'success'
      });
      return true;
    } catch (error) {
      console.error('Error saving screen:', error);
      setAlert({
        open: true,
        message: 'Failed to save screen. Please try again.',
        severity: 'error'
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        (element as any).__saveScreen = handleSave;
      }
    }
  }, [id, screen]);

  const handleTabChange = (newValue: number) => {
    setTabValue(newValue);
  };

  const handleBackground1Select = (image: ImageItem | null) => {
    setScreen((prev: any) => ({
      ...prev,
      background1_image_id: image?.id || null,
    }));
  };

  const handleBackground2Select = (image: ImageItem | null) => {
    setScreen((prev: any) => ({
      ...prev,
      background2_image_id: image?.id || null,
    }));
  };

  const handleButtonSelect = (image: ImageItem | null) => {
    setScreen((prev: any) => ({
      ...prev,
      button_image_id: image?.id || null,
    }));
  };

  const handleSubPanelSelect = (image: ImageItem | null) => {
    setScreen((prev: any) => ({
      ...prev,
      subpanel_image_id: image?.id || null,
    }));
  };
  
  const handleCardBorderColor = (color: string) => {
    setScreen((prev: any) => ({
      ...prev,
      card_border_color: color,
    }));
  };

  const handleCardContentImage = (image: ImageItem | null) => {
    setScreen((prev: any) => ({
      ...prev,
      card_content_bg_image_id: image?.id || null,
    }));
  };

  const handleCardTitleImage = (image: ImageItem | null) => {
    setScreen((prev: any) => ({
      ...prev,
      card_title_bg_image_id: image?.id || null,
    }));
  };

  const handleGemImage = (image: ImageItem | null) => {
    setScreen((prev: any) => ({
      ...prev,
      gem_image_id: image?.id || null,
    }));
  };

  const handleCardImage = (image: ImageItem | null) => {
    setScreen((prev: any) => ({
      ...prev,
      card_icon_image_id: image?.id || null,
    }));
  };

  const handleGetImage = (image: ImageItem | null) => {
    setScreen((prev: any) => ({
      ...prev,
      get_image_id: image?.id || null,
    }));
  };

  const handleMarkImage = (image: ImageItem | null) => {
    setScreen((prev: any) => ({
      ...prev,
      mark_image_id: image?.id || null,
    }));
  };

  const handleSigninFontSelect = (font: FontItem) => {
    setScreen((prev: any) => ({
      ...prev,
      font_id: font.id,
    }));
  };

  const handleCloseAlert = (reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const initializeScreen = async () => {
      try {
        setIsInitialLoading(true);
        const loadedScreen = await loadScreen();
        if (loadedScreen) {
          setScreen(loadedScreen);
        }
      } catch (error) {
        console.error('Error loading screen:', error);
        setAlert({
          open: true,
          message: 'Failed to load screen. Please refresh the page.',
          severity: 'error'
        });
      } finally {
        setIsInitialLoading(false);
      }
    };

    initializeScreen();
  }, []);

  if (isInitialLoading) {
    return (
      <Backdrop
        open={true}
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <CircularProgress
          color="inherit"
          size={60}
          thickness={4}
        />
        <Typography variant="h6" sx={{ fontWeight: 500, letterSpacing: 0.5 }}>
          Loading Screen Designer...
        </Typography>
      </Backdrop>
    );
  }

  // Calculate preview height based on screen size
  const previewHeight = isXs ? '700px' : isMd ? '800px' : '900px';

  return (
    <Box
      id={id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`
          : `linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%)`,
      }}
    >
      <Container maxWidth="xl" sx={{ mt: { xs: 2, sm: 3, md: 4 }, mb: { xs: 2, sm: 3, md: 4 }, flexGrow: 1 }}>
        <Box sx={{
          mb: { xs: 2, sm: 3, md: 4 },
          display: 'flex',
          flexDirection: isXs ? 'column' : 'row',
          alignItems: isXs ? 'flex-start' : 'center',
          gap: isXs ? 1 : 0
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DashboardIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="h5" component="h1" fontWeight={600} color="primary">
              Check-In Reward Screen Designer
            </Typography>
          </Box>
          <Chip
            label="Customization"
            size="small"
            color="primary"
            variant="outlined"
            sx={{ ml: isXs ? 0 : 2, borderRadius: '4px' }}
          />
        </Box>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          <Grid item xs={12} lg={8} order={{ xs: 2, lg: 1 }}>
            <Paper
              elevation={3}
              sx={{
                height: previewHeight,
                position: { xs: 'static', lg: 'sticky' },
                top: 88,
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              }}
            >
              <Box
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  background: alpha(theme.palette.primary.main, 0.05)
                }}
              >
                <VisibilityIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="h6" fontWeight={600}>
                  Live Preview
                </Typography>
              </Box>
              <CheckInRewardPreview
                screen={screen}
                fonts={fonts}
                images={images}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4} order={{ xs: 1, lg: 2 }}>
            <Paper
              elevation={3}
              sx={{
                height: previewHeight,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              }}
            >
              <Box
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  background: alpha(theme.palette.primary.main, 0.05)
                }}
              >
                <PaletteIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="h6" fontWeight={600}>
                  Design Elements
                </Typography>
              </Box>

              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  overflowX: 'auto',
                  backgroundColor: theme.palette.background.paper,
                  '&::-webkit-scrollbar': {
                    height: '8px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.3),
                    }
                  },
                }}
              >
                <Tabs
                  value={tabValue}
                  onChange={(_, newValue) => handleTabChange(newValue)}
                  aria-label="editor tabs"
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    minHeight: '56px',
                    '& .MuiTabs-flexContainer': {
                      gap: '4px',
                    },
                    '& .MuiTab-root': {
                      minHeight: '56px',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      textTransform: 'none',
                      transition: 'all 0.2s',
                      minWidth: isXs ? '80px' : '120px', // Narrower tabs on mobile
                      padding: isXs ? '6px 8px' : '6px 16px',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      }
                    },
                    '& .Mui-selected': {
                      color: `${theme.palette.primary.main} !important`,
                      fontWeight: 600,
                    },
                    '& .MuiTabs-indicator': {
                      height: 3,
                      borderTopLeftRadius: 3,
                      borderTopRightRadius: 3,
                    }
                  }}
                >
                  <Tab
                    icon={<ImageIcon />}
                    iconPosition={isXs ? "top" : "start"}
                    label="Mark"
                  />
                  <Tab
                    icon={<ImageIcon />}
                    iconPosition={isXs ? "top" : "start"}
                    label="Background-Top"
                  />
                  <Tab
                    icon={<ImageIcon />}
                    iconPosition={isXs ? "top" : "start"}
                    label="Background-Main"
                  />
                  <Tab
                    icon={<ImageIcon />}
                    iconPosition={isXs ? "top" : "start"}
                    label="Button"
                  />
                  <Tab
                    icon={<ImageIcon />}
                    iconPosition={isXs ? "top" : "start"}
                    label="Sub Panel"
                  />
                  <Tab
                    icon={<ImageIcon />}
                    iconPosition={isXs ? "top" : "start"}
                    label="Card-Title"
                  />
                  <Tab
                    icon={<ColorLensIcon />}
                    iconPosition={isXs ? "top" : "start"}
                    label="Card-Selected-Border-Color"
                  />
                  <Tab
                    icon={<ColorLensIcon />}
                    iconPosition={isXs ? "top" : "start"}
                    label="Card-Content-Image"
                  />
                  <Tab
                    icon={<ImageIcon />}
                    iconPosition={isXs ? "top" : "start"}
                    label="Gem"
                  />
                  <Tab
                    icon={<ImageIcon />}
                    iconPosition={isXs ? "top" : "start"}
                    label="Card"
                  />
                  <Tab
                    icon={<ImageIcon />}
                    iconPosition={isXs ? "top" : "start"}
                    label="Get"
                  />
                  <Tab
                    icon={<TextFieldsIcon />}
                    iconPosition={isXs ? "top" : "start"}
                    label="Fonts"
                  />
                </Tabs>
              </Box>

              <Box sx={{
                flexGrow: 1,
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.3),
                  }
                },
                backgroundColor: alpha(theme.palette.background.paper, 0.7),
              }}>
                <TabPanel value={tabValue} index={0}>
                  <BackgroundSelector
                    title="Background Image"
                    images={images}
                    selectedImageId={screen.mark_image_id || ""}
                    onSelect={handleMarkImage}
                    onUpload={uploadImage}
                    isUploading={isUploadingImage}
                  />
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <BackgroundSelector
                    title="Background Image"
                    images={images}
                    selectedImageId={screen.background1_image_id || ""}
                    onSelect={handleBackground1Select}
                    onUpload={uploadImage}
                    isUploading={isUploadingImage}
                  />
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <BackgroundSelector
                    title="Background Image"
                    images={images}
                    selectedImageId={screen.background2_image_id || ""}
                    onSelect={handleBackground2Select}
                    onUpload={uploadImage}
                    isUploading={isUploadingImage}
                  />
                </TabPanel>

                <TabPanel value={tabValue} index={3}>
                  <BackgroundSelector
                    title="Button Background Image"
                    images={images}
                    selectedImageId={screen.button_image_id || ""}
                    onSelect={handleButtonSelect}
                    onUpload={uploadImage}
                    isUploading={isUploadingImage}
                  />
                </TabPanel>

                <TabPanel value={tabValue} index={4}>
                  <BackgroundSelector
                    title="Sub Panel Background Image"
                    images={images}
                    selectedImageId={screen.subpanel_image_id || ""}
                    onSelect={handleSubPanelSelect}
                    onUpload={uploadImage}
                    isUploading={isUploadingImage}
                  />
                </TabPanel>

                <TabPanel value={tabValue} index={5}>
                  <BackgroundSelector
                    title="Email Background Image"
                    images={images}
                    selectedImageId={screen.card_title_bg_image_id || ""}
                    onSelect={handleCardTitleImage}
                    onUpload={uploadImage}
                    isUploading={isUploadingImage}
                  />
                </TabPanel>

                <TabPanel value={tabValue} index={6}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: { xs: 2, sm: 3 },
                      mb: 3,
                      borderRadius: '10px',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.default, 0.8)} 100%)`,
                    }}
                  >
                    <ColorPicker
                      title="Email Border Color"
                      currentColor={screen.card_border_color || "#ffffff"}
                      onColorChange={handleCardBorderColor}
                    />
                  </Paper>
                </TabPanel>

                <TabPanel value={tabValue} index={7}>
                  <BackgroundSelector
                    title="Card Content Image"
                    images={images}
                    selectedImageId={screen.card_content_bg_image_id || ""}
                    onSelect={handleCardContentImage}
                    onUpload={uploadImage}
                    isUploading={isUploadingImage}
                  />
                </TabPanel>

                <TabPanel value={tabValue} index={8}>
                  <BackgroundSelector
                    title="Gem Image"
                    images={images}
                    selectedImageId={screen.gem_image_id || ""}
                    onSelect={handleGemImage}
                    onUpload={uploadImage}
                    isUploading={isUploadingImage}
                  />
                </TabPanel>

                <TabPanel value={tabValue} index={9}>
                  <BackgroundSelector
                    title="Card Icon Image"
                    images={images}
                    selectedImageId={screen.card_icon_image_id || ""}
                    onSelect={handleCardImage}
                    onUpload={uploadImage}
                    isUploading={isUploadingImage}
                  />
                </TabPanel>

                <TabPanel value={tabValue} index={10}>
                  <BackgroundSelector
                    title="Get Image"
                    images={images}
                    selectedImageId={screen.get_image_id || ""}
                    onSelect={handleGetImage}
                    onUpload={uploadImage}
                    isUploading={isUploadingImage}
                  />
                </TabPanel>

                <TabPanel value={tabValue} index={11}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: { xs: 2, sm: 3 },
                      mb: 3,
                      borderRadius: '10px',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.default, 0.8)} 100%)`,
                    }}
                  >
                    <ButtonDesigner
                      fonts={fonts}
                      selectedFontId={screen.font_id || ""}
                      onFontSelect={handleSigninFontSelect}
                      onFontUpload={uploadFont}
                      isUploading={isUploadingFont}
                    />
                  </Paper>
                </TabPanel>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={(_, reason) => handleCloseAlert(reason)}
        anchorOrigin={{ vertical: 'bottom',  horizontal: 'center' }}
      >
        <Alert
          onClose={() => handleCloseAlert()}
          severity={alert.severity}
          sx={{
            width: '100%',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            borderRadius: '8px',
            '& .MuiAlert-icon': {
              fontSize: '24px'
            }
          }}
          elevation={6}
          variant="filled"
        >
          {alert.message}
        </Alert>
      </Snackbar>

      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(4px)',
          background: 'rgba(0,0,0,0.7)'
        }}
        open={isSaving}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress color="inherit" size={50} thickness={4} />
          <Typography variant="h6" sx={{ fontWeight: 500 }}>Saving your design...</Typography>
        </Box>
      </Backdrop>
    </Box>
  );
};