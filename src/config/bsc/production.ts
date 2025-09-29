import { AppConfig } from '../types';
import { commonConfig } from './common';

const config: AppConfig = {
  ...commonConfig,
  mode: 'production',
  network: {
    ...commonConfig.network,
  },
};

export default config;
