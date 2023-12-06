import { Layout } from "antd";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button, Upload, message } from "antd";
import { Montserrat } from "next/font/google";
import MyHeader from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useRootContext } from "@/components/Context";
import { encodeParseQuery, useParseQuery } from "@parse/react-ssr";

const montserrat = Montserrat({ subsets: ["cyrillic"], display: "swap" });
const { Header, Sider, Content } = Layout;

export default function Notifications({ notificationsQuery}) {
    const ctx = useRootContext();



    let { isLive, isLoading, isSyncing, results, count, error, reload } =
        useParseQuery(notificationsQuery);

    return (
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
                <Header  className="bg-[#C3AA95] sticky top-0 left-0 w-[100%] z-[20] h-max px-0">
                    <MyHeader currentUser={Parse.User.current()} />
                </Header>
                <Content className="bg-page">
                    <div className={"page-wo-logo"}>
                        <div className="relative z-[10] h-full max-w-[1140px] px-[20px] mx-auto">
                            {results && results.length > 0 ? (
                                <>
                                    {results.map((notification, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="border-b border-gray-300 py-2"
                                            >
                                                <div className="flex justify-between">
                                                    <div>
                                                        <p className="font-bold">
                                                            {notification.get(
                                                                "type",
                                                            )}
                                                        </p>
                                                        <p>
                                                            {notification.get(
                                                                "content",
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p>
                                                            {notification
                                                                .get(
                                                                    "createdAt",
                                                                )
                                                                .toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    const sessionToken = ctx.req.cookies.sessionToken;
    if (!sessionToken) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    Parse.User.enableUnsafeCurrentUser();
    await Parse.User.become(sessionToken);

    const notificationsQuery = new Parse.Query("Notifications");
    notificationsQuery.equalTo("userPtr", Parse.User.current().toPointer());
    notificationsQuery.descending("createdAt");

    return {
        props: {
            notificationsQuery: await encodeParseQuery(notificationsQuery),
        },
    };
}