import {
  Sidebar,
  SidebarContent,
  SidebarRail, useSidebar,
} from '@/components/ui/sidebar';
import {SidebarNavMain} from './SidebarNavMain';
import {NavigationPlugin} from "@/config/navigation";
import {EnumNavigationVisibility} from "@/config/navigation/enums/EnumNavigationVisibility.ts";

type SidebarMainProps = React.ComponentProps<typeof Sidebar> & {
  fullNavigationPlugins: NavigationPlugin[];
  currentPlugin?: NavigationPlugin;
  showDesktopSidebar: boolean;
};

export const SidebarMain: React.FC<SidebarMainProps> = (
  {
    fullNavigationPlugins,
    currentPlugin,
    showDesktopSidebar,
    ...props
  }) => {

  const {isMobile} = useSidebar()

  if (!isMobile && !showDesktopSidebar) {
    return null;
  }

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      {...props}
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
    >
      <SidebarContent>
        {/* Mobile: navigation plugins */}
        <SidebarNavMain
          className="md:hidden"
          navItems={fullNavigationPlugins}
          mode={EnumNavigationVisibility.MOBILE}/>

        {/* Desktop: sidebar flat items */}
        <SidebarNavMain
          className="hidden md:block"
          navItems={currentPlugin ? [currentPlugin] : []}
          mode={EnumNavigationVisibility.DESKTOP}
        />
      </SidebarContent>

      <SidebarRail/>
    </Sidebar>
  );
};
