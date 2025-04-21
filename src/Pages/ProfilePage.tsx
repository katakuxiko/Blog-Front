import {
	Avatar,
	Button,
	Flex,
	Form,
	Input,
	message,
	Typography,
	Upload,
} from "antd";
import useUserStore from "../Store/userStore";
import { useEffect, useState } from "react";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { api } from "../apiInstanse";
import { convertImageUrlToBase64 } from "../utils/base64";

const ProfilePage = () => {
	const { user, profile, updateProfile } = useUserStore();
	const [form] = Form.useForm();

	const [edit, setIsEdit] = useState(false);
	const [base64File, setBase64File] = useState<string>();

	const getImage = async () => {
		if (profile?.avatar_url) {
			const imageBase64 = await convertImageUrlToBase64(
				profile?.avatar_url
			);
			setBase64File(imageBase64);
		}
	};

	const handleSave = async () => {
		try {
			const values = await form.validateFields();
			console.log("Updated values:", values);

			try {
				const res = await api.updateProfileApiV1UserProfileProfilesPut({
					avatar_base64: base64File?.replace(
						/^data:image\/\w+;base64,/,
						""
					),
					...values,
				});

				if (res.data) {
					message.success("Профиль обновлён");
					updateProfile();
				}
			} catch (error) {
				message.error("Произошла ошибка при обновлении профиля");
				console.error(error);
				return null;
			}

			// Здесь можно сделать запрос на обновление данных
			setIsEdit(false);
		} catch (error) {
			console.error("Validation failed:", error);
		}
	};

	const handleCancel = () => {
		form.resetFields();
		setIsEdit(false);
	};

	useEffect(() => {
		getImage();
	}, []);

	useEffect(() => {
		if (edit) {
			form.setFieldsValue({ ...profile });
		}
	}, [edit]);

	return (
		<div>
			<Flex justify="space-between" align="center">
				<Typography.Title>Профиль</Typography.Title>
				{edit ? (
					<Flex gap={12}>
						<Button icon={<SaveOutlined />} onClick={handleSave}>
							Сохранить
						</Button>
						<Button icon={<CloseOutlined />} onClick={handleCancel}>
							Отменить
						</Button>
					</Flex>
				) : (
					<Button
						icon={<EditOutlined />}
						onClick={() => setIsEdit(true)}
					>
						Отредактировать
					</Button>
				)}
			</Flex>

			<Form form={form} layout="vertical" initialValues={profile ?? {}}>
				<Flex gap={16} align="center">
					{!edit ? (
						profile?.avatar_url ? (
							<Avatar
								src={profile.avatar_url}
								size={64}
								style={{
									marginBottom: 10,
									border: "1px solid #ccc",
								}}
							/>
						) : (
							<Avatar>{user?.name[0].toLocaleUpperCase()}</Avatar>
						)
					) : (
						<>
							<Upload
								type="select"
								accept="image/*"
								maxCount={1}
								beforeUpload={(file) => {
									const reader = new FileReader();
									reader.onload = () => {
										if (typeof reader.result === "string") {
											setBase64File(reader.result);
										}
									};
									reader.readAsDataURL(file);
									return false;
								}}
								fileList={undefined}
								onRemove={() => setBase64File("")}
							>
								<Button>Загрузить аватар</Button>
							</Upload>
							{base64File && (
								<div className="p-4">
									<img
										src={base64File}
										alt="Uploaded preview"
										style={{
											width: "64px",
											height: "64px",
											borderRadius: "50%",
											objectFit: "cover",
											border: "1px solid #ccc",
										}}
									/>
								</div>
							)}
						</>
					)}

					{user?.name && (
						<Typography.Title level={3}>
							{user.name}
						</Typography.Title>
					)}
				</Flex>

				<Typography.Title level={4}>Биография</Typography.Title>
				<Form.Item name="bio">
					{edit ? (
						<Input.TextArea rows={4} />
					) : (
						<Typography.Paragraph>
							{profile?.bio || "Нет информации о биографии"}
						</Typography.Paragraph>
					)}
				</Form.Item>

				<Typography.Title level={4}>Расположение</Typography.Title>
				<Form.Item name="location">
					{edit ? (
						<Input />
					) : (
						<Typography.Paragraph>
							{profile?.location ||
								"Нет информации о местоположении"}
						</Typography.Paragraph>
					)}
				</Form.Item>

				<Typography.Title level={4}>Интересы</Typography.Title>
				<Form.Item name="interests">
					{edit ? (
						<Input />
					) : (
						<Typography.Paragraph>
							{profile?.interests || "Нет интересов"}
						</Typography.Paragraph>
					)}
				</Form.Item>
			</Form>
		</div>
	);
};

export default ProfilePage;
