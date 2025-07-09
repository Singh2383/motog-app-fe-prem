import { useAuthStore } from "@/components/stores/auth-store";
import axios from "axios";

export async function fetchWithAuth<TResponse=unknown>(path: string) {
    const token = useAuthStore.getState().token;

    return axios.get<TResponse>(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${path.startsWith("/") ? path : "/" + path}`, {
        headers: {
            Authorization: `Bearer ${token?.access_token}`,
            'Content-Type': 'application/json',
        },
    });
}
