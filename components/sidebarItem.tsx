import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
    icon: IconType,
    label: string,
    active?: boolean,
    href: string,
}



const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,label,active,href,
}) => {
    return ( 
        <Link href={href} className={twMerge(`
            flex flex-row h-auto item-center w-full gap-x-4 
            text-md font-medium cursor-pointer 
            text-zinc-900 hover:text-orange-500
            transition py-1
        `,
        active && "text-orange-500"
        )}>
            <Icon size={26} />
            <p className="truncate w-full">{label}</p>
        </Link>
     );
}
 
export default SidebarItem;
