import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SidebarItem } from '@/config/ConfigSidebars';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { cn } from '@/utils/shadcn';
import { t } from 'i18next';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import { SidebarTree } from './SidebarTree';

type NavProps = BaseFC & {
  navItems: SidebarItem[];
};

export const SidebarNavMain: React.FC<NavProps> = ({ navItems, className }) => {
  return (
    <SidebarGroup className={className}>
      <SidebarMenu>
        {navItems.map((item, index) =>
          item.items && !_.isEmpty(item.items) ? (
            <SidebarTree key={index} collapsibleItem={item} />
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                isActive={item.isActive}
                size={'lg'}
                className={cn(
                  item.className,
                  'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                )}
                tooltip={t('user.user')}
                asChild
              >
                {item.url && (
                  <NavLink to={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </NavLink>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
};
