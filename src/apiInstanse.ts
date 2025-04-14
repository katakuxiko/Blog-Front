import { Api } from "./Api";

export const { api, setSecurityData, request, instance } = new Api({
	baseURL: "http://127.0.0.1:8000",
});