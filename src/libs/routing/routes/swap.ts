import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './root';
import { SwapPage } from 'pages/swap/root';

export const swapPage = createRoute({
  getParentRoute: () => rootRoute,
  path: '/swap',
  component: SwapPage,
});
