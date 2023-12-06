import { Layout } from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Upload, message } from "antd";
import { Montserrat } from "next/font/google";
import { useRootContext } from "@/components/Context";
import Sidebar from "@/components/Sidebar";
import { encodeParseQuery, useParseQuery } from "@parse/react-ssr";
import Link from "next/link";
import MyHeader from "@/components/Header";
import styles from "@/styles/Requests.module.scss";

const montserrat = Montserrat({ subsets: ["cyrillic"], display: "swap" });

const { Header, Sider, Content } = Layout;

function RequestsList({ reportsQuery, suggestionQuery }) {
    const { isLive, isLoading, isSyncing, results, count, error, reload } =
        useParseQuery(reportsQuery);
    const suggestions = useParseQuery(suggestionQuery).results;

    const [applications, setApplications] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (results && suggestions) {
            const applications = [...results, ...suggestions];
            applications.sort((a, b) => {
                return b.get("createdAt") - a.get("createdAt");
            });
            setApplications(applications);
        }
    }, [results, suggestions]);

    function handleAnswer(e, application) {
        e.preventDefault();
        const answer = e.target.answer.value;
        if (answer) {
            application.set("answer", answer);
            application.set("status", "отвечено");
            application.save();
            reload();
        } else {
            message.error("Введите ответ");
        }
    }

    return (
        <div
            className="flex flex-col items-start justify-center max-w-[1140px] mt-4 px-[35px] mx-auto z-10 relative"
            style={{
                overflowWrap: "anywhere",
            }}
        >
            {applications && applications.length > 0 ? (
                applications.map((report, index) => {
                    return (
                        <div key={index} className={styles.reportListItem}>
                            <div className={styles.reportListItem__metadata}>
                                <p
                                    className={
                                        styles.reportListItem__metadata__title
                                    }
                                >
                                    {report.get("name")}
                                </p>
                                <p
                                    className={
                                        styles.reportListItem__metadata__status
                                    }
                                >
                                    {report.className === "Report"
                                        ? "Жалоба"
                                        : "Предложение"}
                                </p>
                                <p
                                    className={
                                        styles.reportListItem__metadata__status
                                    }
                                >
                                    {report.get("status")}
                                </p>
                                <p
                                    className={
                                        styles.reportListItem__metadata__date
                                    }
                                >
                                    {report
                                        .get("createdAt")
                                        .toLocaleDateString()}
                                </p>
                            </div>
                            <p className="">{report.get("content")}</p>
                            <p className="">
                                <span className="font-bold">Ответ:</span>{" "}
                                {report.get("answer")}
                            </p>
                            <div className={styles.reportListItem__files}>
                                {/* {report.get("files").map((file, index) => {
                                    return (
                                        <a
                                            key={index}
                                            href={file.get("file").url}
                                            className={
                                                styles.reportListItem__files__file
                                            }
                                        >
                                            {file.get("file").name}
                                        </a>
                                    );
                                })} */}
                            </div>
                        </div>
                    );
                })
            ) : (
                <></>
            )}
        </div>
    );
}

export default function Archive({ reportsQuery, suggestionQuery }) {
    const ctx = useRootContext();
    const router = useRouter();

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
                <Content className="page-wo-logo">
                    <RequestsList
                        reportsQuery={reportsQuery}
                        suggestionQuery={suggestionQuery}
                    />
                </Content>
            </Layout>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { req } = context;
    const { sessionToken } = req.cookies;

    if (sessionToken) {
        Parse.User.enableUnsafeCurrentUser();
        await Parse.User.become(sessionToken);
    }
    const user = Parse.User.current();
    const parseQuery = new Parse.Query("Report", user);
    const suggestionsQuery = new Parse.Query("Suggestion", user);
    parseQuery.equalTo("status", "отвечено");
    suggestionsQuery.equalTo("status", "отвечено");
    parseQuery.include("files");
    suggestionsQuery.include("files");
    parseQuery.descending("createdAt");
    suggestionsQuery.descending("createdAt");
    if (user.get("role") === "user") {
        parseQuery.equalTo("userPtr", user.toPointer());
        suggestionsQuery.equalTo("userPtr", user.toPointer());
    } else if (user.get("role") === "admin") {
        parseQuery.equalTo("department", user.get("department"));
        suggestionsQuery.equalTo("department", user.get("department"));
    } else if (user.get("role") === "superAdmin") {
        return {
            props: {
                reportsQuery: await encodeParseQuery(parseQuery),
                suggestionQuery: await encodeParseQuery(suggestionsQuery),
            },
        };
    }
    const reportsQuery = await encodeParseQuery(parseQuery);
    const suggestionQuery = await encodeParseQuery(suggestionsQuery);
    return {
        props: {
            reportsQuery,
            suggestionQuery,
        },
    };
}
