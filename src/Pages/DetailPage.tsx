import MDEditor from "@uiw/react-md-editor";
import { Typography, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../apiInstanse";
import { PostResponse } from "../Api";

const DetailPage = () => {
	const { id } = useParams();
	const [detailData, setDetailData] = useState<PostResponse>();

	useEffect(() => {
		const getDetail = async () => {
			if (!id) {
				message.error("Не удалось получить данные поста");
				return;
			}

			try {
				const res = await api.getPostApiV1PostsPostIdGet(+id, {});

				if (res.data) {
					setDetailData(res.data);
				}
			} catch (error) {
				console.error(error);
				message.error("Произошла ошибка, попробуйте позже");
			}
		};

		getDetail();
	}, [id]);

	return (
		<div data-color-mode="light">
			<Typography.Title level={2}>{detailData?.title}</Typography.Title>
			<Typography.Text type="secondary">
				{dayjs(detailData?.created_at).format("DD MMMM YYYY")}
			</Typography.Text>
			{detailData?.image_url && (
				<div className="p-4">
					<img
						src={detailData.image_url}
						style={{ maxHeight: "500px" }}
					/>
				</div>
			)}
			<MDEditor.Markdown
				className="bg-amber-50"
				source={detailData?.content}
				style={{ whiteSpace: "pre-wrap" }}
			/>
		</div>
	);
};

export default DetailPage;
