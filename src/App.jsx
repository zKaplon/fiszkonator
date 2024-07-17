import styles from "./App.module.css";
import { Button } from "./components/Button/Button";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { SetOfFlashcardsList } from "./components/SetOfFlashcardsList/SetOfFlashcardsList";
import { EditSetOfFlashcards } from "./components/EditSetOfFlashcards/EditSetOfFlashcards";
import { useState } from "react";
import { LearningMode } from "./components/LearningMode/LearningMode";
import { DeletingSetPopup } from "./components/DeletingSetPopup/DeletingSetPopup";

function App() {
	const [sets, setSets] = useState([]);
	const [isEditingModeShown, setIsEditingModeShown] = useState(false);
	const [editingSet, setEditingSet] = useState(null);
	const [isLearningModeShown, setIsLearningModeShown] = useState(false);
	const [selectedSet, setSelectedSet] = useState(null);

	const changeVisibilityOfEditingMode = () => {
		setIsEditingModeShown((prevValue) => !prevValue);
	};

	const changeVisibilityOfLearningMode = () => {
		setIsLearningModeShown((prevValue) => !prevValue);
	};

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

	const selectSetToLearn = (setId) => {
		const selectedSet = sets.find((set) => set.id === setId);
		setSelectedSet(selectedSet);
		console.log("selected set:" + selectedSet);
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
		changeVisibilityOfEditingMode();
		setEditingSet(null);
	};

	const deleteSet = (setId) => {
		setSets((prevBase) => {
			const updatedBase = prevBase.filter((set) => set.id !== setId);
			return updatedBase;
		});
	};

	return (
		<>
			<div className={styles.background}>
				{!isEditingModeShown && !isLearningModeShown ? (
					<header className={styles.titleBackground}>
						<h1 className={styles.siteTitle}>FISZKONATOR</h1>
					</header>
				) : (
					""
				)}

				<main className={styles.setsOfFlashcardsContainer}>
					{isLearningModeShown ? (
						<LearningMode
							onExitBtnClick={changeVisibilityOfLearningMode}
							set={selectedSet}
						></LearningMode>
					) : isEditingModeShown ? (
						<EditSetOfFlashcards
							onSaveBtnClick={editingSet ? saveEditedSet : addNewSet}
							onCancelBtnClick={changeVisibilityOfEditingMode}
							existingSet={editingSet}
						></EditSetOfFlashcards>
					) : (
						<SetOfFlashcardsList
							onEditBtnClick={(setId) => editSet(setId)}
							onDeleteBtnClick={(setId) => deleteSet(setId)}
							onSetClick={(setId) => {
								selectSetToLearn(setId);
								changeVisibilityOfLearningMode();
							}}
							base={sets}
						></SetOfFlashcardsList>
					)}
				</main>

				{!isEditingModeShown && !isLearningModeShown ? (
					<Button
						icon={faCirclePlus}
						btnClass={`${"addBtn"}`}
						onClick={changeVisibilityOfEditingMode}
					></Button>
				) : (
					" "
				)}
			</div>
			<DeletingSetPopup></DeletingSetPopup>
		</>
	);
}
export default App;
