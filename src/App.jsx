import styles from "./App.module.css";
import { Button } from "./components/Button/Button";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { SetOfFlashcardsList } from "./components/SetOfFlashcardsList/SetOfFlashcardsList";
import { AddSetOfFlashcards } from "./components/AddSetOfFlashcards/AddSetOfFlashcards";
import { useState } from "react";

function App() {
	const setsBase = [
		{
			title: "set1",
			description: "opis1",
			flashcards: [{ concept: "c1", definition: "d1", id: 0 }],
			id: 0,
		},
	];
	const [sets, setSets] = useState(setsBase);
	const [isEditingModeShown, setIsEditingModeShown] = useState(false);

	const addNewSet = (title, description, flashcards) => {
		setSets((prevBase) => {
			const newSet = {
				title: title,
				description: description,
				flashcards: flashcards,
				id: prevBase.length > 0 ? prevBase.at(-1).id + 1 : 0,
			};
			const updatedBase = [...prevBase, newSet];
			console.log(updatedBase);
			return updatedBase;
		});
		changeVisibilityOfEditingMode();
	};

	const changeVisibilityOfEditingMode = () => {
		setIsEditingModeShown((prevValue) => !prevValue);
	};

	return (
		<>
			<div className={styles.background}>
				<header className={styles.titleBackground}>
					<h1 className={styles.siteTitle}>FISZKONATOR</h1>
				</header>

				<main className={styles.setsOfFlashcardsContainer}>
					{isEditingModeShown ? (
						<AddSetOfFlashcards
							onSaveBtnClick={addNewSet}
							onCancelBtnClick={changeVisibilityOfEditingMode}
						></AddSetOfFlashcards>
					) : (
						<SetOfFlashcardsList
							onEditBtnClick={changeVisibilityOfEditingMode}
							base={sets}
						></SetOfFlashcardsList>
					)}
				</main>

				{isEditingModeShown ? (
					""
				) : (
					<Button
						icon={faCirclePlus}
						btnClass={`${"addBtn"}`}
						onClick={changeVisibilityOfEditingMode}
					></Button>
				)}
			</div>
		</>
	);
}
export default App;
