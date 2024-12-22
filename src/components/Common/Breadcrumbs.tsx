import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

function findStaticRoute(pathname: string): string | undefined {
  for (const staticPath of Object.values(EnumRoutes)) {
    const routeRegex = new RegExp(`^${staticPath.replace(/:\w+/g, '[^/]+')}$`);
    if (routeRegex.test(pathname)) {
      return staticPath;
    }
  }
  return undefined;
}

function capitalize(str: String) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}

export const UtilComponentBreadcrumb: React.FC<BaseFC> = () => {
  let location = useLocation();
  let pathname = location.pathname;
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumbs = paths
    .map((_, index) => {
      const currentPath = `/${paths.slice(0, index + 1).join('/')}`;
      const staticPath = findStaticRoute(currentPath) || currentPath;

      return {
        path: currentPath,
        label: staticPath,
      };
    })
    .filter((item) => !(item.label.indexOf(':') > -1))
    .map((item, index) => ({
      ...item,
      breadcrumb: capitalize(item.path.split('/')[index + 1]),
    }));

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <NavLink to={EnumRoutes.HOME}>Home</NavLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {(breadcrumbs?.length || 0) > 0 &&
            breadcrumbs?.map((item) => (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <NavLink to={item.path} key={item.path}>
                      {item.breadcrumb}
                    </NavLink>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
