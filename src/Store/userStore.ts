import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { instance } from "../apiInstanse";

// Определяем интерфейс для состояния пользователя
interface User {
	name: string;
	role: string;
}

interface UserState {
	user: User | null;
	token: string | null;
	setUser: (token: string) => void;
	clearUser: () => void;
}

// Создаем Zustand store
const useUserStore = create<UserState>((set) => ({
	user: null,
	token: null,
	setUser: (token: string) => {
		const { sub, role } = jwtDecode<{ sub: string; role: string }>(token);
		instance.defaults.headers.common.Authorization = `Bearer ${token}`;

		set({ token, user: { name: sub, role: role } });
	},
	clearUser: () => set({ user: null }),
}));

export default useUserStore;
