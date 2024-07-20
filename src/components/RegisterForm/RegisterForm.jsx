import { useState } from "react";
// import { Button } from "../Button/Button";
import styles from "./RegisterForm.module.css";
// import { Icon } from "../Icon/Icon";
// import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export const RegisterForm = ({ showLoginForm, changeIsRegisterFormShown }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleRegister = async (e) => {
		e.preventDefault();
		const auth = getAuth();
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			console.log("User registered:", user);

			// Zapisz dodatkowe dane użytkownika do Firestore
			await addDoc(collection(db, "users"), {
				uid: user.uid,
				email: user.email,
				createdAt: new Date(),
			});
			console.log("User data saved to Firestore");
		} catch (error) {
			console.error("Error registering user:", error);
		}
	};

	return (
		<>
			<div className={styles.wrapper}>
				<form action="" onSubmit={handleRegister}>
					<h1>zarejestruj się</h1>
					<div className={styles.inputBox}>
						<input
							type="text"
							placeholder="E-mail"
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
						{/* <Icon icon={faUser} className={styles.icon}></Icon> */}
					</div>
					<div className={styles.inputBox}>
						<input
							type="password"
							placeholder="Hasło"
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
						{/* <Icon icon={faLock} className={styles.icon}></Icon> */}
					</div>

					<div className={styles.rememberForgot}>
						<label>
							<input type="checkbox" />
							Zapamiętaj
						</label>
						<a href="#">Zapomniałeś hasła?</a>
					</div>

					<button type="submit" className={styles.btn}>
						Zarejestruj
					</button>

					<div className={styles.registerLink}>
						<p>
							Masz konto?{" "}
							<a onClick={() => {showLoginForm();changeIsRegisterFormShown();}}>
								Zaloguj się
							</a>
						</p>
					</div>
				</form>
			</div>
		</>
	);
};
