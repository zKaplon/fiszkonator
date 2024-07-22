import { useState } from "react";
// import { Button } from "../Button/Button";
import styles from "./RegisterForm.module.css";
import { Icon } from "../Icon/Icon";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export const RegisterForm = ({ showLoginForm, changeIsRegisterFormShown }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleRegister = async (e) => {
		e.preventDefault();
		const auth = getAuth();

		const errorText = document.querySelector(".errorText");

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			console.log("User registered:", user);

			await addDoc(collection(db, "users"), {
				uid: user.uid,
				email: user.email,
				createdAt: new Date(),
			});
			console.log("User data saved to Firestore");
			errorText.textContent = ``;

			changeIsRegisterFormShown();
		} catch (error) {
			console.error("Error registering user:", error);

			if (error == "FirebaseError: Firebase: Error (auth/invalid-email).") {
				errorText.textContent = `Nieprawidłowy email!`;
			} else if (
				error ==
				"FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)."
			) {
				errorText.textContent = `Hasło powinno mieć co najmniej 6 znaków!`;
			} else if (
				error == "FirebaseError: Firebase: Error (auth/email-already-in-use)."
			) {
				errorText.textContent = `Ten email jest już przypisany do konta!`;
			} else {
				errorText.textContent = "Wystąpił błąd!";
			}
		}
	};

	return (
		<>
			<div className={styles.wrapper}>
				<form action="" onSubmit={handleRegister}>
					<h1>zarejestruj się</h1>


					<div className={styles.inputBox}>
						<Icon icon={faUser}></Icon>
						<input
							type="text"
							placeholder="E-mail"
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>


					<div className={styles.inputBox}>
						<input
							type="password"
							placeholder="Hasło"
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Icon icon={faLock}></Icon>
					</div>

					<p className={`errorText ${styles.errorText}`}></p>

					<button type="submit" className={styles.btn}>
						Zarejestruj
					</button>

					<div className={styles.registerLink}>
						<p>
							Masz konto?{" "}
							<a
								onClick={() => {
									showLoginForm();
									changeIsRegisterFormShown();
								}}
							>
								Zaloguj się
							</a>
						</p>
					</div>
				</form>
			</div>
		</>
	);
};
