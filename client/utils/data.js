import { LayoutDashboard, LuHandIcons, LuWalletMinimal, LuLogOut } from 'react-icons/lu';

export const sidebarData = [
    {
         id: 1,
         label: 'Dashboard',
            icon: <LayoutDashboard />,
            link: '/dashboard'
    },
    {
         id: 2,
         label: 'Income',
            icon: <LuHandIcons />,
            link: '/hand-icons'
    },
    {
         id: 3,
         label: 'Wallet Minimal',
            icon: <LuWalletMinimal />,
            link: '/wallet-minimal'
    },
    {
         id: 4,
         label: 'Log Out',
            icon: <LuLogOut />,
            link: '/logout'
    }