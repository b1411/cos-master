import { Layout } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Upload, message, Select } from "antd";
import { Montserrat } from "next/font/google";
import MyHeader from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useRootContext } from "@/components/Context";
import { encodeParseQuery, useParseQuery } from "@parse/react-ssr";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["cyrillic"], display: "swap" });

const { Header, Sider, Content } = Layout;

export default function Services({ servicesQuery }) {
    const ctx = useRootContext();
    const router = useRouter();
    const slug = router.query.slug?.toString();

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        Parse.User.currentAsync().then((user) => setCurrentUser(user));
    }, []);

    const servicesList = {
        dmp: {
            services: [
                {
                    name: "Онай",
                    content: (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                new Parse.Object("Services", {
                                    service_name: "Онай",
                                    content: e.target[0].value,
                                    department: slug,
                                    userPtr: currentUser?.toPointer(),
                                })
                                    .save()
                                    .then((res) => {
                                        currentUser?.add(res);
                                    }),
                                    currentUser?.save().then(() => {
                                        console.log(currentUser);
                                        message.success("Услуга добавлена");
                                    });
                            }}
                        >
                            <input
                                type="text"
                                pattern="^[0-9]*$"
                                placeholder="Баркод"
                                required
                            />
                            <button className="green-button" type="submit">
                                Отправить
                            </button>
                        </form>
                    ),
                },
                {
                    name: "Связаться со специалистом",
                    content: (
                        <Link href={`/messages/chat/${currentUser?.id}`}>
                            <button>Перейти в чат</button>
                        </Link>
                    ),
                },
            ],
        },
        aho: {
            services: [
                {
                    name: "Связаться со специалистом",
                    content: (
                        <Link href={`/messages/chat/${currentUser?.id}`}>
                            <button>Перейти в чат</button>
                        </Link>
                    ),
                },
            ],
        },
        buh: {
            services: [
                {
                    name: "Связаться со специалистом",
                    content: (
                        <Link href={`/messages/chat/${currentUser?.id}`}>
                            <button>Перейти в чат</button>
                        </Link>
                    ),
                },
            ],
        },
        cos: {
            services: [
                {
                    name: "Связаться со специалистом",
                    content: (
                        <Link href={`/messages/chat/${currentUser?.id}`}>
                            <button>Перейти в чат</button>
                        </Link>
                    ),
                },
            ],
        },
        dekanat: {
            services: [
                {
                    name: "Связаться со специалистом",
                    content: (
                        <Link href={`/messages/chat/${currentUser?.id}`}>
                            <button>Перейти в чат</button>
                        </Link>
                    ),
                },
            ],
        },
        mib: {
            services: [
                {
                    name: "Связаться со специалистом",
                    content: (
                        <Link href={`/messages/chat/${currentUser?.id}`}>
                            <button>Перейти в чат</button>
                        </Link>
                    ),
                },
            ],
        },
        fiu: {
            services: [
                {
                    name: "Связаться со специалистом",
                    content: (
                        <Link href={`/messages/chat/${currentUser?.id}`}>
                            <button>Перейти в чат</button>
                        </Link>
                    ),
                },
            ],
        },
        sgn: {
            services: [
                {
                    name: "Связаться со специалистом",
                    content: (
                        <Link href={`/messages/chat/${currentUser?.id}`}>
                            <button>Перейти в чат</button>
                        </Link>
                    ),
                },
            ],
        },
        bi: {
            services: [
                {
                    name: "Связаться со специалистом",
                    content: (
                        <Link href={`/messages/chat/${currentUser?.id}`}>
                            <button>Перейти в чат</button>
                        </Link>
                    ),
                },
            ],
        },
        tig: {
            services: [
                {
                    name: "Связаться со специалистом",
                    content: (
                        <>
                            <Link href={`/messages/chat/${currentUser?.id}`}>
                                <button>Перейти в чат</button>
                            </Link>
                            <Link href={`/messages/chat/${currentUser?.id}`}>
                                <button>Перейти в чат</button>
                            </Link>
                        </>
                    ),
                },
            ],
        },
        lang: {
            services: [
                {
                    name: "Связаться со специалистом",
                    content: (
                        <>
                            <Link href={`/messages/chat/${currentUser?.id}`}>
                                <button>Перейти в чат</button>
                            </Link>
                            <Link href={`/messages/chat/${currentUser?.id}`}>
                                <button>Перейти в чат</button>
                            </Link>
                        </>
                    ),
                },
            ],
        },
        lib: {
            services: [
                {
                    name: "Связаться со специалистом",
                    content: (
                        <>
                            <Link href={`/messages/chat/${currentUser?.id}`}>
                                <button>Перейти в чат</button>
                            </Link>
                            <Link href={`/messages/chat/${currentUser?.id}`}>
                                <button>Перейти в чат</button>
                            </Link>
                        </>
                    ),
                },
            ],
        },
    };

    const [services, setServices] = useState([]);

    useEffect(() => {
        if (servicesList[slug]) {
            setServices(servicesList[slug].services);
        }
    }, [slug]);

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
                    <MyHeader currentUser={currentUser} />
                </Header>
                <Content className="bg-uibGreen opacity-75">
                    <div className={"page-wo-logo"}>
                        <div className="relative z-[10] h-full max-w-[1140px] px-[20px] mx-auto">
                            <div className="flex flex-col gap-4">
                                {services?.map((service, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="border-b border-gray-300 py-2"
                                        >
                                            <div className="flex justify-between">
                                                <div>
                                                    <p className="font-bold">
                                                        {service.name}
                                                    </p>
                                                    <div>{service.content}</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
