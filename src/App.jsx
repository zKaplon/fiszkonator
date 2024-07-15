import styles from "./App.module.css";
import { Button } from "./components/Button/Button";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { SetOfFlashcardsList } from "./components/SetOfFlashcardsList/SetOfFlashcardsList";
import { EditSetOfFlashcards } from "./components/EditSetOfFlashcards/EditSetOfFlashcards";
import { useState } from "react";

function App() {
	const setsBase = [];
	const [sets, setSets] = useState(setsBase);
	const [isEditingModeShown, setIsEditingModeShown] = useState(false);
	const [editingSet, setEditingSet] = useState(null);

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

	const editSet = (setId) => {
		const setToEdit = sets.find((set) => set.id === setId);
		setEditingSet(setToEdit);
		changeVisibilityOfEditingMode();
	};

	const saveEditedSet = (title, description, flashcards) => {
		setSets((prevBase) => {
			const updatedBase = prevBase.map((set) =>
				set.id === editingSet.id
					? { ...set, title, description, flashcards }
					: set
			);
			console.log(updatedBase);
			return updatedBase;
		});
		setEditingSet(null);
		changeVisibilityOfEditingMode();
	};

	const deleteSet = (setId) => {
		setSets((prevBase) => {
			const updatedBase = prevBase.filter((set) => set.id !== setId);
			return updatedBase;
		});
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
						<EditSetOfFlashcards
							onSaveBtnClick={editingSet ? saveEditedSet : addNewSet}
							onCancelBtnClick={changeVisibilityOfEditingMode}
							existingSet={editingSet}
						></EditSetOfFlashcards>
					) : (
						<SetOfFlashcardsList
							onEditBtnClick={(setId) => editSet(setId)}
							onDeleteBtnClick={(setId) => deleteSet(setId)}
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
