import { UtilComponentBreadcrumb } from '@/components/Common/Breadcrumbs';
import Header from '@/components/Common/Header/Header';
import { SidebarMain } from '@/components/Common/Sidebar/SidebarMain';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SidebarItem } from '@/config/ConfigSidebars';
import { BaseFC } from '@/models/interfaces/BaseFC';

type SidebarLayoutProps = BaseFC & {
  sidebarNavItems: SidebarItem[];
};

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  sidebarNavItems,
  children,
}) => {
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <Header />
        <div className="flex flex-1">
          <SidebarMain sidebarNavItems={sidebarNavItems} />
          <SidebarInset>
            <div className="container flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2">
                <UtilComponentBreadcrumb />
              </div>
            </div>
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default SidebarLayout;
