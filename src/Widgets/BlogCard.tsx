import { Flex, Typography } from "antd";
import type { FC } from "react";
import { PostResponse } from "../Api";
import dayjs from 'dayjs';

const BlogCard: FC<PostResponse> = ({
	title,
	id,
	owner_id,
	created_at,
	content,
	image_url,
}) => {
	return (
		<div className="bg-white p-4 rounded-lg shadow-md">
			<Flex gap={12} vertical justify="space-between" className="h-full">
				<Flex gap={12} justify="space-between" align="end">
					<Typography.Title className="!mb-0" level={4}>
						{title}
					</Typography.Title>
					{owner_id && (
						<Typography.Text type="secondary">
							{dayjs(created_at).format("DD MMMM YYYY")}
						</Typography.Text>
					)}
				</Flex>

				<Typography.Paragraph>
					{content.slice(0, 25)}
				</Typography.Paragraph>
				<div>
					{image_url && (
						<img
							width={200}
							height={150}
							className="max-w-60 max-h-60"
							alt={title}
							src={image_url}
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
