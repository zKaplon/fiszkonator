import styles from "./SetOfFlashcards.module.css";
import { Button } from "../Button/Button";
import { faTrash} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare} from "@fortawesome/free-solid-svg-icons";

export const SetOfFlashcards = () => {
	return (
		<div className={styles.setCard}>
			<h2 className={styles.setTitle}>tytuł zestawu</h2>
			<p className={styles.setDescription}>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur
				corrupti sit reprehenderit perspiciatis animi recusandae ducimus,
			</p>
			<div className={styles.icons}>
				<Button icon={faPenToSquare} btnClass='editBtn'></Button>
				<Button icon={faTrash} btnClass='deleteBtn'></Button>
			</div>
		</div>
	);
};
