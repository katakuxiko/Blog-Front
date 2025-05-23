import { Button, Drawer, Flex, Spin, Typography } from "antd"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router"
import { MenuOutlined } from "@ant-design/icons"
import useUserStore from "../../Store/userStore"
import { instance } from "../../apiInstanse"
import { Avatar } from "antd"

const MainLayout = () => {
  const navigate = useNavigate()
  const { setUser, user, profile } = useUserStore()
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const menu = [
    { title: "Главная", path: "/" },
    ...(user
      ? [
          { title: "Профиль", path: "/profile" },
          { title: "Мои публикации", path: "/mypost" },
          { title: "Редактор", path: "/editor" },
        ]
      : []),
    ...(user?.role === "ADMIN" || user?.role === "MODERATOR"
      ? [{ title: "На модерацию", path: "/moderate" }]
      : []),
  ]

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      if (location.pathname !== "/") {
        navigate("/auth/login")
      }
      setLoading(false)
      return
    }
    if (!user) {
      setUser(token)
    }

    setLoading(false)
  }, [navigate, setUser])

  if (loading) {
    return (
      <div className="w-full h-dvh flex justify-center items-center">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div className="bg-indigo-100 min-h-dvh flex justify-center items-start relative ">
      <header className="w-full absolute z-50">
        <div className="p-4 sm:!hidden md:!flex bg-white justify-center items-center">
          <div className="max-w-4xl w-full flex gap-2">
            {profile?.avatar_url ? <Avatar src={profile?.avatar_url}></Avatar>: user ? <Avatar>{user?.name[0].toLocaleUpperCase()}</Avatar>: <Typography.Title level={3}>Blog</Typography.Title>}
            {user?.name  && (
              <Typography.Title level={3} >{user.name}</Typography.Title>
            )}
          </div>
        </div>

        <Flex
          align="center"
          justify="space-between"
          className="fixed top-0 z-50 left-0 md:!hidden h-14 !p-6 bg-white w-full shadow-lg"
        >
          <MenuOutlined
            onClick={() => {
              setMenuOpen(true)
            }}
          />
          <Typography.Text className="!text-2xl">{user?.name}</Typography.Text>
        </Flex>
        <div className="block md:!hidden h-8" />
        <Drawer
          closeIcon={null}
          title="Меню"
          placement="left"
          width="70%"
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        >
          <Flex vertical gap={12} className="h-full" justify="space-between">
            <Flex vertical gap={12}>
              {menu.map(({ title, path }) => (
                <NavLink
                  key={title}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`text-xl font-semibold hover:!text-blue-500 ${
                    location.pathname === path
                      ? "!text-gray-950 "
                      : "!text-gray-600"
                  }`}
                >
                  {title}
                </NavLink>
              ))}
            </Flex>
            <Button
              color="danger"
              type="primary"
              size="large"
              onClick={() => {
                if (user) {
                  localStorage.removeItem("token")
                  navigate("/auth/login")
                  instance.defaults.headers.common.Authorization = ""
                } else {
                  navigate("/auth/login")
                }
              }}
            >
              {user ? "Выйти" : "Войти"}
            </Button>
          </Flex>
        </Drawer>
      </header>
      <div className="w-full mb-12 pt-12  flex justify-center items-center flex-col">
        <div className="sticky left-0 bg-white p-4 w-full z-50 top-0 shadow-lg hidden md:!block">
          <div className="hidden md:block justify-items-center items-center ">
            <Flex
              justify="space-between"
              align="center"
              className="max-w-4xl w-full "
            >
              <Flex gap={12}>
                {menu.map(({ title, path }) => (
                  <NavLink
                    key={title}
                    to={path}
                    className={`text-xl font-semibold hover:!text-blue-500 ${
                      location.pathname === path
                        ? "!text-gray-950 "
                        : "!text-gray-600"
                    }`}
                  >
                    {title}
                  </NavLink>
                ))}
              </Flex>

              <Button
                color="danger"
                type="text"
                onClick={() => {
                  if (user) {
                    localStorage.removeItem("token")
                    navigate("/auth/login")
                    instance.defaults.headers.common.Authorization = ""
                  } else {
                    navigate("/auth/login")
                  }
                }}
              >
                {user ? "Выйти" : "Войти"}
              </Button>
            </Flex>
          </div>
        </div>
        <div className="max-w-4xl bg-white p-4 w-full shadow-lg min-h-dvh mt-4 rounded-2xl">
          <Outlet />

          <footer className="text-center text-gray-500 text-sm bottom-4 mt-4 w-full left-0 absolute">
            <div>{dayjs().format("YYYY")}</div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
