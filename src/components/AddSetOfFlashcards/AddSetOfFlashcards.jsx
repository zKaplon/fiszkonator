import styles from "./AddSetOfFlashcards.module.css";
import { Button } from "../Button/Button.jsx";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FlashcardInEditingMode } from "../FlashcardInEditingMode/FlashcardInEditingMode.jsx";
import { useState } from "react";

export function AddSetOfFlashcards({ onSaveBtnClick, onCancelBtnClick }) {
	const [flashcardsInEditingMode, setFlashcardsInEditingMode] = useState([]);

	const updateFlashcard = (id, concept, definition) => {
		setFlashcardsInEditingMode((prevBase) => {
			const updatedBase = prevBase.map((flashcard) =>
				flashcard.id === id ? { ...flashcard, concept, definition } : flashcard
			);
			return updatedBase;
		});
	};

	const increaseNumberOfFlashcardsInEditingMode = () => {
		setFlashcardsInEditingMode((prevBase) => {
			const newFlashcard = {
				concept: "",
				definition: "",
				id: prevBase.length > 0 ? prevBase.at(-1).id + 1 : 0,
			};
			const updatedBase = [...prevBase, newFlashcard];
			console.log(updatedBase);
			return updatedBase;
		});
	};

	const addSet = () => {
		const title = document.querySelector("#nameOfSet").value;
		const description = document.querySelector("#descriptionOfSet").value;
		const flashcards = flashcardsInEditingMode;

		onSaveBtnClick(title, description, flashcards);
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

			{flashcardsInEditingMode.map((element) => (
				<FlashcardInEditingMode
					key={element.id}
					id={element.id}
					cValue={element.concept}
					dValue={element.definition}
					onUpdate={updateFlashcard}
				/>
			))}

			<div className={styles.wrapper}>
				<Button
					icon={faCirclePlus}
					btnClass={`${"addBtn"}`}
					onClick={increaseNumberOfFlashcardsInEditingMode}
				></Button>
			</div>

			{/* save, cancel btns */}
			<div className={styles.buttons}>
				<button className={styles.saveBtn} onClick={addSet}>
					Zapisz
				</button>
				<button className={styles.cancelBtn} onClick={onCancelBtnClick}>
					Anuluj
				</button>
			</div>
		</div>
	);
}
