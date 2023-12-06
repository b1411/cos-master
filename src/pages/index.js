import { useLayoutEffect, useState } from "react";
import styles from "@/styles/Home.module.scss";
import MyHeader from "@/components/Header";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";
import { Layout } from "antd";
import ContextProvider, { useRootContext } from "@/components/Context";
import { encodeParseQuery, useParseQuery } from "@parse/react-ssr";

const { Sider, Header, Content, Footer } = Layout;

const montserrat = Montserrat({
    subsets: ["cyrillic", "cyrillic-ext"],
    display: "swap",
});

export default function Main({ notifications }) {
    const [isLogged, setIsLogged] = useState(null);
    const router = useRouter();
    const ctx = useRootContext();

    const { isLive, isSyncing, results } = useParseQuery(notifications);

    return (
        <>
            <Layout>
                <Sider
                    breakpoint="md"
                    collapsedWidth="0"
                    trigger={null}
                    collapsed={true ^ ctx.isSidebarOpen}
                    theme="light"
                >
                    <Sidebar />
                </Sider>
                <Layout>
                    <Header className="bg-transparent fixed top-0 left-0 w-[100%] z-[20] h-max px-0">
                        <MyHeader notifications={results} />
                    </Header>
                    <Content className="bg-page">
                        <div className={montserrat.className + " page"}></div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

export async function getServerSideProps(ctx) {
    const sessionToken = ctx.req.cookies.sessionToken;

    if(!sessionToken) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    Parse.User.enableUnsafeCurrentUser();
    await Parse.User.become(sessionToken);

    const user = Parse.User.current();
    if (!user) {
        return {
            redirect: {
                destination: "/login",
                permanent: true,
            },
        };
    }
    const notificationsQuery = new Parse.Query("Notifications", user);
    notificationsQuery.equalTo("isRead", false);
    notificationsQuery.equalTo("userPtr", user.toPointer());
    return {
        props: { notifications: await encodeParseQuery(notificationsQuery) },
    };
}
