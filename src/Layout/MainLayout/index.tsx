import { Button, Drawer, Flex, Spin, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { MenuOutlined } from "@ant-design/icons";
import useUserStore from "../../Store/userStore";
import { instance } from '../../apiInstanse';

const MainLayout = () => {
  const navigate = useNavigate();
  const { setUser, user } = useUserStore();

  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth/login");
      return;
    }

    setUser(token);

    setLoading(false);
  }, [navigate, setUser]);

  if (loading) {
    return (
      <div className="w-full h-dvh flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-indigo-100 min-h-dvh flex justify-center items-start relative">
      <header className="w-full absolute z-50">
        <div className="p-4 md:!hidden  bg-white">Blog</div>

        <Flex
          align="center"
          justify="space-between"
          className="fixed top-0 z-50 left-0 md:!hidden h-14 !p-6 bg-white w-full border-b-gray-700 border-b-[0.2px]"
        >
          <MenuOutlined
            onClick={() => {
              setMenuOpen(true);
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
              <NavLink
                to="/"
                className=" !text-gray-950 text-xl font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                Главная
              </NavLink>
              <NavLink
                to="/editor"
                className="!text-gray-950 text-xl font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                Редактор
              </NavLink>
            </Flex>
            <Button
              color="danger"
              type="primary"
              size="large"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/auth/login");
                instance.defaults.headers.common.Authorization = "";
              }}
            >
              Выйти
            </Button>
          </Flex>
        </Drawer>
      </header>
      <div className="w-full mb-16 pt-12  flex justify-center items-center flex-col">
        <div className="sticky left-0 bg-white p-4 w-full z-50 top-0">
          <div className="hidden md:block">
            <Flex justify="space-between" align="center">
              <Flex gap={12}>
                <NavLink
                  to="/"
                  className="!text-gray-950 text-xl font-semibold"
                >
                  Главная
                </NavLink>

                <NavLink
                  to="/editor"
                  className="!text-gray-950 text-xl font-semibold"
                >
                  Редактор
                </NavLink>
              </Flex>

              <Button
                color="danger"
                type="text"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/auth/login");
                  instance.defaults.headers.common.Authorization = "";
                }}
              >
                Выйти
              </Button>
            </Flex>
          </div>
        </div>
        <div className="max-w-4xl bg-white p-4 w-full shadow-lg min-h-dvh mt-4 mb-24 rounded-2xl">
          <Outlet />

          <footer className="text-center text-gray-500 text-sm bottom-4 mt-4 w-full left-0 absolute">
            <div>{dayjs().format("YYYY")}</div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
