import { useState, useContext } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";

const Login = () => {
	const [email, setEmail] = useState("kachanov2508@yandex.ru");
	const [password, setPassword] = useState("Password123");
	const [loading, setLoading] = useState(false);

	// state
	const { state, dispatch } = useContext(Context);
	console.log("STATE", state);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			const { data } = await axios.post(`/api/login`, {
				email,
				password,
			});
			// console.log("LOGN RESPONSE", data);
			dispatch({
				type: "LOGIN",
				payload: data,
			})
			// setLoading(false);
		} catch (err) {
			toast.error(err.response.data);
			setLoading(false);
		}
	};

	return (
		<>
			<h1 className="jumbotron text-center bg-primary square">Авторизация</h1>

			<div className="container col-md-4 offset-md-4 pb-5">
				<form onSubmit={handleSubmit}>
					<input type="email" className="form-control mb-4 p-4" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />
					<input type="password" className="form-control mb-4 p-4" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required />

					<button type="submit" className="btn btn-primary btn-block" disabled={!email || !password || loading}>
						{loading ? <SyncOutlined spin /> : "Войти"}
					</button>
				</form>

				<p className="text-center p-3">
					Не зареристрированны?{" "}
					<Link href="/register">
						<a>Регистрация</a>
					</Link>
				</p>
			</div>
		</>
	);
};

export default Login;
