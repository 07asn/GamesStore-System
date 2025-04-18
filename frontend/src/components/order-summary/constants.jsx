export const COLORS = {
    gold: '#DFBF00',
    brightGold: '#FFDF00',
    darkGold: '#C1A811',
    goldGradient: 'linear-gradient(135deg, #FFDF00, #C1A811)',
    black: '#000000',
    lightGray: '#F0F0F0',
    mediumGray: '#636362',
    darkGray: '#2A2A2A',
    offWhite: '#FAFAFA',
    glowGold: '0 0 15px rgba(223, 191, 0, 0.5)',
    cardShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
    platformColors: {
      steam: '#004cff',
      rockstar: '#fcaf17',
      origin: '#f56c2d',
      epic: '#2a2a2a',
      ubisoft: '#7600ad',
      microsoft: '#107c10',
      nintendo: '#e60012',
      battle: '#00aeff'
    }
  };
  
  export const PlatformIcons = {
    steam: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.029 4.524 4.524s-2.03 4.524-4.524 4.524c-.135 0-.268-.007-.399-.019l-4.12 3.494c.004.06.015.118.015.18 0 1.455-1.164 2.629-2.62 2.629-1.455 0-2.628-1.174-2.628-2.629 0-1.456 1.173-2.629 2.628-2.629.038 0 .075.003.112.006l3.666-3.363v-.058c0-1.34-1.087-2.427-2.426-2.427-1.339 0-2.426 1.087-2.426 2.427 0 1.339 1.087 2.427 2.426 2.427.258 0 .508-.04.741-.115l-2.772 2.168c-.649.508-1.06 1.297-1.06 2.165 0 1.456 1.164 2.628 2.62 2.628 1.457 0 2.63-1.172 2.63-2.628 0-.068-.01-.134-.015-.202l7.083-3.744C23.144 19.205 23.571 16.27 23.965 12H11.979V0z" />
      </svg>
    ),
    rockstar: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.5-10.5v-1h1v1h1.5v1h-1v1h-1v-1h-1v-1h1zm6 0v-1h1v1h1.5v1h-1v1h-1v-1h-1v-1h1z" />
      </svg>
    ),
    origin: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2-11v2h4v-2h-4zm0-4v6h4V7h-4z" />
      </svg>
    ),
    epic: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11V7h2v4h4v2h-4v4h-2v-4H7v-2h4z" />
      </svg>
    ),
    ubisoft: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v2h4v-2h-4zm0-4v6h4V7h-4z" />
      </svg>
    ),
    microsoft: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M11 11V3h2v8h8v2h-8v8h-2v-8H3v-2h8z" />
      </svg>
    ),
    nintendo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v2h4v-2h-4zm0-4v6h4V7h-4z" />
      </svg>
    ),
    battle: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v2h4v-2h-4zm0-4v6h4V7h-4z" />
      </svg>
    )
  };
  
  export const PLATFORMS = [
    {
      id: 'steam',
      name: 'Steam',
      icon: PlatformIcons.steam,
      color: COLORS.platformColors.steam,
      steps: [
        'Open the Steam client on your computer',
        'Click on "Games" in the top menu',
        'Select "Activate a Product on Steam..."',
        'Follow the on-screen instructions',
        'Enter your product key when prompted',
        'The game will be added to your library once activation is complete'
      ],
      tips: [
        'Make sure your Steam client is up to date',
        'If activation fails, try restarting Steam',
        'Some region-locked keys may require a VPN to activate'
      ],
      supportUrl: 'https://help.steampowered.com'
    },
    {
      id: 'rockstar',
      name: 'Rockstar Games',
      icon: PlatformIcons.rockstar,
      color: COLORS.platformColors.rockstar,
      steps: [
        'Go to the Rockstar Games Launcher',
        'Click on "Settings" in the left sidebar',
        'Select "Account Information"',
        'Click on "Redeem Code"',
        'Enter your product key and click "Redeem"',
        'The game will begin downloading automatically'
      ],
      tips: [
        'Make sure to have enough disk space before installation',
        'Some Rockstar games require the Social Club to be installed',
        'If the key is rejected, ensure you\'re entering it correctly including any hyphens'
      ],
      supportUrl: 'https://support.rockstargames.com'
    },
    {
      id: 'origin',
      name: 'EA App / Origin',
      icon: PlatformIcons.origin,
      color: COLORS.platformColors.origin,
      steps: [
        'Open the EA app or Origin client',
        'Click on "EA" or "Origin" in the top menu',
        'Select "Redeem Product Code"',
        'Enter your product key in the provided field',
        'Click "Next" and confirm your redemption',
        'The game will be added to your library'
      ],
      tips: [
        'EA is transitioning from Origin to the EA App',
        'Some older keys may need to be redeemed on the EA website',
        'If activation fails, check your internet connection and try again'
      ],
      supportUrl: 'https://help.ea.com'
    },
    {
      id: 'epic',
      name: 'Epic Games',
      icon: PlatformIcons.epic,
      color: COLORS.platformColors.epic,
      steps: [
        'Launch the Epic Games Launcher',
        'Click on your account name in the bottom left',
        'Select "Redeem Code"',
        'Enter your product key and click "Redeem"',
        'Once redeemed, the game will appear in your library',
        'Download and install the game from your library'
      ],
      tips: [
        'Some keys require specific regional settings',
        'Make sure your Epic account region matches the key region',
        'Epic Games Launcher must be updated to its latest version'
      ],
      supportUrl: 'https://www.epicgames.com/help'
    },
    {
      id: 'ubisoft',
      name: 'Ubisoft Connect',
      icon: PlatformIcons.ubisoft,
      color: COLORS.platformColors.ubisoft,
      steps: [
        'Open Ubisoft Connect on your PC',
        'Click on the menu icon (hamburger) in the top left',
        'Select "Activate Product"',
        'Enter your activation code and click "Activate"',
        'The game will be added to your games library',
        'Install the game from your library'
      ],
      tips: [
        'Ubisoft Connect was formerly known as Uplay',
        'Some Ubisoft games activated on Steam still require Ubisoft Connect',
        'Make sure to link your accounts for cross-platform progression'
      ],
      supportUrl: 'https://support.ubisoft.com'
    },
    {
      id: 'microsoft',
      name: 'Microsoft Store',
      icon: PlatformIcons.microsoft,
      color: COLORS.platformColors.microsoft,
      steps: [
        'Open the Microsoft Store app on your Windows PC',
        'Click on the three dots (…) in the top-right corner',
        'Select "Redeem a code"',
        'Enter your 25-character product key',
        'Click "Next" and follow the prompts to complete redemption',
        'The game will be available in your library to download'
      ],
      tips: [
        'Xbox Game Pass codes use the same redemption process',
        'Some Microsoft Store games can be played on both PC and Xbox',
        'Make sure you\'re signed in with the correct Microsoft account'
      ],
      supportUrl: 'https://support.microsoft.com/games'
    },
    {
      id: 'nintendo',
      name: 'Nintendo eShop',
      icon: PlatformIcons.nintendo,
      color: COLORS.platformColors.nintendo,
      steps: [
        'Open the Nintendo eShop on your Nintendo Switch',
        'Select your account profile',
        'Scroll down and select "Redeem Code" at the bottom',
        'Enter your 16-character download code',
        'Select "Confirm" to verify your code',
        'The game will begin downloading to your console'
      ],
      tips: [
        'Ensure your Nintendo Switch is connected to the internet',
        'Check that you have enough storage space for the download',
        'Some codes are region-specific and match your eShop region'
      ],
      supportUrl: 'https://en-americas-support.nintendo.com'
    },
    {
      id: 'battle',
      name: 'Battle.net',
      icon: PlatformIcons.battle,
      color: COLORS.platformColors.battle,
      steps: [
        'Open the Battle.net desktop app',
        'Click your account name in the top-right corner',
        'Select "Account Settings" from the dropdown menu',
        'Select "Games & Subscriptions" from the menu',
        'Click "Redeem a Code" and enter your product key',
        'The game will be added to your Battle.net library'
      ],
      tips: [
        'Blizzard codes are typically 12 characters long',
        'Case sensitivity doesn\'t matter when entering the code',
        'If activation fails, try logging out and back into Battle.net'
      ],
      supportUrl: 'https://support.battle.net'
    }
  ];