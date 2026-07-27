'use client';

import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';
import {SignInButton, SignUpButton, UserButton, Show, useUser} from '@clerk/nextjs';

const navItems = [
    {label: 'Library', href: '/'},
    {label: 'Add New', href: '/books/new'},
    {label: 'Pricing', href: '/subscriptions'},
];

const Navbar = () => {
    const pathname = usePathname();
    const {user} = useUser();

    console.log(user);

    return (
        <header className="w-full fixed z-50 bg-(--bg-primary)">
            <div className="wrapper navbar-height py-4 flex items-center justify-between">
                <Link href="/" className="flex gap-0.5 items-center">
                    <Image
                        src="/assets/logo.png"
                        alt="Bookified"
                        width={42}
                        height={26}
                    />
                    <span className="logo-text">Bookified</span>
                </Link>

                <nav className="w-fit flex gap-7.5 items-center">
                    {navItems.map(({label, href}) => {
                        const isActive =
                            href === pathname ||
                            (href !== '/' && pathname.startsWith(href));

                        return (
                            <Link
                                key={label}
                                href={href}
                                className={cn(
                                    'nav-link-base',
                                    isActive
                                        ? 'nav-link-active'
                                        : 'text-black hover:opacity-70'
                                )}
                            >
                                {label}
                            </Link>
                        );
                    })}

                    <Show when="signed-out">
                        <SignInButton mode="modal">
                            <button className="nav-link-base text-black hover:opacity-70 cursor-pointer">
                                Sign In
                            </button>
                        </SignInButton>

                        {/*<SignUpButton mode="modal">*/}
                        {/*    <button*/}
                        {/*        className="nav-link-base bg-black text-white px-4 py-2 rounded-md hover:opacity-90 cursor-pointer">*/}
                        {/*        Sign Up*/}
                        {/*    </button>*/}
                        {/*</SignUpButton>*/}
                    </Show>

                    <Show when="signed-in">
                        <div className="flex items-center gap-2">
                            <UserButton/>
                            {
                                user?.firstName &&
                                <Link href="/profile" className="nav-link-base text-black hover:opacity-70">
                                    {user?.firstName}
                                </Link>
                            }
                        </div>
                    </Show>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;