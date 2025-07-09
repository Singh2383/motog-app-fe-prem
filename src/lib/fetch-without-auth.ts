import axios from "axios";

export async function fetchWithOutAuth<TResponse=unknown>(path: string) {
    return axios.get<TResponse>(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${path.startsWith("/") ? path : "/" + path}`);
}
