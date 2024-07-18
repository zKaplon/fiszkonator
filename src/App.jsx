import styles from "./App.module.css";
import { Button } from "./components/Button/Button";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { SetOfFlashcardsList } from "./components/SetOfFlashcardsList/SetOfFlashcardsList";
import { EditSetOfFlashcards } from "./components/EditSetOfFlashcards/EditSetOfFlashcards";
import { useState } from "react";
import { LearningMode } from "./components/LearningMode/LearningMode";
import { DeletingSetPopup } from "./components/DeletingSetPopup/DeletingSetPopup";

function App() {
	const [sets, setSets] = useState([
		{
			title: "fegew",
			description: "",
			flashcards: [{ concept: "poj", definition: "def", id: 0 }],
			settings: { isDefFirstModeActivated: true },
			id: 0,
		},
	]);
	const [isEditingModeShown, setIsEditingModeShown] = useState(false);
	const [editingSet, setEditingSet] = useState(null);
	const [isLearningModeShown, setIsLearningModeShown] = useState(false);
	const [selectedSet, setSelectedSet] = useState(null);
	const [isDeletingSetPopupShown, setIsDeletingSetPopupShown] = useState(false);
	const [deletingSet, setDeletingSet] = useState(null);

	const changeVisibilityOfEditingMode = () => {
		setIsEditingModeShown((prevValue) => !prevValue);
	};

	const changeVisibilityOfLearningMode = () => {
		setIsLearningModeShown((prevValue) => !prevValue);
	};

	const changeVisibilityOfDeletingSetPopup = (setId) => {
		setDeletingSet(sets[setId]);
		setIsDeletingSetPopupShown((prevValue) => !prevValue);
	};

	const addNewSet = (title, description, flashcards) => {
		setSets((prevBase) => {
			const newSet = {
				title: title,
				description: description,
				flashcards: flashcards,
				settings: { isDefFirstModeActivated: false },
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

	const saveEditedSet = (title, description, settings, flashcards) => {
		setSets((prevBase) => {
			const updatedBase = prevBase.map((set) =>
				set.id === editingSet.id
					? { ...set, title, description, settings, flashcards }
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

	const updateSettings = (setId, newSettings) => {
		setSets((prevBase) => {
			const updatedBase = prevBase.map((set) =>
				set.id === setId ? { ...set, settings: newSettings } : set
			);

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
							updateSettings={updateSettings}
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
							onDeleteBtnClick={(setId) =>
								changeVisibilityOfDeletingSetPopup(setId)
							}
							// onDeleteBtnClick={(setId) => deleteSet(setId)}
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
			{isDeletingSetPopupShown ? (
				<DeletingSetPopup
					deletingSet={deletingSet}
					onConfirmBtnClick={() => {
						deleteSet(deletingSet.id);
						console.log(deletingSet);
						changeVisibilityOfDeletingSetPopup();
					}}
					onDeclineBtnClick={changeVisibilityOfDeletingSetPopup}
				></DeletingSetPopup>
			) : (
				""
			)}
		</>
	);
}
export default App;
