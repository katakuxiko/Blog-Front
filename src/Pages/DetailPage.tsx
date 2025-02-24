import MDEditor from "@uiw/react-md-editor";
import { Typography, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { IBlogCard } from "../Widgets/BlogCard";
import { axiosInstanse } from "../axiosInstanse";

const DetailPage = () => {
	const { id } = useParams();
	const [detailData, setDetailData] = useState<IBlogCard>();

	useEffect(() => {
		const getDetail = async () => {
			try {
				const res = await axiosInstanse.get(`/api/posts/${id}`);

				if (res.data) {
					message.success("Данные получены");
					setDetailData(res.data);
				}
			} catch (error) {
				message.error("Произошла ошибка, попробуйте позже");
			}
		};

		getDetail();
	}, [id]);

	return (
		<div data-color-mode="light">
			<Typography.Title level={2}>{detailData?.title}</Typography.Title>
			<Typography.Text type="secondary">
				{dayjs(detailData?.postDate).format("DD MMMM YYYY")}
			</Typography.Text>
			<MDEditor.Markdown
				className="bg-amber-50"
				source={detailData?.content}
				style={{ whiteSpace: "pre-wrap" }}
			/>
		</div>
	);
};

export default DetailPage;
