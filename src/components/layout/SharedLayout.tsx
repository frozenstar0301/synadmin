// src/components/layout/SharedLayout.tsx
import { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Header } from './Header';
import { SignInCustomize } from '../../pages/SignInCustomize';
import { SignUpCustomize } from '../../pages/SignUpCustomize';
import { ForgetPwCustomize } from '../../pages/ForgetPwCustomize';
import { CheckInCustomize } from '../../pages/CheckInCustomize';

type ScreenType = 'signin' | 'signup' | 'forgetPw' | 'checkin';

export const SharedLayout = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('signin');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Call the appropriate save function based on current screen
    try {
      switch (currentScreen) {
        case 'signin':
          const signinElement = document.getElementById('signin-customize-component');
          if (signinElement && (signinElement as any).__saveScreen) {
            await (signinElement as any).__saveScreen();
          }
          break;
        case 'signup':
          const signupElement = document.getElementById('signin-customize-component');
          if (signupElement && (signupElement as any).__saveScreen) {
            await (signupElement as any).__saveScreen();
          }
          break;
        case 'forgetPw':
          const forgetPwElement = document.getElementById('forget-customize-component');
          if (forgetPwElement && (forgetPwElement as any).__saveScreen) {
            await (forgetPwElement as any).__saveScreen();
          }
          break;
        case 'checkin':
          const checkinElement = document.getElementById('checkin-customize-component');
          if (checkinElement && (checkinElement as any).__saveScreen) {
            await (checkinElement as any).__saveScreen();
          }
          break;
        default:
          break;
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
        <Box
          sx={{
            display: currentScreen === 'forgetPw' ? 'block' : 'none',
            width: '100%'
          }}
        >
          <ForgetPwCustomize id="forget-customize-component" />
        </Box>
        <Box
          sx={{
            display: currentScreen === 'checkin' ? 'block' : 'none',
            width: '100%'
          }}
        >
          <CheckInCustomize id="checkin-customize-component" />
        </Box>
      </Box>
    </Box>
  );
};