import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { api, instance } from "../apiInstanse";
import { AxiosError } from "axios";
import { UserProfileOut } from "../Api";

// Определяем интерфейс для состояния пользователя
interface User {
	name: string;
	role: string;
}

interface UserState {
	user: User | null;
	profile?: UserProfileOut | null;
	token: string | null;
	setUser: (token: string) => void;
	clearUser: () => void;
	updateProfile: () => void;
}

// Создаем Zustand store
const useUserStore = create<UserState>((set, get) => ({
	user: null,
	token: null,
	setUser: async (token: string) => {
		const { sub, role } = jwtDecode<{ sub: string; role: string }>(token);
		instance.defaults.headers.common.Authorization = `Bearer ${token}`;

		const user = { name: sub, role: role };
		let profile = null;
		try {
			const { data } =
				await api.getMyProfileApiV1UserProfileProfilesMeGet({});

			if (data) {
				profile = data;
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.status === 404) {
					console.error("Profile not found:", error.message);
				} else if (error.status === 401) {
					console.error("Unauthorized:", error.message);
					get().clearUser();
				}
				console.error("Error fetching user profile:", error.message);
			}
		}

		set({ token, user, profile });
	},
	clearUser: () => set({ user: null, token: null, profile: null }),
	updateProfile: async () => {
		try {
			// Fetch the updated profile again to ensure consistency
			const refreshedProfile =
				await api.getMyProfileApiV1UserProfileProfilesMeGet({});
			set({ profile: refreshedProfile.data });
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.status === 404) {
					console.error("Profile not found:", error.message);
				} else if (error.status === 401) {
					console.error("Unauthorized:", error.message);
					get().clearUser();
				}
				console.error("Error fetching user profile:", error.message);
			}
		}
	},
}));

export default useUserStore;
