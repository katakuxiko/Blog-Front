import { Button, Divider, Flex, Form, Input, message, Typography } from "antd";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useState } from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import { api } from "../apiInstanse";

const Register = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const passwordRules = [
    { text: "Минимум 8 символов", check: (val: string) => val.length >= 8 },
    {
      text: "Заглавная буква (ABC)",
      check: (val: string) => /[A-Z]/.test(val),
    },
    {
      text: "Строчная буква (abc)",
      check: (val: string) => /[a-z]/.test(val),
    },
    { text: "Цифры (123)", check: (val: string) => /\d/.test(val) },
    {
      text: "Спецсимволы (!@#)",
      check: (val: string) => /[!@#$%^&*.,/';:]/.test(val),
    },
  ];

  const handleAuth = async (val: {
    username: string;
    password: string;
    email: string;
  }) => {
    setLoading(true);
    try {
      const res = await api.registerUserApiV1UsersPost({
        ...val,
      });

      if (res.data) {
        messageApi.success("Вы успешно зарегистрировались!");
        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error instanceof AxiosError);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          messageApi.warning(error.response.data);
        }
        if (error.status === 400) {
          messageApi.warning("Пользователь с таким именем уже существует");
        }
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {contextHolder}
      <Flex vertical>
        <Typography.Title level={3}>Зарегистрироваться</Typography.Title>
        <Form onFinish={handleAuth} layout="vertical">
          <Form.Item
            required={false}
            rules={[
              { required: true, message: "Обязательное поле" },
              {
                type: "email",
                message: "Введите корректный email",
              },
            ]}
            label="Почта"
            name="email"
          >
            <Input size="large" placeholder="Введите логин" />
          </Form.Item>
          <Form.Item
            required={false}
            rules={[{ required: true, message: "Обязательное поле" }]}
            label="Логин"
            name="username"
          >
            <Input size="large" placeholder="Введите логин" />
          </Form.Item>
          <Form.Item
            required={false}
            rules={[
              {
                required: true,
                message: "Обязательное поле",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,/';:])/,
                message: "Пароль должен соответствовать всем требованиям",
              },
            ]}
            label="Пароль"
            name="password"
          >
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              size="large"
              placeholder="Введите пароль"
            />
          </Form.Item>

          <Form.Item
            required={false}
            name="password2"
            label="Повторите пароль"
            rules={[
              {
                required: true,
                message: "Повторите пароль",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error("Пароли не совпадают!"));
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="Повторите пароль" />
          </Form.Item>

          <div className="flex flex-col gap-2">
            {passwordRules.map((rule) => (
              <div
                key={rule.text}
                className="flex gap-2 items-center"
                style={{
                  color: rule.check(password) ? "#52C41A" : "#00000073",
                }}
              >
                <CheckCircleFilled
                  size={16}
                  color={rule.check(password) ? "#52C41A" : "#00000073"}
                />
                {rule.text}
              </div>
            ))}
          </div>

          <Divider />

          <Flex justify="center" align="center" vertical gap={12}>
            <div className="w-full">
              <Button
                loading={loading}
                block
                htmlType="submit"
                size="large"
                type="primary"
              >
                Зарегистрироваться
              </Button>
            </div>
            <Typography.Link onClick={() => navigate("/auth/login")}>
              Войти?
            </Typography.Link>
          </Flex>
        </Form>
      </Flex>
    </div>
  );
};

export default Register;
