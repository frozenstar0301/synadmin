// src/components/layout/SharedLayout.tsx
import { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Header } from './Header';
import { SignInCustomize } from '../../pages/SignInCustomize';
import { SignUpCustomize } from '../../pages/SignUpCustomize';

type ScreenType = 'signin' | 'signup';

export const SharedLayout = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('signin');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Call the appropriate save function based on current screen
    try {
      if (currentScreen === 'signin') {
        // Call signin save function
        // We'll need to expose this from the SignInCustomize component
        const signinElement = document.getElementById('signin-customize-component');
        if (signinElement && (signinElement as any).__saveScreen) {
          await (signinElement as any).__saveScreen();
        }
      } else {
        // Call signup save function
        const signupElement = document.getElementById('signup-customize-component');
        if (signupElement && (signupElement as any).__saveScreen) {
          await (signupElement as any).__saveScreen();
        }
      }
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleScreenTypeChange = (screenType: ScreenType) => {
    setCurrentScreen(screenType);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header 
        onSave={handleSave}
        isSaving={isSaving}
        screenType={currentScreen}
        onScreenTypeChange={handleScreenTypeChange}
      />
      <Toolbar />
      
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Render the appropriate component based on currentScreen */}
        <Box 
          sx={{ 
            display: currentScreen === 'signin' ? 'block' : 'none',
            width: '100%'
          }}
        >
          <SignInCustomize id="signin-customize-component" />
        </Box>
        <Box 
          sx={{ 
            display: currentScreen === 'signup' ? 'block' : 'none',
            width: '100%'
          }}
        >
          <SignUpCustomize id="signup-customize-component" />
        </Box>
      </Box>
    </Box>
  );
};