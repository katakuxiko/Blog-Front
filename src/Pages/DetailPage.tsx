import MDEditor from "@uiw/react-md-editor"
import { Button, Flex, Form, Spin, Typography, message } from "antd"
import { useForm } from "antd/es/form/Form"
import TextArea from "antd/es/input/TextArea"
import { AxiosError } from "axios"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { CommentResponse, PostResponse } from "../Api"
import { api } from "../apiInstanse"
import useUserStore from "../Store/userStore"

const DetailPage = () => {
  const { id } = useParams()
  const [detailData, setDetailData] = useState<PostResponse>()
  const [comments, setComments] = useState<CommentResponse[]>([])
  const { user } = useUserStore()
  const [loading, setLoading] = useState(true)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [form] = useForm()
  const [messageApi, contextHolder] = message.useMessage()

  const getComments = async () => {
    if (!id) {
      messageApi.error("Не удалось получить данные поста")
      return
    }
    try {
      const res = await api.getCommentsForPostApiV1CommentsPostsPostIdGet(
        +id,
        {}
      )

      if (res.data) {
        setComments(res.data)
      }
    } catch (error) {
      console.error(error)
      messageApi.error("Произошла ошибка, попробуйте позже")
    }
  }

  useEffect(() => {
    const getDetail = async () => {
      setLoading(true)
      if (!id) {
        messageApi.error("Не удалось получить данные поста")
        return
      }

      try {
        const res = await api.getPostApiV1PostsPostIdGet(+id, {})

        if (res.data) {
          setDetailData(res.data)
        }
      } catch (error) {
        console.error(error)
        messageApi.error("Произошла ошибка, попробуйте позже")
      } finally {
        setLoading(false)
      }
    }

    getDetail()
    getComments()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-24">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div data-color-mode="light">
      {contextHolder}
      <Typography.Title level={2}>{detailData?.title}</Typography.Title>
      <Typography.Text type="secondary">
        {dayjs(detailData?.created_at).format("DD MMMM YYYY")}
      </Typography.Text>
      {detailData?.image_url && (
        <div className="p-4">
          <img src={detailData.image_url} style={{ maxHeight: "500px" }} />
        </div>
      )}
      <MDEditor.Markdown
        className="bg-amber-50"
        source={detailData?.content}
        style={{ whiteSpace: "pre-wrap" }}
      />

      <section className="mt-8">
        <Typography.Title level={3}>Комментарии</Typography.Title>

        <div className="flex flex-col gap-4">
          <Form
            form={form}
            disabled={!id || !user}
            onFinish={async (val) => {
              setButtonLoading(true)
              if (id) {
                try {
                  const res = await api.createCommentApiV1CommentsPost(
                    { post_id: +id },
                    {
                      content: val.comment,
                    }
                  )
                  if (res.data) {
                    getComments()
                    messageApi.success("Комментарий успешно добавлен")
                    form.resetFields()
                  }
                } catch (error) {
                  if (error instanceof AxiosError) {
                    if (error.response?.status === 401) {
                      messageApi.warning(error.response.data)
                    }
                  }
                  console.error(error)
                } finally {
                  setButtonLoading(false)
                }
              }
            }}
          >
            <Flex vertical gap={12}>
              <Form.Item
                name="comment"
                required={false}
                rules={[
                  {
                    required: true,
                    message: "Обязательное поле",
                  },
                ]}
              >
                <TextArea size="large" placeholder="Введите ваш комментарий" />
              </Form.Item>
              <Button
                loading={buttonLoading}
                size="large"
                type="primary"
                className="self-end mt-[-24px]"
                htmlType="submit"
              >
                Опубликовать
              </Button>
            </Flex>
          </Form>
          {comments?.map((comment) => (
            <div key={comment.id} className="px-4 py-2 bg-gray-100 rounded-lg">
              <Typography.Text strong>{comment.owner_username}</Typography.Text>
              <Typography.Paragraph
                ellipsis={{
                  rows: 2,
                  expandable: true,
                  symbol(expanded) {
                    return expanded ? "Свернуть" : "Развернуть"
                  },
                }}
              >
                {comment.content}
              </Typography.Paragraph>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DetailPage
