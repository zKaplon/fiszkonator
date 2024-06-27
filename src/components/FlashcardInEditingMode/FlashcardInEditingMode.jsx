import { Button } from "../Button/Button";
import styles from "./FlashcardInEditingMode.module.css";
import { faX } from "@fortawesome/free-solid-svg-icons";

export function FlashcardInEditingMode() {
	return (
		<div className={styles.flashcardInEditingMode}>
			<div className={styles.conceptContainer}>
				<input type="text" id="concept" />
				<label htmlFor="concept">POJĘCIE</label>
			</div>

			<div className={styles.definitionContainer}>
				<input type="text" id="definition" />
				<label htmlFor="definition">DEFINICJA</label>
			</div>

			<Button icon={faX} btnClass="xBtn"></Button>
		</div>
	);
}
