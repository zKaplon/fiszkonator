import { Button } from "../Button/Button";
import styles from "./DeletingSetPopup.module.css";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export const DeletingSetPopup = ({ onConfirmBtnClick, onDeclineBtnClick, deletingSet }) => {
	return (
		<>
			<div className={styles.bgShadow}>
				<div className={styles.popupContainer}>
					<p className={styles.popupText}>
						Czy na pewno chcesz usunąć zestaw {deletingSet.title}?
					</p>
					<div className={styles.buttons}>
						<Button
							icon={faXmark}
							btnClass="declineBtn"
							onClick={onDeclineBtnClick}
						></Button>
						<Button
							icon={faCheck}
							btnClass="confirmBtn"
							onClick={onConfirmBtnClick}
						></Button>
					</div>
				</div>
			</div>
		</>
	);
};
