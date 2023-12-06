import Document, { Html, Head, Main, NextScript } from "next/document";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";

export default function MyDocument() {
    return (
        <Html lang="ru">
            <Head>
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="theme-color" content="#00664F" />
                <meta
                    name="description"
                    content="Центр оказания сервиса университета Международного бизнеса имени Кенжегали Сагадиева"
                />
                <meta
                    name="keywords"
                    content="UIB, УМБ, МБУ, Международный бизнес, Кенжегали Сагадиев, Кенжегали Сагадиев, Международный бизнес университет, Международный бизнес университет имени Кенжегали Сагадиева, Международный бизнес университет имени Кенжегали Сагадиева, МБУ имени Кенжегали Сагадиева, МБУ имени Кенжегали"
                />
            </Head>
            <body>
                {/* <Header /> */}
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

MyDocument.getInitialProps = async (ctx) => {
    const cache = createCache();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) =>
                (
                    <StyleProvider value={cache}>
                        <App {...props} />
                    </StyleProvider>
                ),
        });

    const initialProps = await Document.getInitialProps(ctx);
    const style = extractStyle(cache, true);

    return {
        ...initialProps,
        styles: (
            <>
                {initialProps.styles}
                <style
                    data-antd="true"
                    dangerouslySetInnerHTML={{ __html: style }}
                />
            </>
        ),
    };
};
