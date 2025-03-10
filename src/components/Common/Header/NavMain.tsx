import { NavigationItem } from '@/config/ConfigNavigation';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { NavLink } from 'react-router-dom';

type NavMainProps = BaseFC & {
  navItems: Pick<NavigationItem, 'title' | 'url' | 'onlySidebar'>[];
};

const NavMain: React.FC<NavMainProps> = ({ navItems, className }) => {
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
