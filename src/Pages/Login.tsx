import { Button, Flex, Form, Input, message, Typography } from "antd";
import { useNavigate } from "react-router";

const Login = () => {
	const navigate = useNavigate();

	return (
		<div>
			<Flex vertical>
				<Typography.Title level={3}>Логин</Typography.Title>
				<Form
					onFinish={(val) => {
						message.success(val.login);
						navigate("/");
					}}
					layout="vertical"
				>
					<Form.Item
						rules={[
							{ required: true, message: "Обязательное поле" },
						]}
						label="Логин"
						name="login"
					>
						<Input size="large" placeholder="Введите логин" />
					</Form.Item>
					<Form.Item
						rules={[
							{ required: true, message: "Обязательное поле" },
						]}
						label="Пароль"
						name="password"
					>
						<Input.Password
							size="large"
							placeholder="Введите пароль"
						/>
					</Form.Item>

					<Button htmlType="submit" size="large" type="primary">
						Войти
					</Button>
				</Form>
			</Flex>
		</div>
	);
};

export default Login;
