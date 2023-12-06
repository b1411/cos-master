import "@/styles/globals.css";
import { initializeParse } from "@parse/react-ssr";
import { ConfigProvider } from "antd";
import ContextProvider from "@/components/Context/index.jsx";
import "animate.css";

import { theme } from "../../themeConfig.js";
import { useEffect } from "react";
import { useRouter } from "next/router.js";
import NextNProgress from "nextjs-progressbar";

initializeParse(
    "https://cosd.b4a.io",
    process.env.NEXT_PUBLIC_PARSE_APP_ID,
    process.env.NEXT_PUBLIC_PARSE_JS_KEY,
);

export default function App({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    const router = useRouter();
    

    useEffect(() => {
        let curUser = Parse.User.current();
        if (!curUser?.isCurrent()) {
            router.push("/login");
        }
    }, []);

    return getLayout(
        <ContextProvider>
            <NextNProgress color="#00664F" options={{ showSpinner: false }} />
            <ConfigProvider theme={theme}>
                <Component {...pageProps} />
            </ConfigProvider>
        </ContextProvider>,
    );
}
