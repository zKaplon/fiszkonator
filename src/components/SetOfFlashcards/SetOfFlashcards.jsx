import styles from "./SetOfFlashcards.module.css";
import { EditIcon } from "../icons/EditIcon/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon/DeleteIcon";

export const SetOfFlashcards = () => {
	return (
		<div className={styles.setCard}>
			<h2 className={styles.setTitle}>tytuł zestawu</h2>
			<p className={styles.setDescription}>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur
				corrupti sit reprehenderit perspiciatis animi recusandae ducimus,
			</p>
			<div className={styles.icons}>
				<EditIcon></EditIcon>
				<DeleteIcon></DeleteIcon>
			</div>
		</div>
	);
};
