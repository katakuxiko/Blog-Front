import { Input, message, Skeleton } from "antd"
import { useEffect, useState } from "react"
import { PostResponse } from "../Api"
import BlogCard from "../Widgets/BlogCard"
import { api } from "../apiInstanse"
import { useDebounce } from "use-debounce"

const MainPage = () => {
  const [posts, setPosts] = useState<PostResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState("")
  const [debouncedSearch] = useDebounce(searchValue, 500)

  const getPosts = async (search?: string) => {
    setLoading(true)
    try {
      const res = search
        ? await api.searchApiV1PostsSearchPostGet({
            // post_status: "published",
            // approval_status: "approved",
            query: search,
          })
        : await api.getAllPostsApiV1PostsGet({
            post_status: "published",
            approval_status: "approved",
          })

      if (res.data) setPosts(res.data)
    } catch (error) {
      console.error(error)
      message.error("Произошла ошибка, попробуйте позже")
    } finally {
      setLoading(false)
    }
  }

  // Запрос по debounce-значению
  useEffect(() => {
    getPosts(debouncedSearch)
  }, [debouncedSearch])

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className="min-w-full flex flex-col">
      <Input.Search
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Поиск..."
      />

      <div
        className="grid grid-cols-2 gap-4 mt-4"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {posts.length === 0 && !loading && (
          <div className="flex justify-center items-center h-24">
            <p>Нет постов</p>
          </div>
        )}

        {loading ? (
          <>
            <Skeleton active title={false} paragraph={{ rows: 8 }} />
            <Skeleton active title={false} paragraph={{ rows: 8 }} />
            <Skeleton active title={false} paragraph={{ rows: 8 }} />
          </>
        ) : (
          posts.map(({ id, ...rest }) => (
            <BlogCard key={id} id={id} {...rest} />
          ))
        )}
      </div>
    </div>
  )
}

export default MainPage
