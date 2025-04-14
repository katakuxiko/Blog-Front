import { message, Skeleton } from "antd";
import { useEffect, useState } from "react";
import BlogCard, { type IBlogCard } from "../Widgets/BlogCard";
import { api } from '../apiInstanse';
import { PostResponse } from '../Api';

const MainPage = () => {
	const [posts, setPosts] = useState<PostResponse[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getPosts = async () => {
			setLoading(true);
			try {
				const res = await api.getAllPostsApiV1PostsGet({});
				if (res.data) {
					setPosts(res.data);
				}
			} catch (error) {
				console.error(error);
				message.error("Произошла ошибка, попробуйте позже");
			} finally {
				setLoading(false);
			}
		};

		getPosts();
	}, []);

	return (
		<div className="min-w-full flex flex-col">
			<div
				className="grid grid-cols-2 gap-4 mt-4"
				style={{
					gridTemplateColumns:
						"repeat(auto-fill, minmax(300px, 1fr))",
				}}
			>
				{loading ? (
					<>
						<Skeleton
							active
							title={false}
							paragraph={{
								rows: 8,
							}}
						/>
						<Skeleton
							active
							title={false}
							paragraph={{
								rows: 8,
							}}
						/>
						<Skeleton
							active
							title={false}
							paragraph={{
								rows: 8,
							}}
						/>
					</>
				) : (
					posts.map(({ id, ...rest }) => (
						<BlogCard key={id} id={id} {...rest} />
					))
				)}
			</div>
		</div>
	);
};

export default MainPage;
