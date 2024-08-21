import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider, Divider} from "@nextui-org/react";
import getStore, {persistor} from "@/state/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import Nav from "@/componenets/nav";

export default function App({ Component, pageProps }: AppProps) {
    const store = getStore();
    return(
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <NextUIProvider>
                    <main className="dark text-foreground bg-background">
                        <Nav />
                        <Divider className="my-4 h-4 bg-green-500" />
                      <Component {...pageProps} />
                    </main>
                </NextUIProvider>
            </PersistGate>
        </Provider>);
}
