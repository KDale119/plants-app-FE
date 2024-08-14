import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NextUIProvider, Link, Button, Divider} from "@nextui-org/react";
import getStore from "@/state/store";
import {Provider} from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
    const store = getStore();
    return(
        <Provider store={store}>
            <NextUIProvider>
                <main className="dark text-foreground bg-background">
                    <Navbar maxWidth="full">
                        <NavbarContent>
                            <NavbarItem>
                                <Link color="foreground" href="/">
                                    Home
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link color="foreground" href="#">
                                    About
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link color="foreground" href="#">
                                    Contact
                                </Link>
                            </NavbarItem>
                        </NavbarContent>
                        <NavbarBrand  className="hidden sm:flex gap-4 justify-center" justify="center">
                            <p className="font-bold text-inherit">Kayla's Garden</p>
                        </NavbarBrand>
                        <NavbarContent justify="end">
                            <NavbarItem className="hidden lg:flex">
                                <Link href="/login">Login</Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Button as={Link} color="primary" href="/sign-up" variant="flat">
                                    Sign Up
                                </Button>
                            </NavbarItem>
                        </NavbarContent>
                    </Navbar>
                    <Divider className="my-4 h-4 bg-green-500" />
                  <Component {...pageProps} />
                </main>
            </NextUIProvider>
        </Provider>);
}
