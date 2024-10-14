import Link from "next/link";
import Image from 'next/image';
import { HomeIcon, ShoppingCartIcon, UserGroupIcon, UsersIcon, ChartBarIcon, CogIcon, CreditCardIcon } from '@heroicons/react/outline';

export default function Header() {
    return (
        <>
            {/* Small purple navbar */}
            <div className="bg-purple-800 text-white py-2">
                <div className="container mx-auto px-4">
                    <nav className="flex space-x-4 justify-center" style={{ color: '#301934' }}>
                        <Link href="/home" className="font-semibold">BidBroo@gmail.com</Link>
                        {/* <Link href="/about" className="font-semibold">About</Link>
                        <Link href="/contact" className="font-semibold">Contact</Link> */}
                    </nav>
                </div>
            </div>

            {/* Main header */}
            <header className="bg-white shadow-lg">
                <div className="container mx-auto px-4 py-6 flex flex-col">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-md relative">
                            <Image
                                src="/images/logo.png"
                                alt="Logo"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-md"
                            />
                        </div>
                        <h1 className="text-2xl font-bold"><Link href="/">Hello! Admin</Link></h1>
                    </div>
                    <nav className="flex space-x-4 items-center">
                        <Link href="/adminfro" className="text-purple-800 font-bold text-lg flex items-center space-x-2">
                            <HomeIcon className="w-6 h-6"/>
                            <span>Dashboard</span>
                        </Link>
                        <Link href="/products" className="text-purple-800 font-bold text-lg flex items-center space-x-2">
                            <ShoppingCartIcon className="w-6 h-6"/>
                            <span>Product</span>
                        </Link>
                        <Link href="/sellers" className="text-purple-800 font-bold text-lg flex items-center space-x-2">
                            <UserGroupIcon className="w-6 h-6"/>
                            <span>Sellers</span>
                        </Link>
                        <Link href="/customers" className="text-purple-800 font-bold text-lg flex items-center space-x-2">
                            <UsersIcon className="w-6 h-6"/>
                            <span>Customers</span>
                        </Link>
                        {/* <Link href="/pages/cards" className="text-purple-800 font-bold text-lg flex items-center space-x-2">
                            <ChartBarIcon className="w-6 h-6"/>
                            <span>Analysis</span>
                        </Link> */}
                        <Link href="/pages/changepass" className="text-purple-800 font-bold text-lg flex items-center space-x-2">
                            <CogIcon className="w-6 h-6"/>
                            <span>Settings</span>
                        </Link>
                        <Link href="/payments" className="text-purple-800 font-bold text-lg flex items-center space-x-2">
                            <CreditCardIcon className="w-6 h-6"/>
                            <span>Payments</span>
                        </Link>
                        {/* <input
                            type="text"
                            placeholder="Search..."
                            className="px-4 py-2 border rounded-lg"
                        /> */}
                    </nav>
                </div>
            </header>
        </>
    );
}
