import { message } from "antd";
import { useEffect, useState } from "react";
import BlogCard, { type IBlogCard } from "../Widgets/BlogCard";
import { axiosInstanse } from "../axiosInstanse";

const MainPage = () => {
	const [posts, setPosts] = useState<IBlogCard[]>([]);

	useEffect(() => {
		const getPosts = async () => {
			try {
				const res = await axiosInstanse.get("/api/posts");
				if (res.data) {
					setPosts(res.data);
				}
			} catch (error) {
				console.error(error);
				message.error("Произошла ошибка, попробуйте позже");
			}
		};

		getPosts();
	}, []);

	return (
		<div className="min-w-full flex flex-col">
			<div
				className="grid grid-cols-2 gap-4"
				style={{
					gridTemplateColumns:
						"repeat(auto-fill, minmax(300px, 1fr))",
				}}
			>
				{posts.map(({ id, ...rest }) => (
					<BlogCard key={id} id={id} {...rest} />
				))}
			</div>
		</div>
	);
};

export default MainPage;
