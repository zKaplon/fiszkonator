import styles from "./SetOfFlashcards.module.css";
import { Button } from "../Button/Button";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export const SetOfFlashcards = ({ title, description, onEditBtnClick}) => {
	return (
		<div className={styles.setCard}>
			<h2 className={styles.setTitle}>{title}</h2>
			<p className={styles.setDescription}>{description}</p>
			<div className={styles.icons}>
				<Button
					icon={faPenToSquare}
					btnClass="editBtn"
					onClick={onEditBtnClick}
				></Button>
				<Button icon={faTrash} btnClass="deleteBtn"></Button>
			</div>
		</div>
	);
};
