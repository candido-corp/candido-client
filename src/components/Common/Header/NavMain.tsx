import { NavLink } from 'react-router-dom';
import {FlatNavItem} from "@/config/navigation";

interface NavMainProps {
  navItems: FlatNavItem[];
  className?: string;
}

// Function to determine the active class based on the NavLink's state
const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'text-primary' : '';

const NavMain: React.FC<NavMainProps> = ({ navItems, className }) => {
  return (
    <nav className={className}>
      <ul className="flex gap-8">
        {navItems
          .filter((item) => {
            if (typeof item.visible === 'function') return item.visible();
            if (typeof item.visible === 'boolean') return item.visible;
            return true;
          })
          .map((item) => (
            <li key={item.id}>
              <NavLink to={item.url} className={getNavLinkClass} end>
                {item.title}
              </NavLink>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default NavMain;
