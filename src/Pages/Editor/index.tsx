import MDEditor from "@uiw/react-md-editor";
import { Button, Flex, Form, Input, Typography, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../../apiInstanse";
import { PostCreate } from '../../Api';

const Editor = () => {
	const [value, setValue] = useState("# Test");
	const navigate = useNavigate();

	const createPost = async (data: PostCreate) => {
		const hide = message.loading("Создание поста...", 0);
		try {
			const res = await api.createPostApiV1PostsPost({
				...data,
				content: value,
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
						<Input size="large" placeholder="Наименование" />
					</Form.Item>
					<Form.Item name="description" label="Краткое описание">
						<Input size="large" placeholder="Краткое описание" />
					</Form.Item>
					<Form.Item name="image" label="Фото">
						<Input size="large" placeholder="Наименование" />
					</Form.Item>

					<Form.Item name="category" label="Категория">
						<Input size="large" placeholder="Категория" />
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
