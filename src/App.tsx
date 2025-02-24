import { ConfigProvider } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./Pages/Login";
import AuthLayout from "./Layout/AuthLayout";
import MainLayout from "./Layout/MainLayout";
import MainPage from "./Pages/MainPage";
import Editor from "./Pages/Editor";
import DetailPage from './Pages/DetailPage';
import Register from './Pages/Register';

const App = () => {
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
