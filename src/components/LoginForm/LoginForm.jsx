// import { Icon } from "../Icon/Icon";
import { useState } from "react";
import { Button } from "../Button/Button";
import styles from "./LoginForm.module.css";
// import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

export const LoginForm = ({showMenu}) => {
	const [isFormShown, setIsFormShown] = useState(false);

	const showForm = () => {
		setIsFormShown(true);
	};


	return (
		<>
			{isFormShown ? (
				<div className={styles.wrapper}>
					<form action="">
						<h1>zaloguj się</h1>
						<div className={styles.inputBox}>
							<input type="text" placeholder="Nazwa użytkownika" required />
							{/* <Icon icon={faUser} className={styles.icon}></Icon> */}
						</div>
						<div className={styles.inputBox}>
							<input type="password" placeholder="Hasło" required />
							{/* <Icon icon={faLock} className={styles.icon}></Icon> */}
						</div>

						<div className={styles.rememberForgot}>
							<label>
								<input type="checkbox" />
								Zapamiętaj
							</label>
							<a href="#">Zapomniałeś hasła?</a>
						</div>

						<button type="submit" className={styles.btn} onClick={showMenu}>
							Zaloguj
						</button>

						<div className={styles.registerLink}>
							<p>
								Nie masz konta? <a href="#">Zarejestruj się</a>
							</p>
						</div>
					</form>
				</div>
			) : (
				<div className={styles.buttons}>
					<Button
						text="Zaloguj się"
						btnClass="loginBtn"
						onClick={showForm}
					></Button>
					<Button text="Wejdź jako gość" btnClass="guestBtn" onClick={showMenu}></Button>
				</div>
			)}
		</>
	);
};
