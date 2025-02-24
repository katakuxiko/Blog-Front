import { Button, Divider, Flex, Form, Input, message, Typography } from "antd";
import { useNavigate } from "react-router";
import { axiosInstanse } from "../axiosInstanse";
import { AxiosError } from "axios";

const Login = () => {
	const navigate = useNavigate();

	const handleAuth = async (val) => {
		try {
			const res = await axiosInstanse.post<{ token: string }>(
				"/auth/login",
				val
			);

			if (res.data.token) {
				localStorage.setItem("token", res.data.token);
				axiosInstanse.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
				navigate("/");
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 401) {
					message.warning(error.response.data);
				}
			} else {
				console.error("Unexpected error:", error);
			}
		}
	};

	return (
		<div>
			<Flex vertical>
				<Typography.Title level={3}>Вход</Typography.Title>
				<Form onFinish={handleAuth} layout="vertical">
					<Form.Item
					required={false}
						rules={[
							{ required: true, message: "Обязательное поле" },
						]}
						label="Логин"
						name="username"
					>
						<Input size="large" placeholder="Введите логин" />
					</Form.Item>
					<Form.Item
					required={false}
						rules={[
							{ required: true, message: "Обязательное поле" },
							{ min: 8, message: "Минимальная длина 8 символов" },
						]}
						label="Пароль"
						name="password"
					>
						<Input.Password	
							size="large"
							placeholder="Введите пароль"
						/>
					</Form.Item>

					<Divider />

					<Flex justify="center" align="center" vertical gap={12}>
						<div className="w-full">
							<Button
								block
								htmlType="submit"
								size="large"
								type="primary"
							>
								Войти
							</Button>
						</div>
						<Typography.Link
							onClick={() => navigate("/auth/register")}
						>
							Зарегистрироваться?
						</Typography.Link>
					</Flex>
				</Form>
			</Flex>
		</div>
	);
};

export default Login;
