import * as React from 'react';
import { NavMain } from '@/components/Common/AppSidebar/NavMain';
import { NavUser } from '@/components/Common/AppSidebar/NavUser';
import { SiteSwitcher } from '@/components/Common/AppSidebar/SiteSwitcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { sidebarNavData } from './sidebarNavData';

export const AppSidebar: React.FC<React.ComponentProps<typeof Sidebar>> = ({
  ...props
}) => {
  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <SiteSwitcher sites={sidebarNavData.sites} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarNavData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
