import { UserType } from "@/lib/types/UserType";
import jwt from "jsonwebtoken";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";

export const useUser = () => {
    const cookies = useCookies();

    const [user, setUser] = useState<UserType>({
        nickname: "",
        email: "",
        token: "",
    });

    useEffect(() => {
        const token = cookies.get("token"); // httpOnly 쿠키도 읽을 수 있음
        if (token) {
            try {
                const decoded = jwt.decode(token) as UserType; // 🔹 클라이언트에서는 검증하지 않고 decode만!
                if (decoded) {
                    setUser(decoded);
                }
            } catch (error) {
                console.error("Token decode error:", error);
            }
        }
    }, []);

    return { user };
};
