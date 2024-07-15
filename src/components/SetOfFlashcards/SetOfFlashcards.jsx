import styles from "./SetOfFlashcards.module.css";
import { Button } from "../Button/Button";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export const SetOfFlashcards = ({
	title,
	description,
	onEditBtnClick,
	onDeleteBtnClick,
	onSetClick,
}) => {
	return (
		<div className={styles.setCard} onClick={onSetClick}>
			<h2 className={styles.setTitle}>{title}</h2>
			<p className={styles.setDescription}>{description}</p>
			<div className={styles.icons}>
				<Button
					icon={faPenToSquare}
					btnClass="editBtn"
					onClick={(e) => {
						e.stopPropagation();
						onEditBtnClick();
					}}
				></Button>
				<Button
					icon={faTrash}
					btnClass="deleteBtn"
					onClick={(e) => {
						e.stopPropagation();
						onDeleteBtnClick();
					}}
				></Button>
			</div>
		</div>
	);
};
