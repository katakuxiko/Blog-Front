import { ConfigProvider, message } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./Pages/Login";
import AuthLayout from "./Layout/AuthLayout";
import MainLayout from "./Layout/MainLayout";
import MainPage from "./Pages/MainPage";
import Editor from "./Pages/Editor";
import DetailPage from "./Pages/DetailPage";
import Register from "./Pages/Register";
import { useEffect } from "react";
import { axiosInstanse } from "./axiosInstanse";

const App = () => {
	useEffect(() => {
		const interceptor = axiosInstanse.interceptors.response.use(
			(response) => response,
			(error) => {
				console.log("interceptor");

				if (error.response) {
					if (error.response.status === 403) {
						localStorage.clear();
						window.location.href = "/auth/login"; // Вместо reload
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
			axiosInstanse.interceptors.response.eject(interceptor);
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
	]);

	return (
		<ConfigProvider>
			<RouterProvider router={router} />
		</ConfigProvider>
	);
};

export default App;
