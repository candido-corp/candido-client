import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/components/ui/sidebar';
import { SidebarItem } from '@/config/ConfigSidebars';
import _ from 'lodash';
import { ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

type SidebarTreeProps = {
  collapsibleItem: SidebarItem;
};

export const SidebarTree: React.FC<SidebarTreeProps> = ({
  collapsibleItem,
}) => {
  if (_.isEmpty(collapsibleItem.items)) {
    return (
      <SidebarMenuButton
        isActive={collapsibleItem.isActive}
        className="data-[active=true]:bg-transparent"
        size={'lg'}
      >
        {collapsibleItem.url ? (
          <NavLink
            to={collapsibleItem.url}
            className={collapsibleItem.className}
          >
            <span>{collapsibleItem.title}</span>
          </NavLink>
        ) : (
          <span>{collapsibleItem.title}</span>
        )}
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        defaultOpen={collapsibleItem.isActive}
        className="group/collapsible [&[data-state=open]>button>svg:last-child]:rotate-90"
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            isActive={collapsibleItem.isActive}
            size={'lg'}
            tooltip={collapsibleItem.title}
            className={collapsibleItem.className}
          >
            {collapsibleItem.icon && <collapsibleItem.icon />}
            <span>{collapsibleItem.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {collapsibleItem.items?.map((subItem, index) => (
              <SidebarTree key={index} collapsibleItem={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};
