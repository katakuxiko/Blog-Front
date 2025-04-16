import { Button, ConfigProvider, message, Result } from "antd";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { instance } from "./apiInstanse";
import AuthLayout from "./Layout/AuthLayout";
import MainLayout from "./Layout/MainLayout";
import DetailPage from "./Pages/DetailPage";
import Editor from "./Pages/Editor";
import Login from "./Pages/Login";
import MainPage from "./Pages/MainPage";
import Register from "./Pages/Register";
import MyPosts from "./Pages/MyPosts";
import useUserStore from "./Store/userStore";
import Moderate from './Pages/Moderate';

const App = () => {
	const { clearUser } = useUserStore();

	useEffect(() => {
		const interceptor = instance.interceptors.response.use(
			(response) => response,
			(error) => {
				console.log("interceptor");

				if (error.response) {
					if (error.response.status === 403) {
						localStorage.clear();
						window.location.href = "/auth/login";
					}

					if (error.response.status === 401) {
						localStorage.clear();
						clearUser();
					}

					if (error.response.data) {
						message.warning(error.response.data);
					}
				} else {
					message.error("Произошла ошибка сети");
				}

				return Promise.reject(error);
			}
		);

		// Очистка интерцептора при размонтировании
		return () => {
			instance.interceptors.response.eject(interceptor);
		};
	}, []);

	const router = createBrowserRouter([
		{
			path: "/",
			element: <MainLayout />,
			children: [
				{
					path: "/",
					element: <MainPage />,
				},
				{
					path: "/post/:id",
					element: <DetailPage />,
				},
				{
					path: "/editor",
					element: <Editor />,
				},
				{
					path: "/mypost",
					element: <MyPosts />,
				},
				{
					path: "/moderate",
					element: <Moderate />,
				},
			],
		},
		{
			path: "/auth",
			element: <AuthLayout />,
			children: [
				{
					path: "/auth/login",
					element: <Login />,
				},
				{
					path: "/auth/register",
					element: <Register />,
				},
			],
		},
		{
			path: "*",
			element: (
				<Result
					status={404}
					title="404"
					subTitle="Страница не найдена"
					extra={
						<Button
							type="primary"
							size="large"
							className="bg-blue-500 text-white px-4 py-2 rounded"
							onClick={() => (window.location.href = "/")}
						>
							На главную
						</Button>
					}
				/>
			),
		},
	]);

	return (
		<ConfigProvider>
			<RouterProvider router={router} />
		</ConfigProvider>
	);
};

export default App;
