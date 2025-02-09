import { NavigationItem } from '@/config/ConfigNavigation';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

type NavMainProps = BaseFC & {
  navItems: Pick<NavigationItem, 'title' | 'url' | 'onlySidebar'>[];
};

const NavMain: React.FC<NavMainProps> = ({ navItems, className }) => {
  const { t } = useTranslation();
  return (
    <nav className={className}>
      <ul className="flex gap-6">
        {navItems.map(
          (item) =>
            !item.onlySidebar && (
              <li key={item.title}>
                <NavLink to={item.url}>{item.title}</NavLink>
              </li>
            )
        )}
      </ul>
    </nav>
  );
};

export default NavMain;
