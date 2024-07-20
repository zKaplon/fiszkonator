import styles from "./App.module.css";
import { Button } from "./components/Button/Button";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { SetOfFlashcardsList } from "./components/SetOfFlashcardsList/SetOfFlashcardsList";
import { EditSetOfFlashcards } from "./components/EditSetOfFlashcards/EditSetOfFlashcards";
import { useState, useEffect } from "react";
import { LearningMode } from "./components/LearningMode/LearningMode";
import { DeletingSetPopup } from "./components/DeletingSetPopup/DeletingSetPopup";
import { LoginForm } from "./components/LoginForm/LoginForm";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

function App() {
	const auth = getAuth();

	const handleSave = async () => {
		const user = auth.currentUser;
		if (user) {
			try {
				const userDocRef = doc(db, "users", user.uid);
				await setDoc(
					userDocRef,
					{ userData: userData, sets: sets },
					{ merge: true }
				);
				console.log("User data saved to Firestore");
			} catch (error) {
				console.error("Error saving user data:", error);
			}
		} else {
			console.error("No user is signed in");
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const fetchData = async () => {
					try {
						const userDocRef = doc(db, "users", user.uid);
						const userDoc = await getDoc(userDocRef);
						if (userDoc.exists()) {
							setUserData(userDoc.data().userData);
							setSets(userDoc.data().sets);
						} else {
							console.log("No such document!");
						}
					} catch (error) {
						console.error("Error fetching user data:", error);
					}
				};

				fetchData();
			} else {
				setUserData({});
				setSets([]);
			}
		});

		return () => unsubscribe();
	}, [auth]);

	const [userData, setUserData] = useState({});
	const [sets, setSets] = useState([
		{
			title: "testowy zestaw",
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
	const [isLoginModeShown, setIsLoginModeShown] = useState(true);

	// tryby

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

	// dodawanie

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

	// edycja

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

	// usuwanie

	const deleteSet = (setId) => {
		setSets((prevBase) => {
			const updatedBase = prevBase.filter((set) => set.id !== setId);
			return updatedBase;
		});
	};

	// ustawienia

	const updateSettings = (setId, newSettings) => {
		setSets((prevBase) => {
			const updatedBase = prevBase.map((set) =>
				set.id === setId ? { ...set, settings: newSettings } : set
			);

			return updatedBase;
		});
	};

	// logowanie

	const showMenu = () => {
		setIsLoginModeShown(false);
	};

	const saveUserData = (userData) => {
		setUserData(userData);
	};

	return (
		<>
			<div className={styles.background}>
				<div className={styles.bgShadow}></div>

				<button onClick={handleSave}>aaaa</button>

				{!isEditingModeShown && !isLearningModeShown ? (
					<header className={styles.titleBackground}>
						<h1 className={styles.siteTitle}>FISZKONATOR</h1>
					</header>
				) : (
					""
				)}

				<main className={styles.setsOfFlashcardsContainer}>
					{isLoginModeShown ? (
						<>
							<LoginForm
								showMenu={showMenu}
								saveUserData={saveUserData}
							></LoginForm>
						</>
					) : (
						""
					)}
					{isLearningModeShown ? (
						<LearningMode
							onExitBtnClick={changeVisibilityOfLearningMode}
							set={selectedSet}
							updateSettings={updateSettings}
						></LearningMode>
					) : (
						""
					)}{" "}
					{isEditingModeShown ? (
						<EditSetOfFlashcards
							onSaveBtnClick={editingSet ? saveEditedSet : addNewSet}
							onCancelBtnClick={changeVisibilityOfEditingMode}
							existingSet={editingSet}
						></EditSetOfFlashcards>
					) : (
						""
					)}
					{!isEditingModeShown && !isLearningModeShown && !isLoginModeShown ? (
						<SetOfFlashcardsList
							onEditBtnClick={(setId) => editSet(setId)}
							onDeleteBtnClick={(setId) =>
								changeVisibilityOfDeletingSetPopup(setId)
							}
							onSetClick={(setId) => {
								selectSetToLearn(setId);
								changeVisibilityOfLearningMode();
							}}
							base={sets}
						></SetOfFlashcardsList>
					) : (
						""
					)}
				</main>

				{!isEditingModeShown && !isLearningModeShown && !isLoginModeShown ? (
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
