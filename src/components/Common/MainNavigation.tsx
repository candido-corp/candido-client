import { Form, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EnumRoutes } from '@/models/enums/EnumRoutes';

const MainNavigation = () => {
  const { t } = useTranslation();
  return (
    <header>
      <nav>
        <ul className="flex gap-6">
          <li>
            <NavLink to={EnumRoutes.HOME} end>
              {t('homepage.title')}
            </NavLink>
          </li>
          <li>
            <NavLink to={EnumRoutes.DASHBOARD}>{t('dashboard.title')}</NavLink>
          </li>
          <li>
            <NavLink to={EnumRoutes.USER}>{t('user.title')}</NavLink>
          </li>
          <li>
            <NavLink to={EnumRoutes.SETTINGS}>{'Settings'}</NavLink>
          </li>
          <li>
            <NavLink to={EnumRoutes.LOGIN}>{t('login.title')}</NavLink>
          </li>
          <li>
            <NavLink to={EnumRoutes.REGISTER}>{t('register.title')}</NavLink>
          </li>
          <li>
            <Form action={EnumRoutes.LOGOUT} method="post">
              <button>{t('logout.title')}</button>
            </Form>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
