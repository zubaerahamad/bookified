import Link from "next/link";
import Image from "next/image";


const navItems = [
    { label: "Library", href: "/" },
    { label: "Add New", href: "/books/new" },
    { label: "Pricing", href: "/subscriptions" },
]

const Navbar = () => {
    return (
        <header className="w-full fixed z-50 bg-(--bg-primary)">
            <div className="wrapper navbar-height py-4 flex items-center justify-between">
                <Link href="/" className="flex gap-0.5 items-center">
                    <Image src="/assets/logo.png" alt="Bookified" width={42} height={26} />
                    <span className="logo-text">Bookified</span>
                </Link>

                <nav className="w-fit flex gap-7.5 items-center">
                    {navItems.map(({ label, href}) => (
                        <Link key={href} href={href} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;