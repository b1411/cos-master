import { Montserrat } from "next/font/google";
import Image from "next/image";
import styles from "@/styles/login.module.scss";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect } from "react";
import { message } from "antd";

const montserrat = Montserrat({
    subsets: ["cyrillic", "cyrillic-ext"],
    display: "swap",
});

export default function Login() {
    const router = useRouter();
    async function handleLogin(e) {
        e.preventDefault();
        const barcode = e.target.barcode.value;
        const password = e.target.password.value;
        const user = await Parse.User.logIn(barcode, password);
        if (user) {
            const sessionToken = user.getSessionToken();
            document.cookie = `sessionToken=${sessionToken}; path=/`;
            message.success("Вы успешно вошли в систему");
            router.push("/");
        } else {
            message.error("Неверный баркод или пароль");
        }
    }

    return (
        <>
            <div
                className={
                    montserrat.className +
                    "w-[100%] h-screen relative" +
                    "" +
                    " " +
                    "bg-page relative"
                }
            >
                {/* <div className={styles.ellipsis}></div> */}
                <div className="w-[100%]">
                    <Image
                        src={"/logo.svg"}
                        alt="logo"
                        height={150}
                        width={120}
                        priority={true}
                        className="mx-auto relative z-10"
                    />
                </div>

                <div className="flex flex-col items-center mt-[100px] relative z-10">
                    <div>
                        <h1 className="text-uibGreen text-[32px] font-bold mb-[10px] text-center">
                            Вход
                        </h1>
                        <form
                            className="items-center"
                            onSubmit={(e) => handleLogin(e)}
                        >
                            <input
                                type="text"
                                id="barcode"
                                name="Баркод"
                                placeholder="Баркод"
                                className="font-bold bg-[#fff]"
                            />
                            <input
                                type="password"
                                id="password"
                                name="Пароль"
                                placeholder="Пароль"
                                className="font-bold bg-[#fff]"
                            />
                            <button type="submit">Войти</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
