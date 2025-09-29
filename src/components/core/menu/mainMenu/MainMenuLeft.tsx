import { FC } from 'react';
import { Link, useRouterState } from 'libs/routing';
import { ReactComponent as LogoDna } from 'assets/logos/dna_logo.svg';
import { getMenuItems } from 'components/core/menu';

export const MainMenuLeft: FC = () => {
  const menuItems = getMenuItems();
  const { pathname } = useRouterState().location;

  const isSamePageLink = (to: string) => {
    if (to === '/') {
      return pathname.startsWith('/strategies') || pathname === '/';
    }
    if (to.startsWith('/trade')) {
      return pathname.startsWith('/trade');
    }
    return pathname.startsWith(to);
  };

  return (
    <nav
      className="flex items-center space-x-24"
      aria-label="Main"
      data-testid="main-nav"
    >
      <Link to="/">
        <LogoDna className="h-32 w-auto text-white" />
      </Link>

      <div className="hidden space-x-24 md:block">
        {menuItems.map(({ label, href, testid }, index) => {
          const isSamePage = isSamePageLink(href);

          return (
            <Link
              key={index}
              to={href}
              aria-current={isSamePage ? 'page' : 'false'}
              data-testid={testid}
              className={`font-title px-3 py-3 transition-colors duration-300 ${
                isSamePage ? 'text-white' : 'hover:text-white'
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
