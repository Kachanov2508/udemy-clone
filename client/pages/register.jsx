import { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";

const Register = () => {
	const [name, setName] = useState("Евгений");
	const [email, setEmail] = useState("kachanov2508@yandex.ru");
	const [password, setPassword] = useState("Password123");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			const { data } = await axios.post(`/api/register`, {
				name,
				email,
				password,
			});
			toast.success("Registeration successful. Please login.");
			setLoading(false);
		} catch (err) {
			toast.error(err.response.data);
			setLoading(false);
		}
	};

	return (
		<>
			<h1 className="jumbotron text-center bg-primary square">Регистрация</h1>

			<div className="container col-md-4 offset-md-4 pb-5">
				<form onSubmit={handleSubmit}>
					<input type="text" className="form-control mb-4 p-4" value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя" required />
					<input type="email" className="form-control mb-4 p-4" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
					<input type="password" className="form-control mb-4 p-4" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" required />

					<button type="submit" className="btn btn-primary btn-block" disabled={!name || !email || !password || loading}>
						{loading ? <SyncOutlined spin /> : "Регистрация"}
					</button>
				</form>

				<p className="text-center p-3">
					Уже зарегистрировались?{" "}
					<Link href="/login">
						<a>Авторизация</a>
					</Link>
				</p>
			</div>
		</>
	);
};

export default Register;
