import { useState, useEffect } from "react";
import { Button } from "../Button/Button";
import styles from "./LoginForm.module.css";
import { Icon } from "../Icon/Icon";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const LoginForm = ({ showMenu, saveUserData }) => {
	const [isLoginFormShown, setIsLoginFormShown] = useState(false);
	const [isRegisterFormShown, setIsRegisterFormShown] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);

	useEffect(() => {
		const savedEmail = localStorage.getItem("email");
		const savedPassword = localStorage.getItem("password");
		if (savedEmail && savedPassword) {
			setEmail(savedEmail);
			setPassword(savedPassword);
			setRememberMe(true);
		}
	}, []);

	const showLoginForm = () => {
		setIsLoginFormShown(true);
	};

	const changeIsRegisterFormShown = () => {
		setIsRegisterFormShown((prevValue) => !prevValue);
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		const auth = getAuth();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			console.log("User logged in");
			const newUserData = {
				email: email,
				// password: password,
			};
			saveUserData(newUserData);
			showMenu();

			const sessionData = {
				userData: newUserData,
				sets: [],
			};
			const sessionExpiry = new Date().getTime() + 1 * 1000; // 30 sekund
			localStorage.setItem("sessionData", JSON.stringify(sessionData));
			localStorage.setItem("sessionExpiry", sessionExpiry.toString());

			if (rememberMe) {
				localStorage.setItem("email", email);
				localStorage.setItem("password", password);
			} else {
				localStorage.removeItem("email");
				localStorage.removeItem("password");
			}
		} catch (error) {
			document.querySelector(
				`.errorText`
			).textContent = `Nieprawidłowy email i/lub hasło!`;
		}
	};

	const handleRememberMeChange = () => {
		setRememberMe(!rememberMe);
	};

	return (
		<>
			{isRegisterFormShown ? (
				<RegisterForm
					showLoginForm={showLoginForm}
					changeIsRegisterFormShown={changeIsRegisterFormShown}
				></RegisterForm>
			) : isLoginFormShown ? (
				<div className={styles.wrapper}>
					<form action="" onSubmit={handleLogin}>
						<h1>zaloguj się</h1>
						<div className={styles.inputBox}>
							<input
								type="text"
								placeholder="E-mail"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Icon icon={faUser}></Icon>
						</div>
						<div className={styles.inputBox}>
							<input
								type="password"
								placeholder="Hasło"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Icon icon={faLock}></Icon>
						</div>

						<div className={styles.rememberForgot}>
							<label>
								<input
									type="checkbox"
									checked={rememberMe}
									onChange={handleRememberMeChange}
								/>
								Zapamiętaj
							</label>
							<a href="#">Zapomniałeś hasła?</a>
						</div>
						<p className={`errorText ${styles.errorText}`}></p>
						<button type="submit" className={styles.btn}>
							Zaloguj
						</button>

						<div className={styles.registerLink}>
							<p>
								Nie masz konta?{" "}
								<a onClick={changeIsRegisterFormShown}>Zarejestruj się</a>
							</p>
						</div>
					</form>
				</div>
			) : (
				<div className={styles.buttons}>
					<Button
						text="Zaloguj się"
						btnClass="loginBtn"
						onClick={showLoginForm}
					></Button>
					<Button
						text="Wejdź jako gość"
						btnClass="guestBtn"
						onClick={showMenu}
					></Button>
				</div>
			)}
		</>
	);
};
