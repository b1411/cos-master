import {
    faArchive,
    faBell,
    faComment,
    faEnvelope,
    faFlag,
    faHome,
    faRightFromBracket,
    faUsd,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Space, Divider, Button } from "antd";
import Link from "next/link";

let notifications;

const items = [
    {
        key: "0",
        type: "group",
        label: (
            <>
                <Space style={{ padding: "8px 0", color: "#000" }}>
                    Ссылки
                </Space>{" "}
                <Divider style={{ margin: 0 }} />
            </>
        ),
        children: [
            {
                key: "0-1",
                label: (
                    <Link href={`/`}>
                        <FontAwesomeIcon icon={faHome} />
                        <span className="ml-2">Главная</span>
                    </Link>
                ),
            },
            {
                key: "0-2",
                label: (
                    <Link href={`/my-requests`}>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span className="ml-2">Мои заявки</span>
                    </Link>
                ),
            },
            {
                key: "0-3",
                label: (
                    <Link href={`/archive`}>
                        <FontAwesomeIcon icon={faArchive} />
                        <span className="ml-2">Архив заявок</span>
                    </Link>
                ),
            },
            {
                key: "0-4",
                label: (
                    <Link href={"#"}>
                        <FontAwesomeIcon icon={faUser} />
                        <span className="ml-2">Профиль</span>
                    </Link>
                ),
                children: [
                    {
                        key: "0-4-1",
                        label: (
                            <Link href={`/notifications`}>
                                <FontAwesomeIcon icon={faBell} />
                                <span className="ml-2">
                                    Уведомления {notifications?.length}
                                </span>
                            </Link>
                        ),
                    },
                    {
                        key: "0-4-2",
                        label: (
                            <Link href={"/messages"}>
                                <FontAwesomeIcon icon={faComment} />
                                <span className="ml-2">Сообщения</span>
                            </Link>
                        ),
                    },
                    {
                        key: "0-4-3",
                        danger: true,
                        label: (
                            <Link
                                onClick={async (e) => {
                                    document.cookie = `sessionToken=\"\"; path=/; max-age=0`;
                                    localStorage.clear();
                                    await Parse.User.logOut();
                                }}
                                href={"/login"}
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} />
                                <span className="ml-2">Выйти</span>
                            </Link>
                        ),
                    },
                ],
            },
        ],
    },
    {
        key: "1",
        type: "group",
        label: (
            <>
                <Space style={{ padding: "8px 0", color: "#000" }}>
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
                            <Link href={`/information/cos}`}>Информация</Link>
                        ),
                    },
                    {
                        key: "1-1-2",
                        label: <Link href={`/complaint/cos`}>Жалоба</Link>,
                    },
                    {
                        key: "1-1-3",
                        label: (
                            <Link href={`/suggestion/cos`}>Предложение</Link>
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
                        key: "1-1-1",
                        label: (
                            <Link href={`/information/aho`}>Информация</Link>
                        ),
                    },
                    {
                        key: "1-1-2",
                        label: <Link href={`/complaint/aho`}>Жалоба</Link>,
                    },
                    {
                        key: "1-1-3",
                        label: (
                            <Link href={`/suggestion/aho`}>Предложение</Link>
                        ),
                    },
                    {
                        key: "1-1-4",
                        label: <Link href={`/service/aho`}>Услуга</Link>,
                    },
                ],
            },
            {
                key: "1-3",
                label: "Бухгалтерия",
                children: [
                    {
                        key: "1-1-1",
                        label: (
                            <Link href={`/information/buh`}>Информация</Link>
                        ),
                    },
                    {
                        key: "1-1-2",
                        label: <Link href={`/complaint/buh`}>Жалоба</Link>,
                    },
                    {
                        key: "1-1-3",
                        label: (
                            <Link href={`/suggestion/buh`}>Предложение</Link>
                        ),
                    },
                    {
                        key: "1-1-4",
                        label: <Link href={`/service/buh`}>Услуга</Link>,
                    },
                ],
            },
            {
                key: "1-4",
                label: "ДМП",
                children: [
                    {
                        key: "1-1-1",
                        label: (
                            <Link href={`/information/dmp`}>Информация</Link>
                        ),
                    },
                    {
                        key: "1-1-2",
                        label: <Link href={`/complaint/dmp`}>Жалоба</Link>,
                    },
                    {
                        key: "1-1-3",
                        label: (
                            <Link href={`/suggestion/dmp`}>Предложение</Link>
                        ),
                    },
                    {
                        key: "1-1-4",
                        label: <Link href={`/service/dmp`}>Услуга</Link>,
                    },
                ],
            },
            {
                key: "1-5",
                label: "Деканат",
                children: [
                    {
                        key: "1-1-1",
                        label: (
                            <Link href={`/information/dekanat`}>
                                Информация
                            </Link>
                        ),
                    },
                    {
                        key: "1-1-2",
                        label: <Link href={`/complaint/dekanat`}>Жалоба</Link>,
                    },
                    {
                        key: "1-1-3",
                        label: (
                            <Link href={`/suggestion/dekanat`}>
                                Предложение
                            </Link>
                        ),
                    },
                    {
                        key: "1-1-4",
                        label: <Link href={`/service/dekanat`}>Услуга</Link>,
                    },
                ],
            },
        ],
    },
    {
        key: "2",
        label: (
            <>
                <Space style={{ padding: "8px 0", color: "#000" }}>
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
                            <Link href={`/information/mib`}>Информация</Link>
                        ),
                    },
                    {
                        key: "2-1-2",
                        label: <Link href={`/complaint/mib`}>Жалоба</Link>,
                    },
                    {
                        key: "2-1-3",
                        label: (
                            <Link href={`/suggestion/mib`}>Предложение</Link>
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
                            <Link href={`/information/fiu`}>Информация</Link>
                        ),
                    },
                    {
                        key: "2-2-2",
                        label: <Link href={`/complaint/fiu`}>Жалоба</Link>,
                    },
                    {
                        key: "2-2-3",
                        label: (
                            <Link href={`/suggestion/fiu`}>Предложение</Link>
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
                            <Link href={`/information/sgn`}>Информация</Link>
                        ),
                    },
                    {
                        key: "2-3-2",
                        label: <Link href={`/complaint/sgn`}>Жалоба</Link>,
                    },
                    {
                        key: "2-3-3",
                        label: (
                            <Link href={`/suggestion/sgn`}>Предложение</Link>
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
                        label: <Link href={`/information/bi`}>Информация</Link>,
                    },
                    {
                        key: "2-4-2",
                        label: <Link href={`/complaint/bi`}>Жалоба</Link>,
                    },
                    {
                        key: "2-4-3",
                        label: <Link href={`/suggestion/bi`}>Предложение</Link>,
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
                            <Link href={`/information/tig`}>Информация</Link>
                        ),
                    },
                    {
                        key: "2-5-2",
                        label: <Link href={`/complaint/tig`}>Жалоба</Link>,
                    },
                    {
                        key: "2-5-3",
                        label: (
                            <Link href={`/suggestion/tig`}>Предложение</Link>
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
                            <Link href={`/information/lang`}>Информация</Link>
                        ),
                    },
                    {
                        key: "2-6-2",
                        label: <Link href={`/complaint/lang`}>Жалоба</Link>,
                    },
                    {
                        key: "2-6-3",
                        label: (
                            <Link href={`/suggestion/lang`}>Предложение</Link>
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
                            <Link href={`/information/lib`}>Информация</Link>
                        ),
                    },
                    {
                        key: "2-7-2",
                        label: <Link href={`/complaint/lib`}>Жалоба</Link>,
                    },
                    {
                        key: "2-7-3",
                        label: (
                            <Link href={`/suggestion/lib`}>Предложение</Link>
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
];

export default function Sidebar() {
    return <Menu mode="inline" items={items} />;
}
