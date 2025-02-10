import { Button, Flex, message, Typography } from "antd";
import BlogCard, { IBlogCard } from "../Widgets/BlogCard";
import { useEffect, useState } from "react";
import axios from "axios";

const MainPage = () => {
	const [posts, setPosts] = useState<IBlogCard[]>([]);

	const getPosts = async () => {
		try {
			const res = await axios.get("http://localhost:8080/api/posts");
			if (res.data) {
				setPosts(res.data);
			}
		} catch (error) {
			console.error(error)
			message.error("Произошла ошибка, попробуйте позже");
		}
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className="min-w-full flex flex-col">
			<Flex justify="space-between" align="center">
				<Typography.Text className="text-4xl font-semibold">
					Лента
				</Typography.Text>
				<Button type="text" className="font-semibold">
					Профиль
				</Button>
			</Flex>
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
