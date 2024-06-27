import styles from "./App.module.css";
import { Button } from "./components/Button/Button";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { SetOfFlashcardsList } from "./components/SetOfFlashcardsList/SetOfFlashcardsList";
import { AddSetOfFlashcards } from "./components/AddSetOfFlashcards/AddSetOfFlashcards";
import { useState } from "react";

function App() {
	const [isEditingModeShown, setIsEditingModeShown] = useState(false);

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
							onAddBtnClick={changeVisibilityOfEditingMode}
							onCancelBtnClick={changeVisibilityOfEditingMode}
						></AddSetOfFlashcards>
					) : (
						<SetOfFlashcardsList onEditBtnClick={changeVisibilityOfEditingMode}></SetOfFlashcardsList>
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
