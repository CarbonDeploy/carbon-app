import { OpenOceanWidget } from '@openocean.finance/widget';
import { WidgetConfig } from '@openocean.finance/widget/dist/esm/types/widget';
import './root.css';
import { useWagmi } from 'libs/wagmi';

export const SwapPage = () => {
  const { openConnect } = useWagmi();
  const widgetConfig: WidgetConfig = {
    integrator: 'DNA',
    variant: 'compact',
    subvariant: 'split',
    appearance: 'dark',
    referrer: {
      address: '0x2157A23bB2A40bcE7A6678Cb853fCb49f858b418',
      fee: '0.25',
    },
    slippage: 0.01,
    theme: {
      palette: {
        primary: {
          main: '#5FF0CC',
        },
        secondary: {
          main: '#82D4FF',
        },
        background: {
          default: 'rgba(0, 0, 0, 0)',
          paper: 'rgb(17, 31, 36)',
        },
        text: {
          primary: '#FFFFFF',
          secondary: 'rgba(255, 255, 255, 0.64)',
        },
        grey: {
          200: 'rgba(255, 255, 255, 0.08)',
          300: 'rgba(255, 255, 255, 0.16)',
          700: 'rgba(255, 255, 255, 0.32)',
          800: 'rgba(255, 255, 255, 0.48)',
        },
      },
      shape: {
        borderRadius: 16,
        borderRadiusSecondary: 16,
        borderRadiusTertiary: 24,
      },
      typography: {
        fontFamily: 'Carbon-Text, Carbon-Title, system-ui, sans-serif',
      },
      container: {
        background: 'transparent',
        borderRadius: 'inherit',
        border: 'none',
        boxShadow: 'none',
      },
      components: {
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: 'rgba(12, 15, 25, 0.4)',
              border: '1px solid transparent',
              boxShadow: 'inset 0 0 10px rgba(12, 15, 25, 1)',
            },
          },
        },
        MuiInputCard: {},
        MuiTabs: {
          styleOverrides: {
            root: {
              minHeight: 0,
              padding: 0,
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: '999px',
              textTransform: 'none',
            },
          },
        },
        MuiTypography: {
          styleOverrides: {
            root: {
              color: 'inherit',
              fontFamily: 'Carbon-Text, system-ui, sans-serif',
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            },
          },
        },
      },
    },
    walletConfig: {
      onConnect: () => {
        openConnect();
      },
      usePartialWalletManagement: true,
    },
    chains: {
      allow: [
        1, 56, 1151111081099710, 42161, 10, 324, 137, 43114, 250, 146, 80094,
        8453, 59144, 534352, 81457, 34443, 5000, 130, 999, 14, 1923, 169, 1101,
        40, 100, 30, 2222, 1329, 1088, 204, 42220, 1625, 33139, 25, 1313161554,
        1285, 1666600000, 10143, 999, 9745, 98866, 239, 20000000000001,
      ],
    },
    defaultChain: 56,
    defaultFromToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    defaultToToken: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  };
  return (
    <div className="swap-widget mx-auto flex w-full justify-center py-16 px-16 md:py-32 md:px-0">
      <div className="overflow-hidden rounded-2xl surface border border-white/20 w-full max-w-[520px]">
        <div className="p-12 md:p-24">
          <OpenOceanWidget integrator="DNA" config={widgetConfig} />
        </div>
      </div>
    </div>
  );
};
