import styles from "./AddSetOfFlashcards.module.css";
import { Button } from "../Button/Button.jsx";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FlashcardInEditingMode } from "../FlashcardInEditingMode/FlashcardInEditingMode.jsx";
import { useState } from "react";

export function AddSetOfFlashcards({ onAddBtnClick, onCancelBtnClick }) {
	// const [numberOfFlashcards, setNumberOfFlashcards] = useState(1)

	const flashcardsInEditingModeBase = [
		{ concept: "aaa", definition: "aaa", id: 0 },
		{ concept: "bbb", definition: "bbb", id: 1 },
	];
	const [flashcardsInEditingMode, setFlashcardsInEditingMode] = useState(
		flashcardsInEditingModeBase
	);

	const increaseNumberOfFlashcardsInEditingMode = () => {
		setFlashcardsInEditingMode((prevBase) => [
			...prevBase,
			{
				concept: "",
				definition: "",
				id: prevBase.length > 0 ? prevBase.at(-1).id + 1 : 0,
			},
		]);
	};

	return (
		<div className={styles.editModeContainer}>
			{/* title */}
			<div className={styles.wrapper}>
				<h2 className={styles.addingSetTitle}>Dodawanie zestawu:</h2>
			</div>

			{/* info about set */}
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

			{/* flashcards in editing mode */}
			<p className={styles.addingConceptsTitle}>FISZKI:</p>

			{flashcardsInEditingMode.map((element) => {
				return (
					<FlashcardInEditingMode key={element.id}></FlashcardInEditingMode>
				);
			})}
			<div className={styles.wrapper}>
				<Button
					icon={faCirclePlus}
					btnClass={`${"addBtn"}`}
					onClick={increaseNumberOfFlashcardsInEditingMode}
				></Button>
			</div>

			{/* save, cancel btns */}
			<div className={styles.buttons}>
				<button className={styles.saveBtn} onClick={onAddBtnClick}>
					Zapisz
				</button>
				<button className={styles.cancelBtn} onClick={onCancelBtnClick}>
					Anuluj
				</button>
			</div>
		</div>
	);
}
