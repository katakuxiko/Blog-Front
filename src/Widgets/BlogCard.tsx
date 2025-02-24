import { Divider, Flex, Typography } from "antd";
import type { FC } from "react";

export interface IBlogCard {
	id: number;
	title: string;
	content: string;
	author?: string | null;
	image?: string | null;
	category?: string | null;
	tags?: string[] | null;
	postDate?: string | null;
	description?: string | null;
}

const BlogCard: FC<IBlogCard> = ({ title, description, id, image, author }) => {
	return (
		<div className="bg-white p-4 rounded-lg shadow-md">
			<Flex gap={12} vertical>
				<Flex gap={12} justify="space-between">
					<Typography.Title level={4}>{title}</Typography.Title>
					{author && (
						<Typography.Text type="secondary">
							{author}
						</Typography.Text>
					)}
				</Flex>

				<Typography.Paragraph>{description}</Typography.Paragraph>
				<div>
					{image && (
						<img
							className="max-w-60 max-h-60"
							alt={description ?? ""}
							src={image}
						/>
					)}
				</div>
				<Typography.Link href={`/post/${id}`}>
					Узнать детали
				</Typography.Link>
			</Flex>
		</div>
	);
};

export default BlogCard;
