import { Layout } from "antd";
import MyHeader from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useRootContext } from "@/components/Context";
import { Montserrat } from "next/font/google";
import { Button, Upload, message } from "antd";
import { useState } from "react";
import { useRouter } from "next/router";

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
    {
        name: "Библиотека",
        slug: "lib",
    },
    {
        name: "ДМ",
        slug: "dm",
    },
    {
        name: "ДПОП",
        slug: "dpop",
    },
];

export default function CreateReport() {
    const ctx = useRootContext();
    const [fileList, setFileList] = useState([]);
    const router = useRouter();

    const UploadProps = {
        name: "file",
        type: "file",
        multiple: true,
        beforeUpload: (file) => {
            // check filename for this regex /^[a-zA-Z0-9_]+$/
            const regex = /^[a-zA-Z0-9_]+$/;
            if (!regex.test(file.name.slice(0, file.name.lastIndexOf(".")))) {
                message.warning(
                    "Имя файла должно состоять только из латинских букв, цифр и знака подчеркивания",
                );
                return false;
            }
            setFileList([...fileList, file]);
            return false;
        },
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        fileList,
    };

    async function handleComplaint(e) {
        e.preventDefault();
        const report = new Parse.Object("Report");

        report.set("name", e.target[0].value);
        report.set("content", e.target[1].value);
        report.set("userPtr", Parse.User.current().toPointer());
        report.set("status", "на рассмотрении");
        report.set(
            "department",
            departments.find((dep) => dep.slug === router.query.slug).name,
        );
        try {
            await report.save();
            fileList.map(async (file) => {
                const FileObj = new Parse.Object("File");
                const parseFile = new Parse.File(file.name, file);
                await parseFile.save();
                FileObj.set("file", parseFile);
                FileObj.set("reportPtr", report.toPointer());
                await FileObj.save();
                message.success("Жалоба успешно отправлена");
            });
        } catch (error) {
            message.error("Что-то пошло не так");
        } finally {
            try {
                const notifications = new Parse.Object("Notifications");
                const userQuery1 = new Parse.Query(Parse.User);
                userQuery1.equalTo(
                    "objectId",
                    departments.find((dep) => dep.slug === router.query.slug)
                        .objId,
                );
                const userPtr = (await userQuery1.first()).toPointer();
                notifications.set("userPtr", userPtr);
                notifications.set("type", "Жалоба");
                notifications.set("status", "на рассмотрении");
                notifications.set("reportPtr", report.toPointer());
                notifications.set("content", e.target[1].value);
                notifications.set("isRead", false);
                await notifications.save();
            } catch (error) {
                message.error("Что-то пошло не так");
            }
        }
    }

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
                        <MyHeader currentUser={Parse.User.current()} />
                    </Header>
                    <Content className="opacity-75">
                        <div
                            className={
                                montserrat.className + " page-wo-logo page-slug"
                            }
                        >
                            <div className="relative z-[10] h-full max-w-[1140px] px-[20px] mx-auto text-white">
                                <h1 className=" mt-5 text-2xl text-center font-bold">
                                    Жалоба
                                </h1>
                                <div className="mt-4">
                                    <h4 className="font-bold mb-3">
                                        Перед тем как подать жалобу,
                                        ознакомьтесь с правилами заполнения:
                                    </h4>
                                    <ul className="list-disc">
                                        <li className="mb-3">
                                            Опишите свою проблему / жалобу в
                                            представленном поле
                                        </li>
                                        <li className="mb-3">
                                            Не забудьте указать Ф.И.О
                                            специалиста (ОБЯЗАТЕЛЬНОЕ ПОЛЕ)
                                        </li>
                                        <li>
                                            Прикрепите дополнительные материалы
                                            (ведомость: оценки или файлы)
                                            имеющие доказательства возникщей
                                            проблемы
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-10">
                                    <form onSubmit={(e) => handleComplaint(e)}>
                                        <input
                                            type="text"
                                            placeholder="ФИО специалиста"
                                            required
                                        />
                                        <textarea
                                            className="h-40"
                                            placeholder="Опишите проблему"
                                            required
                                        ></textarea>
                                        <div className="max-w-[500px] min-w-[250x] w-[100%]">
                                            <Upload {...UploadProps}>
                                                <Button className="secondary">
                                                    Загрузить файлы
                                                </Button>
                                            </Upload>
                                        </div>
                                        <button
                                            className="green-button primary"
                                            type="submit"
                                        >
                                            Отправить
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}
