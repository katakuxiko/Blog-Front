import MDEditor from "@uiw/react-md-editor";
import { Button, Flex, Form, Input, message, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Editor = () => {
	const [value, setValue] = useState("# Test");
	const navigate = useNavigate();

	const createPost = async (data: any) => {
		const hide = message.loading("Создание поста...", 0);
		try {
			const res = await axios.post("http://localhost:8080/api/posts", {
				...data,
				content: value,
				author: "test",
			});

			if (res.data) {
				message.success("Пост успешно создан");
				navigate("/");
			}
		} catch (error) {
			message.error("Произошла ошибка, попробуйте позже");
		} finally {
			hide();
		}
	};

	return (
		<Form onFinish={createPost} layout="vertical">
			<Flex gap={12} data-color-mode="light" vertical>
				<Typography.Title level={2}>Форма создания</Typography.Title>
				<div>
					<Form.Item name="title" label="Наименование">
						<Input placeholder="Наименование" />
					</Form.Item>
					<Form.Item name="description" label="Краткое описание">
						<Input placeholder="Краткое описание" />
					</Form.Item>
					<Form.Item name="image" label="Фото">
						<Input placeholder="Наименование" />
					</Form.Item>

					<Form.Item name="category" label="Категория">
						<Input placeholder="Категория" />
					</Form.Item>
				</div>

				<MDEditor
					className="bg-amber-50"
					color="white"
					title="asd"
					value={value}
					onChange={(val) => setValue(val ?? "")}
				/>

				<div>
					<Button htmlType="submit" size="large" type="primary">
						Сохранить
					</Button>
				</div>
			</Flex>
		</Form>
	);
};

export default Editor;
