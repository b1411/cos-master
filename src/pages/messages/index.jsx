import { Layout } from "antd";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button, Upload, message } from "antd";
import { Montserrat } from "next/font/google";
import MyHeader from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useRootContext } from "@/components/Context";
import Link from "next/link";
import { encodeParseQuery, useParseQuery } from "@parse/react-ssr";

const montserrat = Montserrat({ subsets: ["cyrillic"], display: "swap" });

const { Header, Sider, Content } = Layout;

const departments = [
    {
        name: "ДМП",
        slug: "dmp",
        objId: "tmQEllcAfw",
    },
    {
        name: "АХО",
        slug: "aho",
    },
    {
        name: "Бухгалтерия",
        slug: "buh",
    },
    {
        name: "ЦОС",
        slug: "cos",
        objId: "j5urEjyL70",
    },
    {
        name: "Деканат",
        slug: "dekanat",
    },
    {
        name: "МиБ",
        slug: "mib",
    },
    {
        name: "ФиУ",
        slug: "fiu",
    },
    {
        name: "СГН",
        slug: "sgn",
    },
    {
        name: "БИ",
        slug: "bi",
    },
    {
        name: "ТиГ",
        slug: "tig",
    },
    {
        name: "Языковой центр",
        slug: "lang",
    },
];

function ChatsList({ chatsQuery }) {
    const { isLive, isLoading, isSyncing, results, count, error, reload } =
        useParseQuery(chatsQuery);
    const [chats, setChats] = useState([]);
    const [interlocutors, setInterlocutors] = useState([]);

    useEffect(() => {
        if (results) {
            setChats(results);
        }
    }, [results]);

    return (
        <div
            className="flex flex-col items-start justify-center max-w-[1140px] mt-4 px-[35px] mx-auto z-10 relative"
            style={{
                overflowWrap: "anywhere",
            }}
        >
            {interlocutors && chats.length > 0 ? (
                interlocutors.map((chat, index) => {
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

export default function Messenger({ chatsQuery }) {
    const ctx = useRootContext();

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
                            <ChatsList chatsQuery={chatsQuery} />
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

    const query1 = new Parse.Query("Chats");
    query1.include("interlocutors").include("messages");

    return {
        props: {
            chatsQuery: await encodeParseQuery(query1),
        },
    };
}
