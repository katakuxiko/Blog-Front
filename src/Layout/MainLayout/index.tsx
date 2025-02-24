import { Button, Flex, Spin } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { axiosInstanse } from "../../axiosInstanse";

const MainLayout = () => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			navigate("/auth/login");
			return;
		}

		axiosInstanse.defaults.headers.common.Authorization = `Bearer ${token}`;
		setLoading(false);
	}, [navigate]);

	if (loading) {
		return (
			<div className="w-full h-dvh flex justify-center items-center">
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div className="bg-indigo-100 min-h-dvh w-lvw flex justify-center items-start">
			<div className="max-w-4xl bg-white p-4 w-full shadow-lg min-h-dvh relative">
				<header className="mb-4">
					<div className="sm:hidden md:block">
						<Flex justify="space-between" align="center">
							<Flex gap={12}>
								<NavLink
									to="/"
									className="text-gray-950 text-xl font-semibold"
								>
									Главная
								</NavLink>

								<NavLink
									to="/editor"
									className="text-gray-950 text-xl font-semibold"
								>
									Редактор
								</NavLink>
							</Flex>

							<Button
								color="danger"
								type="text"
								onClick={() => {
									localStorage.removeItem("token");
									navigate("/auth/login");
									axiosInstanse.defaults.headers.common.Authorization = ``;
								}}
							>
								Выйти
							</Button>
						</Flex>
					</div>
				</header>

				<Outlet />

				<footer className="text-center text-gray-500 text-sm bottom-4 mt-4 w-full left-0 absolute">
					<div>{dayjs().format("YYYY")}</div>
				</footer>
			</div>
		</div>
	);
};

export default MainLayout;
