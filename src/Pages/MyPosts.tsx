import { useEffect, useState } from "react";
import { PostResponse } from "../Api";
import { api } from "../apiInstanse";
import { Empty, message, Spin } from "antd";
import BlogCard from "../Widgets/BlogCard";

const MyPosts = () => {
	const [posts, setPosts] = useState<PostResponse[]>([]);

	const [loading, setLoading] = useState(true);

	const getPosts = async () => {
		setLoading(true);
		try {
			const res = await api.getMyPostsApiV1PostsMyGet();
			if (res.data) {
				setPosts(res.data);
			}
		} catch (error) {
			message.warning("Не удалось получить данные постов");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div>

			{loading ? (
				<div className="flex justify-center items-center h-24">
					<Spin size="large" />
				</div>
			) : null}{" "}
			{!loading && posts.length === 0 && <Empty />}
			{!loading && posts.length > 0 && (
				<div
					className="grid grid-cols-2 gap-4 mt-4"
					style={{
						gridTemplateColumns:
							"repeat(auto-fill, minmax(300px, 1fr))",
					}}
				>
					{posts.map(({ id, ...rest }) => (
						<BlogCard isMy key={id} id={id} {...rest} />
					))}
				</div>
			)}
		</div>
	);
};

export default MyPosts;
