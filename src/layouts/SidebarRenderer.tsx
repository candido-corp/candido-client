import { NavItem } from '@/config/navigation/types';
import { Link } from 'react-router-dom';

/**
 * Recursively renders a sidebar tree.
 */
export const SidebarRenderer = ({ items }: { items: NavItem[] }) => (
    <ul>
        {items.map((item) => (
            <li key={item.id} className="ml-2">
                <Link to={item.url ?? '#'}>{item.title}</Link>
                {item.children && <SidebarRenderer items={item.children} />}
            </li>
        ))}
    </ul>
);
