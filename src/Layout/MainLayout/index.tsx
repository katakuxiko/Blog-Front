import { Outlet } from "react-router";

const MainLayout = () => {
	return (
		<div className="bg-indigo-100 min-h-dvh w-lvw flex justify-center items-center">
			<div className="max-w-4xl bg-white p-4 rounded-xl w-full m-3 shadow-lg">
				<Outlet />
			</div>
		</div>
	);
};

export default MainLayout;
