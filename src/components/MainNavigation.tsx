import { Form, NavLink } from 'react-router-dom';
import { EnumRoutes } from '../models/enums/EnumRoutes';
import { useTranslation } from 'react-i18next';

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
            <NavLink to={EnumRoutes.ACCOUNT}>{t('my_account.title')}</NavLink>
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
