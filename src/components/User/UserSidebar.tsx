import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { t } from 'i18next';
import { LogOut } from 'lucide-react';
import * as React from 'react';
import { Form } from 'react-router-dom';
import { NavMain } from './UserNavMain';
import { userSidebarData } from './userSidebarData';

export const UserSidebar: React.FC<React.ComponentProps<typeof Sidebar>> = ({
  ...props
}) => {
  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      {...props}
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
    >
      <SidebarContent>
        <NavMain navItems={userSidebarData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Form action={EnumRoutes.LOGOUT} method="post" className="w-full">
              <SidebarMenuButton
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                tooltip={t('logout.title')}
              >
                <LogOut />
                <span>{t('logout.title')}</span>
              </SidebarMenuButton>
            </Form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
