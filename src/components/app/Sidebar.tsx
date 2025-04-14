import { useState } from 'react';
import {
    ChevronRight,
    Calendar,
    User2,
    Settings,
    Plus,
} from 'lucide-react';
import NavItem from './NavItem';

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`h-screen bg-black transition-all duration-300 flex flex-col ${isCollapsed ? 'w-16' : 'w-64'}`}>
            {/* Navigation Items */}
            <div className="flex-1 py-2">
                <NavItem
                    icon={<ChevronRight className={`w-5 h-5 transition-transform ${!isCollapsed ? 'rotate-180' : ''}`} />}
                    label="Collapse"
                    isCollapsed={isCollapsed}
                    onClick={toggleCollapse}
                />
                <NavItem
                    icon={<Plus className="w-5 h-5" />}
                    label="New"
                    isCollapsed={isCollapsed}
                />
                <NavItem
                    icon={<Calendar className="w-5 h-5" />}
                    label="Calendar"
                    isCollapsed={isCollapsed}
                />
                <NavItem
                    icon={<User2 className="w-5 h-5" />}
                    label="Profile"
                    isCollapsed={isCollapsed}
                />
                <NavItem
                    icon={<Settings className="w-5 h-5" />}
                    label="Settings"
                    isCollapsed={isCollapsed}
                />
            </div>
        </div>
    );
} 