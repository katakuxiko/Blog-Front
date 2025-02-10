import { message, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IBlogCard } from "../Widgets/BlogCard";
import MDEditor from "@uiw/react-md-editor";
import dayjs from "dayjs";

const DetailPage = () => {
	const { id } = useParams();
	console.log(id);
	const [detailData, setDetailData] = useState<IBlogCard>();

	const getDetail = async () => {
		try {
			const res = await axios.get(
				`http://localhost:8080/api/posts/${id}`
			);

			if (res.data) {
				message.success("Данные получены");
				setDetailData(res.data);
			}
		} catch (error) {
			message.error("Произошла ошибка, попробуйте позже");
		}
	};

	useEffect(() => {
		getDetail();
	}, []);

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
