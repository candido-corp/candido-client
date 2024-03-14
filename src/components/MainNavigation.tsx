import { Form, NavLink } from 'react-router-dom';
import { EnumRoutes } from '../models/enums/EnumRoutes';

const MainNavigation = () => {
  return (
    <header>
      <nav>
        <ul className="flex gap-6">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={EnumRoutes.LOGIN}>Login</NavLink>
          </li>
          <li>
            <NavLink to={EnumRoutes.REGISTER}>Register</NavLink>
          </li>
          <li>
            <Form action={EnumRoutes.LOGOUT} method="post">
              <button>Logout</button>
            </Form>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
