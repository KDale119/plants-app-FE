import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {NextUIProvider, Divider, Navbar, NavbarContent, NavbarItem, Link, NavbarBrand, Button} from "@nextui-org/react";
import getStore, {persistor} from "@/state/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
    const store = getStore();
    return(
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <QueryClientProvider client={queryClient}>
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
                </QueryClientProvider>
            </PersistGate>
        </Provider>);
}
