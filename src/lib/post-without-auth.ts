import axios from "axios";

export async function postWithoutAuth<TPayload = unknown, TResponse = unknown>(path: string, data: TPayload) {
    return axios.post<TResponse>(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}${path.startsWith("/") ? path : "/" + path}`,
        data);
}
