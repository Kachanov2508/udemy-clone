import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu } from "antd";
import { AppstoreAddOutlined, LoginOutlined, LogoutOutlined, UserOutlined, CoffeeOutlined } from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
	const [current, setCurrent] = useState("");

	const { state, dispatch } = useContext(Context);
	const { user } = state;

	const router = useRouter();

	useEffect(() => {
		process.browser && setCurrent(window.location.pathname);
	}, [process.browser && window.location.pathname]);

	const logout = async () => {
		dispatch({ type: "LOGOUT" });
		window.localStorage.removeItem("user");
		const { data } = await axios.get("/api/logout");
		// toast(data.message);
		router.push("/login");
	}

	return (
		<>
			<Menu mode="horizontal" selectedKeys={[current]} className="d-block">
				<Item key="1" onClick={(e) => setCurrent(e.key)} icon={<AppstoreAddOutlined />}>
					<Link href="/">
						<a>Главная</a>
					</Link>
				</Item>
				{user === null && (
					<>
						<Item key="2" onClick={(e) => setCurrent(e.key)} icon={<LoginOutlined />}>
							<Link href="/login">
								<a>Авторизация</a>
							</Link>
						</Item>

						<Item key="4" onClick={(e) => setCurrent(e.key)} icon={<UserOutlined />}>
							<Link href="/register">
								<a>Регистрация</a>
							</Link>
						</Item>
					</>
				)}

				{user !== null && (
					<SubMenu icon={<CoffeeOutlined />} title={user && user.name} key="5" className="float-right" >
						<ItemGroup>
							<Item key="/user">
								<Link href="/user">
									<a>Dashboard</a>
								</Link>
							</Item>
							<Item key="6" onClick={logout} >
								Выход
							</Item>
						</ItemGroup>
					</SubMenu>
				)}
			</Menu>
		</>
	);
};

export default TopNav;
