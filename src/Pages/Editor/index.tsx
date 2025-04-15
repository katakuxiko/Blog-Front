import MDEditor from "@uiw/react-md-editor";
import { Button, Flex, Form, Input, Typography, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { api } from "../../apiInstanse";
import { PostCreate } from "../../Api";
import { convertImageUrlToBase64 } from "../../utils/base64";
import { useForm } from "antd/es/form/Form";

const Editor = () => {
	const [value, setValue] = useState("# Test");
	const [base64File, setBase64File] = useState<string>();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const [params] = useSearchParams();
	const [form] = useForm();
	const postId = params.get("id");

	const getInitialValues = async () => {
		const postId = params.get("id");

		if (postId) {
			api.getPostApiV1PostsPostIdGet(+postId, {}).then(async (res) => {
				if (res.data) {
					setValue(res.data.content);
					if (res.data.image_url) {
						const imageBase64 = await convertImageUrlToBase64(
							res.data.image_url
						);
						setBase64File(imageBase64);
						form.setFieldsValue({
							...res.data,
						});
					}
				}
			});
		}

		return null;
	};

	useEffect(() => {
		getInitialValues();
	}, []);

	const createPost = async (data: PostCreate) => {
		const hide = messageApi.loading(
			postId ? "Обновление поста..." : "Создание поста...",
			0
		);
		setLoading(true);
		try {
			if (postId) {
				const res = await api.updatePostApiV1PostsPostIdPut(+postId, {
					...data,
					content: value,
					image_base64: base64File?.replace(
						/^data:image\/\w+;base64,/,
						""
					),
				});
				if (res.data) {
					message.success("Пост успешно обновлён");
					navigate("/");
				}
				return;
			} else {
				const res = await api.createPostApiV1PostsPost({
					...data,
					content: value,
					image_base64: base64File?.replace(
						/^data:image\/\w+;base64,/,
						""
					),
				});

				if (res.data) {
					message.success("Пост успешно создан");
					navigate("/");
				}
			}
		} catch (error) {
			console.error(error);
			message.error("Произошла ошибка, попробуйте позже");
		} finally {
			hide();
			setLoading(false);
		}
	};

	return (
		<Form onFinish={createPost} layout="vertical" form={form}>
			{contextHolder}
			<Flex gap={12} data-color-mode="light" vertical>
				<Typography.Title level={2}>Форма создания</Typography.Title>
				<div>
					<Form.Item
						rules={[
							{ required: true, message: "Обязательное поле" },
						]}
						name="title"
						label="Наименование"
					>
						<Input size="large" placeholder="Наименование" />
					</Form.Item>
					<Form.Item name="description" label="Краткое описание">
						<Input size="large" placeholder="Краткое описание" />
					</Form.Item>
					<Form.Item name="image" label="Фото">
						<Upload
							type="select"
							accept="image/*"
							maxCount={1}
							beforeUpload={(file) => {
								const reader = new FileReader();
								reader.onload = () => {
									if (typeof reader.result === "string") {
										console.log("Base64:", reader.result);
										message.success(
											"Файл успешно преобразован в Base64"
										);
										setBase64File(reader.result);
									}
								};
								reader.readAsDataURL(file);
								return false; // Prevent upload
							}}
							fileList={undefined}
							onRemove={() => setBase64File("")}
							// itemRender={() => undefined}
						>
							<Button size="large">Загрузить</Button>
						</Upload>
					</Form.Item>
					{base64File && (
						<div className="p-4">
							<img
								src={base64File}
								alt="Uploaded preview"
								style={{ maxWidth: "100%", maxHeight: "200px" }}
							/>
						</div>
					)}

					<Form.Item name="tags" label="Категории">
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
					<Button
						htmlType="submit"
						size="large"
						type="primary"
						loading={loading}
					>
						Сохранить
					</Button>
				</div>
			</Flex>
		</Form>
	);
};

export default Editor;
