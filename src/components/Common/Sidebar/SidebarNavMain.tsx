import {
  SidebarGroup,
  SidebarMenu,
} from '@/components/ui/sidebar';
import {buildPluginNavTree, NavigationPlugin, NavItem} from '@/config/navigation';
import {BaseFC} from '@/models/interfaces/BaseFC';
import {SidebarTree} from './SidebarTree';
import {EnumNavigationVisibility} from "@/config/navigation/enums/EnumNavigationVisibility.ts";

type NavProps = BaseFC & {
  navItems: NavigationPlugin[];
  mode: EnumNavigationVisibility.DESKTOP
    | EnumNavigationVisibility.MOBILE;
};

const SidebarMenuMobile = ({items}: { items: NavItem[] }) => {
  return items.map((item) => (
    <SidebarTree key={item!.id} collapsibleItem={item!}/>
  ))
}

const SidebarMenuDesktop = ({items}: { items: NavItem[] }) => {
  return items.map((item) => (
    item.children?.map((subItem) => (
      <SidebarTree key={subItem!.id} collapsibleItem={subItem!}/>
    ))
  ))
}

export const SidebarNavMain: React.FC<NavProps> = ({navItems, className, mode}) => {
  const navItemsFiltered = navItems
    .map((plugin) => buildPluginNavTree(plugin))
    .filter(Boolean)
    .filter((item): item is NavItem => item !== undefined);

  return (
    <SidebarGroup className={className}>
      <SidebarMenu>
        {mode === EnumNavigationVisibility.DESKTOP ?
          <SidebarMenuDesktop items={navItemsFiltered}/> :
          <SidebarMenuMobile items={navItemsFiltered}/>
        }
      </SidebarMenu>
    </SidebarGroup>
  );
};
