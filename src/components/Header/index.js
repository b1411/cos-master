import Image from "next/image";
import Link from "next/link";
import { Button, Dropdown, Space, Divider, theme } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { useRootContext } from "@/components/Context";
import { useRef, useState } from "react";
import { encodeParseQuery, useParseQuery } from "@parse/react-ssr";

const { useToken } = theme;

const items = [
    [
        {
            key: "1",
            type: "group",
            label: (
                <>
                    <Space style={{ padding: "8px 0", color: "#fff" }}>
                        Выберите департамент
                    </Space>{" "}
                    <Divider style={{ margin: 0 }} />
                </>
            ),
            children: [
                {
                    key: "1-1",
                    label: "ЦОС",
                    children: [
                        {
                            key: "1-1-1",
                            label: (
                                <Link href={`/information/cos`}>
                                    Информация
                                </Link>
                            ),
                        },
                        {
                            key: "1-1-2",
                            label: <Link href={`/complaint/cos`}>Жалоба</Link>,
                        },
                        {
                            key: "1-1-3",
                            label: (
                                <Link href={`/suggestion/cos`}>
                                    Предложение
                                </Link>
                            ),
                        },
                        {
                            key: "1-1-4",
                            label: <Link href={`/service/cos`}>Услуга</Link>,
                        },
                    ],
                },
                {
                    key: "1-2",
                    label: "АХО",
                    children: [
                        {
                            key: "1-2-1",
                            label: (
                                <Link href={`/information/aho`}>
                                    Информация
                                </Link>
                            ),
                        },
                        {
                            key: "1-2-2",
                            label: <Link href={`/complaint/aho`}>Жалоба</Link>,
                        },
                        {
                            key: "1-2-3",
                            label: (
                                <Link href={`/suggestion/aho`}>
                                    Предложение
                                </Link>
                            ),
                        },
                        {
                            key: "1-2-4",
                            label: <Link href={`/service/aho`}>Услуга</Link>,
                        },
                    ],
                },
                {
                    key: "1-3",
                    label: "Бухгалтерия",
                    children: [
                        {
                            key: "1-3-1",
                            label: (
                                <Link href={`/information/buh`}>
                                    Информация
                                </Link>
                            ),
                        },
                        {
                            key: "1-3-2",
                            label: <Link href={`/complaint/buh`}>Жалоба</Link>,
                        },
                        {
                            key: "1-3-3",
                            label: (
                                <Link href={`/suggestion/buh`}>
                                    Предложение
                                </Link>
                            ),
                        },
                        {
                            key: "1-3-4",
                            label: <Link href={`/service/buh`}>Услуга</Link>,
                        },
                    ],
                },
                {
                    key: "1-4",
                    label: "ДМП",
                    children: [
                        {
                            key: "1-4-1",
                            label: (
                                <Link href={`/information/dmp`}>
                                    Информация
                                </Link>
                            ),
                        },
                        {
                            key: "1-4-2",
                            label: <Link href={`/complaint/dmp`}>Жалоба</Link>,
                        },
                        {
                            key: "1-4-3",
                            label: (
                                <Link href={`/suggestion/dmp`}>
                                    Предложение
                                </Link>
                            ),
                        },
                        {
                            key: "1-4-4",
                            label: <Link href={`/service/dmp`}>Услуга</Link>,
                        },
                    ],
                },
                {
                    key: "1-10",
                    label: "ДМ",
                    children: [
                        {
                            key: "1-10-1",
                            label: (
                                <Link href={`/information/dm`}>Информация</Link>
                            ),
                        },
                        {
                            key: "1-10-2",
                            label: <Link href={`/complaint/dm`}>Жалоба</Link>,
                        },
                        {
                            key: "1-10-3",
                            label: (
                                <Link href={`/suggestion/dm`}>Предложение</Link>
                            ),
                        },
                        {
                            key: "1-10-4",
                            label: <Link href={`/service/dm`}>Услуга</Link>,
                        },
                    ],
                },
                {
                    key: "1-11",
                    label: "ДПОП",
                    children: [
                        {
                            key: "1-11-1",
                            label: (
                                <Link href={`/information/dpop`}>
                                    Информация
                                </Link>
                            ),
                        },
                        {
                            key: "1-11-2",
                            label: <Link href={`/complaint/dpop`}>Жалоба</Link>,
                        },
                        {
                            key: "1-11-3",
                            label: (
                                <Link href={`/suggestion/dpop`}>
                                    Предложение
                                </Link>
                            ),
                        },
                        {
                            key: "1-11-4",
                            label: <Link href={`/service/dpop`}>Услуга</Link>,
                        },
                    ],
                },
                {
                    key: "1-5",
                    label: "Деканат",
                    children: [
                        {
                            key: "1-5-1",
                            label: (
                                <Link href={`/information/dekanat`}>
                                    Информация
                                </Link>
                            ),
                        },
                        {
                            key: "1-5-2",
                            label: (
                                <Link href={`/complaint/dekanat`}>Жалоба</Link>
                            ),
                        },
                        {
                            key: "1-5-3",
                            label: (
                                <Link href={`/suggestion/dekanat`}>
                                    Предложение
                                </Link>
                            ),
                        },
                        {
                            key: "1-5-4",
                            label: (
                                <Link href={`/service/dekanat`}>Услуга</Link>
                            ),
                        },
                    ],
                },
            ],
        },
        {
            key: "2",
            label: (
                <>
                    <Divider style={{ margin: 0 }} />
                    <Space style={{ padding: "8px 0", color: "#fff" }}>
                        Выберите кафедру
                    </Space>{" "}
                    <Divider style={{ margin: 0 }} />
                </>
            ),
            type: "group",
            children: [
                {
                    key: "2-1",
                    label: "МиБ",
                    children: [
                        {
                            key: "2-1-1",
                            label: (
                                <Link href={`/information/mib`}>
                                    Информация
                                </Link>
                            ),
                        },
                        {
                            key: "2-1-2",
                            label: <Link href={`/complaint/mib`}>Жалоба</Link>,
                        },
                        {
                            key: "2-1-3",
                            label: (
                                <Link href={`/suggestion/mib`}>
                                    Предложение
                                </Link>
                            ),
                        },
                        {
                            key: "2-1-4",
                            label: <Link href={`/service/mib`}>Услуга</Link>,
                        },
                    ],
                },
                {
                    key: "2-2",
                    label: "ФиУ",
                    children: [
                        {
                            key: "2-2-1",
                            label: (
                                <Link href={`/information/fiu`}>
                                    Информация
                                </Link>
                            ),
                        },
                        {
                            key: "2-2-2",
                            label: <Link href={`/complaint/fiu`}>Жалоба</Link>,
                        },
                        {
                            key: "2-2-3",
                            label: (
                                <Link href={`/suggestion/fiu`}>
                                    Предложение
                                </Link>
                            ),
                        },
                        {
                            key: "2-2-4",
                            label: <Link href={`/service/fiu`}>Услуга</Link>,
                        },
                    ],
                },
                {
                    key: "2-3",
                    label: "СГН",
                    children: [
                        {
                            key: "2-3-1",
                            label: (
                                <Link href={`/information/sgn`}>
                                    Информация
                                </Link>
                            ),
                        },
                        {
                            key: "2-3-2",
                            label: <Link href={`/complaint/sgn`}>Жалоба</Link>,
                        },
                        {
                            key: "2-3-3",
                            label: (
                                <Link href={`/suggestion/sgn`}>
                                    Предложение
                                </Link>
                            ),
                        },
                        {
                            key: "2-3-4",
                            label: <Link href={`/service/sgn`}>Услуга</Link>,
                        },
                    ],
                },
                {
                    key: "2-4",
                    label: "БИ",
                    children: [
                        {
                            key: "2-4-1",
                            label: (
                                <Link href={`/information/bi`}>Информация</Link>
                            ),
                        },
                        {
                            key: "2-4-2",
                            label: <Link href={`/complaint/bi`}>Жалоба</Link>,
                        },
                        {
                            key: "2-4-3",
                            label: (
                                <Link href={`/suggestion/bi`}>Предложение</Link>
                            ),
                        },
                        {
                            key: "2-4-4",
                            label: <Link href={`/service/bi`}>Услуга</Link>,
                        },
                    ],
                },
                {
                    key: "2-5",
                    label: "ТиГ",
                    children: [
                        {
                            key: "2-5-1",
                            label: (
                                <Link href={`/information/tig`}>
                                    Информация
                                </Link>
                            ),
                        },
                        {
                            key: "2-5-2",
                            label: <Link href={`/complaint/tig`}>Жалоба</Link>,
                        },
                        {
                            key: "2-5-3",
                            label: (
                                <Link href={`/suggestion/tig`}>
                                    Предложение
                                </Link>
                            ),
                        },
                        {
                            key: "2-5-4",
                            label: <Link href={`/service/tig`}>Услуга</Link>,
                        },
                    ],
                },
                {
                    key: "2-6",
                    label: "Языковой центр",
                    children: [
                        {
                            key: "2-6-1",
                            label: (
                                <Link href={`/information/lang`}>
                                    Информация
                                </Link>
                            ),
                        },
                        {
                            key: "2-6-2",
                            label: <Link href={`/complaint/lang`}>Жалоба</Link>,
                        },
                        {
                            key: "2-6-3",
                            label: (
                                <Link href={`/suggestion/lang`}>
                                    Предложение
                                </Link>
                            ),
                        },
                        {
                            key: "2-6-4",
                            label: <Link href={`/service/lang`}>Услуга</Link>,
                        },
                    ],
                },
                {
                    key: "2-7",
                    label: "Библиотека",
                    children: [
                        {
                            key: "2-7-1",
                            label: (
                                <Link href={`/information/lib`}>
                                    Информация
                                </Link>
                            ),
                        },
                        {
                            key: "2-7-2",
                            label: <Link href={`/complaint/lib`}>Жалоба</Link>,
                        },
                        {
                            key: "2-7-3",
                            label: (
                                <Link href={`/suggestion/lib`}>
                                    Предложение
                                </Link>
                            ),
                        },
                        {
                            key: "2-7-4",
                            label: <Link href={`/service/lib`}>Услуга</Link>,
                        },
                    ],
                },
            ],
        },
    ],
];

const profileItems = [
    {
        key: "3",
        label: (
            <Link href={"/messages"}>
                <Space>Сообщения</Space>
            </Link>
        ),
    },
    {
        key: "4",
        danger: true,
        label: (
            <Link
                href={"/login"}
                onClick={async () => {
                    document.cookie = `sessionToken=\"\"; path=/; max-age=0`;
                    localStorage.clear();
                    await Parse.User.logOut();
                }}
            >
                {" "}
                Выйти
            </Link>
        ),
    },
];

export default function MyHeader() {
    const { token } = useToken();
    const router = useRouter();
    const logoRef = useRef(null);
    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };
    const menuStyle = {
        boxShadow: "none",
    };

    const ctx = useRootContext();

    const { isLive, isSyncing, results, reload } = useParseQuery(
        new Parse.Query("Notifications")
            .equalTo("userPtr", Parse.User.current())
            .equalTo("isRead", false),
    );

    useEffect(() => {
        if (ctx.isSidebarOpen) {
            logoRef.current.classList.add("hidden");
        } else {
            logoRef.current.classList.remove("hidden");
        }
    }, [ctx.isSidebarOpen]);

    return (
        <div className="flex flex-row bg-transparent items-center justify-around md:justify-evenly py-3 max-w-[1140px] px-[35px] md:px-0 mx-auto">
            <div className="logo">
                <Link href="/">
                    <Image
                        ref={logoRef}
                        src={"/logo.svg"}
                        alt="logo"
                        height={150}
                        width={70}
                        className="cursor-pointer"
                    />
                </Link>
            </div>
            <div className={"flex-row gap-[30px] hidden md:flex"}>
                <Dropdown
                    className="hidden md:block"
                    trigger={["click"]}
                    menu={{ items: items[0] }}
                >
                    <Button>
                        <Space>
                            Выберите отдел <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        router.push("/my-requests");
                    }}
                >
                    <Space>Мои заявки</Space>
                </Button>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        router.push("/archive");
                    }}
                >
                    <Space>Архив заявок</Space>
                </Button>
            </div>
            <div>
                <Dropdown
                    trigger={["click"]}
                    menu={{
                        items: profileItems,
                    }}
                    dropdownRender={(menu) => (
                        <div style={contentStyle}>
                            <Space
                                style={{
                                    padding: "8px 12px",
                                    textAlign: "center",
                                }}
                            >
                                {Parse.User.current().get("fullname")}
                            </Space>
                            <Divider
                                style={{
                                    margin: 0,
                                }}
                            />
                            <Space
                                style={{
                                    padding: "9px 16px 0",
                                    textAlign: "center",
                                }}
                            >
                                <Link
                                    key={"1"}
                                    href={"/notifications"}
                                    onClick={async () => {
                                        await Parse.Object.saveAll(
                                            results.map((result) => {
                                                result.set("isRead", true);
                                                return result;
                                            }),
                                        );
                                        reload();
                                    }}
                                >
                                    <Space>
                                        Уведомления{" "}
                                        <span className="bg-red-500 text-white text-xs rounded-full px-1">
                                            {results?.length || "0"}
                                        </span>
                                    </Space>
                                </Link>
                            </Space>
                            {React.cloneElement(menu, {
                                style: menuStyle,
                            })}
                        </div>
                    )}
                >
                    <Space className="relative align-middle hidden md:inline-block cursor-pointer">
                        <>
                            <FontAwesomeIcon
                                icon={faUser}
                                className="text-[24px] text-uibGreen"
                            />
                            <span className="absolute top-[6px] right-[-6px] bg-red-500 text-white text-xs rounded-full px-1">
                                {results?.length || ""}
                            </span>
                        </>
                    </Space>
                </Dropdown>
                <Button
                    className="md:hidden"
                    onClick={(e) => {
                        e.preventDefault();
                        ctx.setIsSidebarOpen((prev) => !prev);
                    }}
                >
                    <Space>
                        <FontAwesomeIcon icon={faBars} />
                    </Space>
                </Button>
            </div>
        </div>
    );
}
