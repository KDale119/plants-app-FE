import {useAppSelector, signOut} from "@/state/store";
import {selectCurrentUser} from "@/state/user.reducer";
import {Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, Avatar, AvatarIcon} from "@nextui-org/react";
import {useRouter} from "next/router";

export default function Nav() {
    const router = useRouter();
    const currentUser = useAppSelector(selectCurrentUser);

    return (
        <Navbar maxWidth="full">
            <NavbarContent>
                <NavbarItem>
                    <Link color="foreground" href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/about">
                        About
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/contact">
                        Contact
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarBrand  className="hidden sm:flex gap-4 justify-center">
                <p className="font-bold text-inherit">Kayla&apos;s Garden</p>
            </NavbarBrand>
            <NavbarContent justify="end">
                {!currentUser &&
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Link href="/login">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary" href="/sign-up" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>}
                {currentUser &&
                    <>
                        <NavbarItem className="lg:flex">
                            <Avatar as={Link} href="/profile"
                                    icon={<AvatarIcon />}
                                    classNames={{
                                        base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                                        icon: "text-black/80",
                                    }}/>
                        </NavbarItem>
                        <NavbarItem>
                            <Button color="primary" variant="flat" onPress={ async () => {
                                await signOut();
                                await router.push('/');
                                await router.reload();
                            }}>
                                Sign Out
                            </Button>
                        </NavbarItem>
                    </>}
            </NavbarContent>
        </Navbar>
    );
}