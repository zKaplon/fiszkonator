import styles from "./AddSetOfFlashcards.module.css";
import { Button } from "../Button/Button.jsx";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export function AddSetOfFlashcards() {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h2 className={styles.addingSetTitle}>Dodawanie zestawu:</h2>
			</div>
			<div className={styles.oneInfo}>
				<label htmlFor="nameOfSet" className={styles.label}>
					NAZWA ZESTAWU:
				</label>
				<input type="text" id="nameOfSet" className={styles.input} />
			</div>
			<div className={styles.oneInfo}>
				<label htmlFor="descriptionOfSet" className={styles.label}>
					OPIS:
				</label>
				<textarea id="descriptionOfSet" className={styles.textarea}></textarea>
			</div>

			{/* dodawanie fiszek */}
			<p className={styles.addingConceptsTitle}>FISZKI:</p>
			<div className={styles.addingConcepts}>
				<div className={styles.conceptContainer}>
					<input type="text" id="concept" />
					<label htmlFor="concept">POJĘCIE</label>
				</div>

				<div className={styles.definitionContainer}>
					<input type="text" id="definition" />
					<label htmlFor="definition">DEFINICJA</label>
				</div>
			</div>

			<div className={styles.wrapper}>
				<Button icon={faCirclePlus} btnClass={`${"addBtn"}`}></Button>
			</div>

			<div className={styles.buttons}>
				<button className={styles.saveBtn}>Zapisz</button>
				<button className={styles.cancelBtn}>Anuluj</button>
			</div>
		</div>
	);
}
