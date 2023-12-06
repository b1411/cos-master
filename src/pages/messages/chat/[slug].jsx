import { Layout } from "antd";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button, Upload, message } from "antd";
import { Montserrat } from "next/font/google";
import MyHeader from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useRootContext } from "@/components/Context";
import messages from "@/pages/messages";
import { encodeParseQuery, useParseQuery } from "@parse/react-ssr";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["cyrillic"], display: "swap" });

const { Header, Sider, Content } = Layout;

function ChatsList({ chatsQuery }) {
    const { isLive, isLoading, isSyncing, results, count, error, reload } =
        useParseQuery(chatsQuery);
    const router = useRouter();
    const ctx = useRootContext();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (results) {
            const chats = [...results];
            chats.sort((a, b) => {
                return b.get("createdAt") - a.get("createdAt");
            });
            setChats(chats);
        }
    }, [results]);

    return (
        <div
            className="flex flex-col items-start justify-center max-w-[1140px] mt-4 px-[35px] mx-auto z-10 relative"
            style={{
                overflowWrap: "anywhere",
            }}
        >
            {chats && chats.length > 0 ? (
                chats.map((chat, index) => {
                    return (
                        <div key={index}>
                            <Link href={`/messages/chat/${chat.id}`}>{}</Link>
                        </div>
                    );
                })
            ) : (
                <p>Нет чатов</p>
            )}
        </div>
    );
}

function Chat({ currentChat }) {
    const router = useRouter();
    const ctx = useRootContext();
    const [curChat, setCurChat] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setCurChat(currentChat);
        curChat
            .relation("messages")
            .query()
            .find()
            .then((messages) => {
                setMessages(messages);
            });
    }, [currentChat, curChat]);

    return (
        <div className="w-full h-full">
            {messages !== null ? (
                messages.map((message, index) => {
                    return (
                        <div key={index}>
                            <p>{message.get("message")}</p>
                        </div>
                    );
                })
            ) : (
                <p>Нет сообщений</p>
            )}
        </div>
    );
}

export default function Services({ chatsQuery, thisChatQuery }) {
    const ctx = useRootContext();
    const router = useRouter();
    const { isLive, isLoading, isSyncing, results, count, error, reload } =
        useParseQuery(thisChatQuery);


    const [currentChat, setCurrentChat] = useState(null);

    useEffect(() => {
        if (results) {
            setCurrentChat(results[0]);
        }
    }, [router.query.slug, results]);

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
                    <MyHeader />
                </Header>
                <Content className="bg-page">
                    <div className={"page-wo-logo"}>
                        <div className="relative z-[10] h-full max-w-[1140px] px-[20px] mx-auto">
                            <div className="w-full h-full flex flex-row flex-nowrap">
                                <div className="basis-[30%] border-x-2 border-gray-300">
                                    <ChatsList chatsQuery={chatsQuery} />
                                </div>
                                <div className="basis-[70%] h-full bg-white">
                                    <Chat currentChat={currentChat} />
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
    const slug = ctx.query.slug;
    const query1 = new Parse.Query("Chats");
    query1.equalTo("objectId", slug);
    query1.include("interlocutors");
    query1.include("messages");
    const query2 = new Parse.Query("Chats");
    query2.include("interlocutors");
    return {
        props: {
            chatsQuery: await encodeParseQuery(query2),
            thisChatQuery: await encodeParseQuery(query1),
        },
    };
}
