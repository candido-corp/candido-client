import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { BaseFC } from '@/models/interfaces/BaseFC';

const NavMain: React.FC<BaseFC> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <nav className={className}>
      <ul className="flex gap-6">
        <li>
          <NavLink to={EnumRoutes.OPPORTUNITIES}>Opportunities</NavLink>
        </li>
        <li>
          <NavLink to={EnumRoutes.DASHBOARD}>{t('dashboard.title')}</NavLink>
        </li>
        <li>
          <NavLink to={EnumRoutes.BACKPACK}>Documents</NavLink>
        </li>
        {/* <li>
          <NavLink to={EnumRoutes.SETTINGS}>Settings</NavLink>
        </li> */}
      </ul>
    </nav>
  );
};

export default NavMain;
