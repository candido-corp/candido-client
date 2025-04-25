import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from '@/components/ui/sidebar';
import {SidebarNavMain} from './SidebarNavMain';
import {NavigationPlugin} from "@/config/navigation";
import {EnumNavigationVisibility} from "@/config/navigation/enums/EnumNavigationVisibility.ts";
import {cn} from "@/utils/shadcn.ts";

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

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      {...props}
      className={cn(
        "top-[--header-height] !h-[calc(100svh-var(--header-height))]",
        showDesktopSidebar ? "md:block" : "md:hidden"
      )}
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
