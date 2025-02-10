import { Outlet } from "react-router";

const AuthLayout = () => {
	return (
		<div className="bg-indigo-100 min-h-dvh w-lvw flex justify-center items-center">
			<div className="max-w-96 bg-white p-4 rounded w-full mx-3 shadow-lg">
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;
