import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { navigationData } from '@/config/ConfigNavigation';
import { SidebarItem } from '@/config/ConfigSidebars';
import { useAuth } from '@/hooks/useAuth';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { t } from 'i18next';
import { LogOut } from 'lucide-react';
import { Form } from 'react-router-dom';
import { SidebarNavMain } from './SidebarNavMain';

type SidebarMainProps = React.ComponentProps<typeof Sidebar> & {
  sidebarNavItems: SidebarItem[];
};

export const SidebarMain: React.FC<SidebarMainProps> = ({
  sidebarNavItems,
  ...props
}) => {
  const { isUserVerifyStripeActive } = useAuth();
  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      {...props}
      className={
        isUserVerifyStripeActive
          ? 'top-[calc(var(--header-height)+var(--user-verified-stripe-height))] !h-[calc(100svh-var(--header-height)-var(--user-verified-stripe-height))]'
          : 'top-[--header-height] !h-[calc(100svh-var(--header-height))]'
      }
    >
      <SidebarContent>
        {/* Mobile */}
        <SidebarNavMain className="md:hidden" navItems={navigationData} />
        {/* Desktop */}
        <SidebarNavMain
          className="hidden md:block"
          navItems={sidebarNavItems}
        />
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
