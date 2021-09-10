import { Menu } from "antd";
import { AppstoreAddOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";

import Link from "next/link";
import { useState, useEffect } from "react";

const TopNav = () => {
	const [current, setCurrent] = useState("");

	useEffect(() => {
		process.browser && setCurrent(window.location.pathname)
	}, [process.browser && window.location.pathname])

	return (
		<>
			<Menu mode="horizontal" selectedKeys={[current]}>
				<Menu.Item key="/" onClick={e => setCurrent(e.key)} icon={<AppstoreAddOutlined />}>
					<Link href="/">
						<a>Главная</a>
					</Link>
				</Menu.Item>

				<Menu.Item key="/login" onClick={e => setCurrent(e.key)} icon={<LoginOutlined />}>
					<Link href="/login">
						<a>Авторизация</a>
					</Link>
				</Menu.Item>

				<Menu.Item key="/register" onClick={e => setCurrent(e.key)} icon={<UserOutlined />}>
					<Link href="/register">
						<a>Регистрация</a>
					</Link>
				</Menu.Item>
			</Menu>
		</>
	);
};

export default TopNav;
