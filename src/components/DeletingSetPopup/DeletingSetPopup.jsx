import { Button } from "../Button/Button";
import styles from "./DeletingSetPopup.module.css";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export const DeletingSetPopup = () => {
	return (
		<>
			<div className={styles.bgShadow}>
				<div className={styles.popupContainer}>
					<p className={styles.popupText}>
						Czy na pewno chcesz usunąć zestaw NAZWA?
					</p>
					<div className={styles.buttons}>
						<Button icon={faXmark} btnClass="declineBtn"></Button>
						<Button icon={faCheck} btnClass="confirmBtn"></Button>
					</div>
				</div>
			</div>
		</>
	);
};
