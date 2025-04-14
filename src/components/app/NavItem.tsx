import { ChevronRight, ChevronDown } from "lucide-react";

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    isExpanded?: boolean;
    hasChildren?: boolean;
    onClick?: () => void;
    isCollapsed?: boolean;
}

const NavItem = ({ icon, label, isExpanded, hasChildren, onClick, isCollapsed }: NavItemProps) => (
    <button
        onClick={onClick}
        className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2 text-sm text-white hover:bg-gray-700 rounded-md transition-colors ${isExpanded ? 'bg-gray-100' : ''}`}
    >
        <div className="min-w-[24px]">{icon}</div>
        {!isCollapsed && (
            <>
                <span className="flex-1 text-left whitespace-nowrap">{label}</span>
                {hasChildren && (
                    isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                )}
            </>
        )}
    </button>
);

export default NavItem;