import { Badge, Flex, Typography } from "antd";
import type { FC } from "react";
import { PostResponse } from "../Api";
import dayjs from "dayjs";
import { Link } from "react-router";
import { postStatus } from '../constants/statuses';

const BlogCard: FC<PostResponse & { isMy?: boolean }> = ({
	title,
	id,
	post_status,
	created_at,
	approval_status,
	content,
	image_url,
	isMy = false,
}) => {
	return (
		<Badge.Ribbon
			text={isMy ? postStatus[post_status] : null}
			placement="end"
			color="blue"
			style={{
				display: isMy ? "block" : "none",
			}}
		>
			<div className="bg-white p-4 rounded-lg shadow-md">
				<Flex
					gap={12}
					vertical
					justify="space-between"
					className="h-full"
				>
					<Flex gap={12} justify="space-between" align="end">
						<Typography.Title className="!mb-0" level={4}>
							{title}
						</Typography.Title>
						{created_at && (
							<Typography.Text type="secondary">
								{dayjs(created_at).format("DD MMMM YYYY")}
							</Typography.Text>
						)}
					</Flex>

					<Typography.Paragraph>
						{content.slice(0, 25)}
					</Typography.Paragraph>
					{isMy && (
						<Typography.Text type="secondary">
							Статус: {postStatus[approval_status]}
						</Typography.Text>
					)}
					<div>
						{image_url && (
							<img
								height={150}
								className="max-w-60 max-h-60"
								alt={title}
								src={image_url}
							/>
						)}
					</div>
					<Link to={isMy ? `/editor?id=${id}` : `/post/${id}`}>
						{isMy ? "Редактировать" : "Читать далее"}
					</Link>
				</Flex>
			</div>
		</Badge.Ribbon>
	);
};

export default BlogCard;
