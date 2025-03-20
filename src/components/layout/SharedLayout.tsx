import { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Header } from './Header';
import { SignInCustomize } from '../../pages/SignInCustomize';
import { SignUpCustomize } from '../../pages/SignUpCustomize';
import { ForgetPwCustomize } from '../../pages/ForgetPwCustomize';
import { CheckInCustomize } from '../../pages/CheckInCustomize';
import { ScreenType } from '../../types';
import { FirstloadCustomize } from '../../pages/FirstloadCustomize';
import { SynvaultCustomize } from '../../pages/SynvaultCustomize';
import { SynGamesCustomize } from '../../pages/SynGamesCustomize';
import { JoinGameCustomize } from '../../pages/JoinGameCustomize';
import { JoinSynGamePopUpCustomize } from '../../pages/JoinSynGamePopUpCustomize';
import { SynGamePopUpCustomize } from '../../pages/SynGamePopUpCustomize';
import { RankUpRewardCustomize } from '../../pages/RankUpRewardCustomize';
import { RankupPercentageCustomize } from '../../pages/RankupPercentageCustomize';
import { TopNavbarCustomize } from '../../pages/TopNavbarCustomize';
import { PlayerProfileCustomize } from '../../pages/PlayerProfileCustomize';
import { ChangeCharacterCustomize } from '../../pages/ChangeCharacterCustomize';
import { LeadershipBoardCustomize } from '../../pages/LeadershipBoardCustomize';
import { LinkEmailCustomize } from '../../pages/LinkEmailCustomize';
import { InboxCustomize } from '../../pages/InboxCustomize';
import { DailyRewardCustomize } from '../../pages/DailyRewardCustomize';
import { SeasonCustomize } from '../../pages/SeasonCustomize';
import { EarnSynPointCustomize } from '../../pages/EarnSynPointCustomize';
import { HistoryCustomize } from '../../pages/HistoryCustomize';
import { ChangeSettingCustomize } from '../../pages/ChangeSettingCustomize';
import { BottomNabvarCustomize } from '../../pages/BottomNabvarCustomize';

const screens = [
  { type: 'signin', component: SignInCustomize, id: 'signin-customize-component' },
  { type: 'signup', component: SignUpCustomize, id: 'signup-customize-component' },
  { type: 'forgetPw', component: ForgetPwCustomize, id: 'forget-customize-component' },
  { type: 'checkin', component: CheckInCustomize, id: 'checkin-customize-component' },
  { type: 'firstload', component: FirstloadCustomize, id: 'firstload-customize-component' },
  { type: 'synvault', component: SynvaultCustomize, id: 'synvault-customize-component' },
  { type: 'syngames', component: SynGamesCustomize, id: 'syngames-customize-component' },
  { type: 'joingame', component: JoinGameCustomize, id: 'joingame-customize-component' },
  { type: 'joinsyngamepopup', component: JoinSynGamePopUpCustomize, id: 'joinsyngamepopup-customize-component' },
  { type: 'syngamepopup', component: SynGamePopUpCustomize, id: 'syngamepopup-customize-component' },
  { type: 'rankuprewards', component: RankUpRewardCustomize, id: 'rankuprewards-customize-component' },
  { type: 'rankuppercentage', component: RankupPercentageCustomize, id: 'rankuppercentage-customize-component' },
  { type: 'topnavbar', component: TopNavbarCustomize, id: 'topnavbar-customize-component' },
  { type: 'playerprofile', component: PlayerProfileCustomize, id: 'playerprofile-customize-component' },
  { type: 'changecharacter', component: ChangeCharacterCustomize, id: 'changecharacter-customize-component' },
  { type: 'leadershipboard', component: LeadershipBoardCustomize, id: 'leadershipboard-customize-component' },
  { type: 'linkemail', component: LinkEmailCustomize, id: 'linkemail-customize-component' },
  { type: 'inbox', component: InboxCustomize, id: 'inbox-customize-component' },
  { type: 'dailyrewards', component: DailyRewardCustomize, id: 'dailyrewards-customize-component' },
  { type: 'seasons', component: SeasonCustomize, id: 'seasons-customize-component' },
  { type: 'earnsynpoints', component: EarnSynPointCustomize, id: 'earnsynpoints-customize-component' },
  { type: 'history', component: HistoryCustomize, id: 'history-customize-component' },
  { type: 'changeSettings', component: ChangeSettingCustomize, id: 'changeSettings-customize-component' },
  { type: 'bottomNavbar', component: BottomNabvarCustomize, id: 'bottomNavbar-customize-component' },
];

export const SharedLayout = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('signin');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const currentScreenObj = screens.find(screen => screen.type === currentScreen);
      if (currentScreenObj === undefined) return;
      else {
        const screenElement = document.getElementById(currentScreenObj.id);
        if (screenElement && (screenElement as any).__saveScreen) {
          await (screenElement as any).__saveScreen();
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
        {screens.map(screen => (
          <Box
            key={screen.type}
            sx={{
              display: currentScreen === screen.type ? 'block' : 'none',
              width: '100%'
            }}
          >
            <screen.component id={screen.id} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
