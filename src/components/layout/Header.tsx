// src/components/layout/Header.tsx
import { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  CircularProgress, 
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  styled,
  alpha,
  Fade,
  Grow
} from '@mui/material';
import { 
  Save as SaveIcon,
  Menu as MenuIcon,
  ExitToApp as LogoutIcon,
  KeyboardArrowDown as ArrowDownIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import logoImage from '../../assets/avatar.png';
import { ReactNode } from 'react';
import { ScreenType } from '../../types';

// Enhanced styled Select component with animation
const StyledSelect = styled(Select)(({}) => ({
  color: 'white',
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  borderRadius: '12px',
  minWidth: '170px',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(5px)',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: '1px',
    transition: 'all 0.3s ease',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
  },
  '&.Mui-focused': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.8)',
      borderWidth: '2px',
    },
  },
  '& .MuiSelect-icon': {
    color: 'white',
    transition: 'transform 0.3s ease',
  },
  '&.Mui-focused .MuiSelect-icon': {
    transform: 'rotate(180deg)',
  }
}));

// Enhanced styled InputLabel with animation
const StyledInputLabel = styled(InputLabel)(({}) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  transition: 'all 0.3s ease',
  '&.Mui-focused': {
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 600,
    textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
  }
}));

// Animated Button
const AnimatedButton = styled(Button)(({}) => ({
  position: 'relative',
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transform: 'translateX(-100%)',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 7px 14px rgba(0, 0, 0, 0.2)',
    '&:before': {
      transform: 'translateX(100%)',
      transition: 'transform 0.8s ease',
    }
  },
  '&:active': {
    transform: 'translateY(1px)',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
  }
}));

interface HeaderProps {
  onSave: () => void;
  isSaving: boolean;
  screenType?: ScreenType;
  onScreenTypeChange?: (screenType: ScreenType) => void;
}

// Mapping for screen types to display names
const screenOptions: { value: ScreenType; label: string }[] = [
  { value: "signin", label: "Sign In" },
  { value: "signup", label: "Sign Up" },
  { value: "forgetPw", label: "Forget Password" },
  { value: "checkin", label: "Check-In Reward" },
  { value: "firstload", label: "First Load" },
  { value: "synvault", label: "SYN Vault" },
  { value: "syngames", label: "SYN Games" },
  { value: "joingame", label: "Join Games" },
  { value: "joinsyngamepopup", label: "Join SYN Game Pop Up" },
  { value: "syngamepopup", label: "SYN Game Pop Up" },
  { value: "rankuprewards", label: "Rank Up Rewards" },
  { value: "rankuppercentage", label: "Rank Up Percentage" },
  { value: "topnavbar", label: "Top Navbar" },
  { value: "playerprofile", label: "Player Profile" },
  { value: "changecharacter", label: "Change Character" },
  { value: "leadershipboard", label: "Leadership Board" },
  { value: "linkemail", label: "Link Email" },
  { value: "inbox", label: "Inbox" },
  { value: "dailyrewards", label: "Daily Rewards" },
  { value: "seasons", label: "Seasons" },
  { value: "earnsynpoints", label: "Earn SYN Points" },
  { value: "history", label: "History" },
  { value: "changeSettings", label: "Change Settings" },
  { value: "bottomNavbar", label: "Bottom Navbar" }
];

export const Header = ({ 
  onSave, 
  isSaving, 
  screenType = 'signin', 
  onScreenTypeChange 
}: HeaderProps) => {
  const { logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [logoHover, setLogoHover] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  
  // Animation for logo on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const handleScreenChange = (event: SelectChangeEvent<unknown>, _: ReactNode) => {
    const newValue = event.target.value as ScreenType;
    
    // Call the parent's handler if provided
    if (onScreenTypeChange) {
      onScreenTypeChange(newValue);
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(90deg, #1a237e 0%, #283593 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 6px 25px rgba(0,0,0,0.2)',
        }
      }}
    >
      <Toolbar sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        py: 1.2,
        px: { xs: 2, sm: 3 }
      }}>
        <Grow in={showLogo} timeout={800}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              transition: 'transform 0.3s ease',
              transform: logoHover ? 'scale(1.05)' : 'scale(1)',
            }}
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
          >
            <Box
              component="img"
              src={logoImage}
              alt="SYN Logo"
              sx={{ 
                width: 42, 
                height: 42,
                mr: 2,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid white',
                boxShadow: logoHover 
                  ? '0 0 15px rgba(255, 255, 255, 0.7), 0 0 30px rgba(255, 255, 255, 0.4)' 
                  : '0 0 10px rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease',
                transform: logoHover ? 'rotate(10deg)' : 'rotate(0)',
              }}
            />
            
            <Typography 
              variant="h6" 
              component="div"
              sx={{ 
                fontWeight: 700,
                background: logoHover
                  ? 'linear-gradient(45deg, #ffffff 30%, #e0e0e0 90%)'
                  : 'linear-gradient(45deg, #e0e0e0 30%, #ffffff 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '1px',
                textShadow: logoHover ? '0 0 20px rgba(255, 255, 255, 0.4)' : 'none',
                transition: 'all 0.3s ease',
                fontSize: { xs: '1.1rem', sm: '1.3rem' }
              }}
            >
              SYN Admin
            </Typography>
          </Box>
        </Grow>

        <Fade in={true} timeout={1000}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mx: 2,
            flexGrow: isMobile ? 0 : 1,
            justifyContent: 'center',
            maxWidth: isMobile ? '140px' : '220px'
          }}>
            <FormControl 
              fullWidth 
              size={isMobile ? "small" : "medium"}
              sx={{ m: 1 }}
            >
              <StyledInputLabel id="screen-type-label">Select Screen</StyledInputLabel>
              <StyledSelect
                labelId="screen-type-label"
                id="screen-type-select"
                value={screenType}
                label="Screen Type"
                onChange={handleScreenChange}
                IconComponent={ArrowDownIcon}
                MenuProps={{
                  TransitionComponent: Fade,
                  transitionDuration: 300,
                  PaperProps: {
                    elevation: 6,
                    sx: {
                      backgroundColor: alpha('#1a237e', 0.95),
                      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25), 0 0 15px rgba(0, 0, 0, 0.15)',
                      borderRadius: '12px',
                      mt: 1,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      overflow: 'hidden',
                      maxHeight: '240px', // Set maximum height for dropdown
                      '& .MuiMenuItem-root': {
                        transition: 'all 0.2s ease',
                      },
                      '& ul': {
                        maxHeight: '240px', // Limit the height of the dropdown
                        overflowY: 'auto', // Enable vertical scrolling
                      }
                    }
                  }
                }}
              >
                {screenOptions.map(option => (
                  <MenuItem 
                    key={option.value} 
                    value={option.value} 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      py: 1.8,
                      color: 'white',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        paddingLeft: '20px',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        }
                      }
                    }}
                  >
                    <Typography fontWeight={screenType === option.value ? 600 : 400}>{option.label}</Typography>
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </Box>
        </Fade>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              edge="end"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'rotate(90deg)',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              TransitionComponent={Fade}
              transitionDuration={300}
              PaperProps={{
                elevation: 6,
                sx: {
                  minWidth: '220px',
                  borderRadius: '12px',
                  mt: 1.5,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
                  backgroundColor: alpha('#1a237e', 0.95),
                  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  overflow: 'hidden',
                }
              }}
            >
              <MenuItem 
                onClick={onSave} 
                disabled={isSaving} 
                sx={{ 
                  py: 2,
                  color: 'white',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    paddingLeft: '24px',
                  },
                  opacity: isSaving ? 0.7 : 1
                }}
              >
                {isSaving ? (
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1.5 }} />
                ) : (
                  <SaveIcon fontSize="small" sx={{ mr: 1.5 }} />
                )}
                <Typography fontWeight={500}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Typography>
              </MenuItem>
              <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
              <MenuItem 
                onClick={handleLogout} 
                sx={{ 
                  py: 2,
                  color: 'white',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    paddingLeft: '24px',
                  }
                }}
              >
                <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} />
                <Typography fontWeight={500}>Logout</Typography>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Fade in={true} timeout={1200}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <AnimatedButton
                variant="contained"
                disableElevation
                startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                onClick={onSave}
                disabled={isSaving}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  color: '#1a237e',
                  px: 3,
                  py: 1.2,
                  borderRadius: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 1)',
                  },
                  '&:disabled': {
                    bgcolor: 'rgba(255, 255, 255, 0.5)',
                    color: 'rgba(26, 35, 126, 0.7)',
                  }
                }}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </AnimatedButton>
              
              <AnimatedButton
                variant="outlined"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  borderWidth: '1.5px',
                  px: 2.5,
                  py: 1.2,
                  borderRadius: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.12)',
                    borderColor: 'white',
                    borderWidth: '1.5px',
                  }
                }}
              >
                Logout
              </AnimatedButton>
            </Box>
          </Fade>
        )}
      </Toolbar>
    </AppBar>
  );
};
