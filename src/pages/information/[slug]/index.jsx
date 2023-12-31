import { Layout } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Upload, message } from "antd";
import { Montserrat } from "next/font/google";
import MyHeader from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useRootContext } from "@/components/Context";
import { encodeParseQuery, useParseQuery } from "@parse/react-ssr";
import Link from "next/link";
import { useEffect } from "react";
import { info } from "@/data/departmentInfo";

const montserrat = Montserrat({ subsets: ["cyrillic"], display: "swap" });

const { Header, Sider, Content } = Layout;

export default function Information({ informationQuery }) {
    const ctx = useRootContext();
    const router = useRouter();
    const slug = router.query.slug;
    const information = info[slug];
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
                <Header className="bg-transparent fixed top-0 left-0 w-[100%] z-[20] h-max px-0">
                    <MyHeader currentUser={Parse.User.current()} />
                </Header>
                <Content className="bg-uibGreen opacity-75">
                    <div className="page-wo-logo">
                        <div className="relative z-[10] h-full max-w-[1000px] px-[20px] mx-auto">
                            <div className="bg-[#006642] text-white px-5 py-4 rounded-md shadow-md absolute mt-[100px]">
                                <h2 className="text-center font-bold text-2xl mb-[40px]">
                                    {information["полное название"]}
                                </h2>
                                <div className="text-xl">
                                    {information["описание"]}
                                </div>
                                <div>
                                    <p className="text-xl mt-4 font-bold">
                                        Номер для связи:
                                    </p>
                                    {Array.isArray(
                                        information["контактный номер"],
                                    ) ? (
                                        information["контактный номер"].map(
                                            (contact, index) => {
                                                return (
                                                    <p
                                                        className="text-lg"
                                                        key={index}
                                                    >
                                                        {contact}
                                                    </p>
                                                );
                                            },
                                        )
                                    ) : (
                                        <p className="text-lg">
                                            {information["контактный номер"]}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    const sessionToken = ctx.req.cookies.sessionToken;

    Parse.User.enableUnsafeCurrentUser();
    await Parse.User.become(sessionToken);

    const query = new Parse.Query("Information");
    query.equalTo("department", ctx.query.slug);

    return {
        props: {
            informationQuery: await encodeParseQuery(query),
        },
    };
}
