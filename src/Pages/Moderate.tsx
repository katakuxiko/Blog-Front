import { useEffect, useState } from "react";
import { PostResponse } from "../Api";
import { api } from "../apiInstanse";
import { Button, Empty, Flex, message, Spin, Typography } from "antd";
import dayjs from "dayjs";

const Moderate = () => {
	const [posts, setPosts] = useState<PostResponse[]>([]);
	const [loading, setLoading] = useState(true);

	const getPosts = async () => {
		setLoading(true);
		try {
			const res = await api.getAllPostsApiV1PostsGet({
				approval_status: "pending",
				post_status: "published",
			});
			if (res.data) {
				setPosts(res.data);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const approveOrRejectPost = async (
		id: number,
		status: "approved" | "rejected"
	) => {
		try {
			const res = await api.moderatePostApiV1PostsModeratePostIdPatch(
				id,
				{
					approval_status: status,
				}
			);

			if (res.data) {
				message.success("Пост успешно обработан");
				getPosts();
			}
		} catch (error) {
			console.error(error);
			message.error("Не удалось обработать пост");
		}
	};

	useEffect(() => {
		getPosts();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-24">
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div>
			<Typography.Title level={2} className="text-center">
				Посты на модерации
			</Typography.Title>

			{posts.length === 0 && (
				<div className="flex justify-center items-center  mt-12">
					<Empty description="Нет постов на модерации" />
				</div>
			)}

			<div>
				{posts?.map((post) => {
					return (
						<div
							key={post.id}
							className="border border-gray-300 p-4 mb-4 rounded"
						>
							<Typography.Title level={4}>
								{post.title}
							</Typography.Title>
							<Typography.Paragraph>
								{post.content.slice(0, 100)}
							</Typography.Paragraph>
							<Typography.Text type="secondary">
								{dayjs(post.created_at).format("DD MMMM YYYY")}
							</Typography.Text>
							<div className="mt-4">
								<Flex align="center" justify="space-between">
									<Flex gap={12}>
										<Button
											onClick={() =>
												approveOrRejectPost(
													post.id,
													"approved"
												)
											}
											type="primary"
										>
											Разрешить
										</Button>
										<Button
											onClick={() =>
												approveOrRejectPost(
													post.id,
													"rejected"
												)
											}
											type="text"
										>
											Запретить
										</Button>
									</Flex>

									<div className="flex justify-end mt-2">
										<Typography.Link
											href={`/post/${post.id}`}
										>
											Читать далее
										</Typography.Link>
									</div>
								</Flex>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Moderate;
