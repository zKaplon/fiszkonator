import styles from "./App.module.css";
import { Button } from "./components/Button/Button";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { SetOfFlashcardsList } from "./components/SetOfFlashcardsList/SetOfFlashcardsList";
import { EditSetOfFlashcards } from "./components/EditSetOfFlashcards/EditSetOfFlashcards";
import { useState, useEffect } from "react";
import { LearningMode } from "./components/LearningMode/LearningMode";
import { DeletingSetPopup } from "./components/DeletingSetPopup/DeletingSetPopup";
import { LoginForm } from "./components/LoginForm/LoginForm";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

function App() {
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
	const [isGuestMode, setIsGuestMode] = useState(false);
	const [isSetsOfFlashcardsListShown, setIsSetsOfFlashcardsListShown] =
		useState(true);

	const auth = getAuth();

	const handleSave = async () => {
		const user = auth.currentUser;
		if (user && !isGuestMode) {
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
		} else if (isGuestMode) {
			localStorage.setItem("guestData", JSON.stringify({ userData, sets }));
			console.log("User data saved to localStorage");
		} else {
			console.error("No user is signed in");
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user && !isGuestMode) {
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
			} else if (isGuestMode) {
				const guestData = localStorage.getItem("guestData");
				if (guestData) {
					const parsedData = JSON.parse(guestData);
					setUserData(parsedData.userData);
					setSets(parsedData.sets);
				}
			} else {
				setUserData({});
				setSets([]);
			}
		});

		return () => unsubscribe();
	}, [auth, isGuestMode]);

	useEffect(() => {
		handleSave();
	}, [sets]);

	useEffect(() => {
		const sessionData = localStorage.getItem("sessionData");
		const sessionExpiry = localStorage.getItem("sessionExpiry");

		if (sessionData && sessionExpiry) {
			const now = new Date().getTime();
			if (now < parseInt(sessionExpiry, 10)) {
				const parsedData = JSON.parse(sessionData);
				setUserData(parsedData.userData);
				setSets(parsedData.sets);
				setIsLoginModeShown(false);
			} else {
				localStorage.removeItem("sessionData");
				localStorage.removeItem("sessionExpiry");
			}
		}
	}, []);

	const handleLogout = async () => {
		try {
			await signOut(auth);
			console.log("User logged out");
		} catch (error) {
			console.error("Error logging out:", error);
		}
		location.reload();
		localStorage.removeItem("sessionData");
		localStorage.removeItem("sessionExpiry");
	};

	const goOnTop = () => {
		window.scroll(0, 0);
	};

	const changeVisibilityOfEditingMode = () => {
		setIsEditingModeShown((prevValue) => !prevValue);
		goOnTop();
	};

	const changeVisibilityOfLearningMode = () => {
		goOnTop();
		setIsLearningModeShown((prevValue) => !prevValue);
	};

	const changeVisibilityOfDeletingSetPopup = (setId) => {
		setDeletingSet(sets.find((set) => set.id === setId));
		setIsDeletingSetPopupShown((prevValue) => !prevValue);
		setIsSetsOfFlashcardsListShown(false);
		goOnTop();
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
			if (prevBase.length === 1) {
				return [];
			}
			const updatedBase = prevBase.filter((set) => set.id !== setId);
			return updatedBase;
		});
		setDeletingSet(null);
	};

	const updateSettings = (setId, newSettings) => {
		setSets((prevBase) => {
			const updatedBase = prevBase.map((set) =>
				set.id === setId ? { ...set, settings: newSettings } : set
			);

			return updatedBase;
		});
	};

	const showMenu = () => {
		setIsLoginModeShown(false);
		setIsSetsOfFlashcardsListShown(true);
	};

	const saveUserData = (userData) => {
		setUserData(userData);
	};

	const disableScroll = () => {
		goOnTop();
		document.body.style.overflow = "hidden";
		document.body.style.position = "fixed";
	};

	const enableScroll = () => {
		document.body.style.overflow = "auto";
		document.body.style.position = "static";
	};

	useEffect(() => {
		if (isLearningModeShown) {
			disableScroll();
		} else {
			enableScroll();
		}
	}, [isLearningModeShown]);

	const handleSetClick = (setId) => {
		selectSetToLearn(setId);
		changeVisibilityOfLearningMode();
	};

	return (
		<>
			<div className={styles.background}>
				<div className={styles.bgShadow}></div>

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
								setIsGuestMode={setIsGuestMode}
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
							isLearningModeShown={isLearningModeShown}
							disableScroll={disableScroll}
							enableScroll={enableScroll}
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
					{isSetsOfFlashcardsListShown &&
					!isEditingModeShown &&
					!isLearningModeShown &&
					!isLoginModeShown ? (
						<>
							<button
								className={styles.logoutBtn}
								onClick={() => {
									handleLogout();
									setIsLoginModeShown(true);
								}}
							>
								Wyloguj
							</button>
							<SetOfFlashcardsList
								onEditBtnClick={(setId) => editSet(setId)}
								onDeleteBtnClick={(setId) =>
									changeVisibilityOfDeletingSetPopup(setId)
								}
								onSetClick={handleSetClick}
								base={sets}
							></SetOfFlashcardsList>
						</>
					) : (
						""
					)}
				</main>

				{isSetsOfFlashcardsListShown &&
				!isEditingModeShown &&
				!isLearningModeShown &&
				!isLoginModeShown ? (
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
						changeVisibilityOfDeletingSetPopup();
						setIsSetsOfFlashcardsListShown(true);
					}}
					onDeclineBtnClick={() => {
						changeVisibilityOfDeletingSetPopup();
						setIsSetsOfFlashcardsListShown(true);
					}}
				></DeletingSetPopup>
			) : (
				""
			)}
		</>
	);
}

export default App;
