import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { axiosInstanse } from '../axiosInstanse';

// Определяем интерфейс для состояния пользователя
interface User {
	name: string;
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
		const { sub } = jwtDecode<{ sub: string }>(token);
		axiosInstanse.defaults.headers.common.Authorization = `Bearer ${token}`;

		set({ token, user: { name: sub } });
	},
	clearUser: () => set({ user: null }),
}));

export default useUserStore;
