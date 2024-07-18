import styles from "./LearningMode.module.css";
import { Button } from "../Button/Button.jsx";
import { Settings } from "../Settings/Settings.jsx";
import {
	faCheck,
	faXmark,
	faX,
	faArrowRotateLeft,
	faHouse,
	faRepeat,
	faExclamationTriangle,
	faGear,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export const LearningMode = ({ onExitBtnClick, set, updateSettings }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [animationClass, setAnimationClass] = useState("");
	const [knownFlashcards, setKnownFlashcards] = useState([]);
	const [unknownFlashcards, setUnknownFlashcards] = useState([]);
	const [isEndScreenShown, setIsEndScreenShown] = useState(false);
	const [retryFlashcards, setRetryFlashcards] = useState([]);
	const [retryMode, setRetryMode] = useState(false);
	const [areSettingsShown, setAreSettingsShown] = useState(false);
	const [isDefFirstModeActivated, setIsDefFirstModeActivated] = useState(
		set.settings.isDefFirstModeActivated
	);

	const handleNextCard = (direction) => {
		if (
			retryMode
				? currentIndex < retryFlashcards.length - 1
				: currentIndex < set.flashcards.length - 1
		) {
			setAnimationClass(
				direction === "right" ? styles.cardSlideRight : styles.cardSlideLeft
			);
			setTimeout(() => {
				setCurrentIndex(currentIndex + 1);
				setAnimationClass("");
			}, 500);
		} else {
			setAnimationClass(
				direction === "right" ? styles.cardSlideRight : styles.cardSlideLeft
			);
			setTimeout(() => {
				setAnimationClass("");
			}, 500);
			setTimeout(showEndScreen, 500);
		}
	};

	const handlePreviousCard = () => {
		if (currentIndex > 0) {
			setAnimationClass(styles.cardSlideTopIn);
			setTimeout(() => {
				setCurrentIndex(currentIndex - 1);
				setAnimationClass("");
			}, 500);
		}
	};

	const handleConfirm = () => {
		setKnownFlashcards([
			...knownFlashcards,
			retryMode
				? retryFlashcards[currentIndex].id
				: set.flashcards[currentIndex].id,
		]);
		handleNextCard("right");

		console.log(currentIndex + " dodano do pozytywnych");
		console.log(
			"negatywne: " + unknownFlashcards + " pozytywne: " + knownFlashcards
		);
	};

	const handleDecline = () => {
		console.log("retry mode: " + retryMode);
		setUnknownFlashcards([
			...unknownFlashcards,
			retryMode
				? retryFlashcards[currentIndex].id
				: set.flashcards[currentIndex].id,
		]);
		handleNextCard("left");

		retryMode
			? console.log(retryFlashcards[currentIndex].id + " dodano do negatywnych")
			: console.log(currentIndex + " dodano do negatywnych");

		console.log(
			"negatywne: " + unknownFlashcards + " pozytywne: " + knownFlashcards
		);
	};

	const showEndScreen = () => {
		setIsEndScreenShown(true);
		console.log(
			"negatywne: " + unknownFlashcards + " pozytywne: " + knownFlashcards
		);
	};

	const handleRetryWrong = () => {
		setIsEndScreenShown(false);

		const retryFlashcards = set.flashcards.filter((flashcard) =>
			unknownFlashcards.includes(flashcard.id)
		);

		setRetryFlashcards(retryFlashcards);
		setRetryMode(true);
		setCurrentIndex(0);
		setUnknownFlashcards([]);

		console.log("Negatywne fiszki do powtórzenia: ", retryFlashcards);
	};

	const handleRepeatAll = () => {
		setCurrentIndex(0);
		setIsEndScreenShown(false);

		console.log(
			"negatywne: " + unknownFlashcards + " pozytywne: " + knownFlashcards
		);
	};

	const rotateCard = () => {
		const card = document.querySelector(`.${styles.card}`);
		const front = card.querySelector(`.${styles.cardFront}`);
		const back = card.querySelector(`.${styles.cardBack}`);
		front.classList.toggle(styles.cardFrontClick);
		back.classList.toggle(styles.cardBackClick);

		console.log("obkrecono karte");
	};

	const changeVisibilityOfSettings = () => {
		setAreSettingsShown((prevValue) => !prevValue);
	};

	const changeIsDefFirstModeActivated = (value) => {
		setIsDefFirstModeActivated(value);
	};

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (!isEndScreenShown) {
				if (event.key === "ArrowRight") {
					handleConfirm();
				} else if (event.key === "ArrowLeft") {
					handleDecline();
				} else if (event.keyCode === 32) {
					rotateCard();
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [currentIndex, isEndScreenShown]);

	useEffect(() => {
		let touchstartX = 0;
		let touchendX = 0;

		const handleTouchStart = (event) => {
			!isEndScreenShown ? (touchstartX = event.changedTouches[0].screenX) : "";
		};

		const handleTouchEnd = (event) => {
			if (!isEndScreenShown) {
				touchendX = event.changedTouches[0].screenX;
				handleGesture();
			}
		};

		const handleGesture = () => {
			if (touchendX < touchstartX) {
				handleDecline();
			}
			if (touchendX > touchstartX) {
				handleConfirm();
			}
		};

		window.addEventListener("touchstart", handleTouchStart);
		window.addEventListener("touchend", handleTouchEnd);

		return () => {
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchend", handleTouchEnd);
		};
	}, [currentIndex, isEndScreenShown]);

	return (
		<>
			{areSettingsShown ? (
				<Settings set={set} onCancelBtnClick={changeVisibilityOfSettings} updateSettings={updateSettings} isDefFirstModeActivated={isDefFirstModeActivated} changeIsDefFirstModeActivated={changeIsDefFirstModeActivated}></Settings>
			) : (
				" "
			)}

			{isEndScreenShown ? (
				<div className={styles.endScreen}>
					<p className={styles.endScreenText}>Gratulacje! To już wszystko!</p>
					<p className={styles.endScreenText}>Co chcesz teraz zrobić?</p>
					<div className={styles.buttonsContainer}>
						<Button
							icon={faExclamationTriangle}
							btnClass="repeatWrongBtn"
							onClick={handleRetryWrong}
							text="Kolejna runda - ucz się tylko złych fiszek"
						></Button>
						<Button
							icon={faRepeat}
							btnClass="repeatBtn"
							onClick={handleRepeatAll}
							text="Powtórz tę rundę"
						></Button>
						<Button
							icon={faHouse}
							btnClass="houseBtn"
							onClick={onExitBtnClick}
							text="Wyjdź z trybu nauki"
						></Button>
					</div>
				</div>
			) : (
				<>
					<div className={styles.header}>
						<p className={styles.setTitle}>{set.title}</p>
						{(retryMode ? retryFlashcards : set.flashcards)[0] ? (
							<p className={styles.counter}>
								{currentIndex + 1}/
								{retryMode ? retryFlashcards.length : set.flashcards.length}
							</p>
						) : (
							""
						)}
						<div className={styles.headerButtons}>
							<Button
								icon={faGear}
								btnClass="settingsBtn"
								onClick={changeVisibilityOfSettings}
							></Button>
							<Button
								icon={faX}
								btnClass="exitBtn"
								onClick={onExitBtnClick}
							></Button>
						</div>
					</div>
					<div
						className={`${styles.card} ${animationClass}`}
						onClick={rotateCard}
					>
						{(retryMode ? retryFlashcards : set.flashcards)[0] ? (
							<>

								<div className={styles.cardFront}>
									<p className={styles.textFront}>
										{(isDefFirstModeActivated) ? ((retryMode ? retryFlashcards : set.flashcards)[currentIndex].definition) : ((retryMode ? retryFlashcards : set.flashcards)[currentIndex].concept)}
									</p>
									<p className={styles.rotateText}>kliknij aby obrócić</p>
								</div>
								<div className={styles.cardBack}>
									<p className={styles.textBack}>
										{isDefFirstModeActivated
											? (retryMode ? retryFlashcards : set.flashcards)[currentIndex].concept
											: (retryMode ? retryFlashcards : set.flashcards)[currentIndex].definition}
									</p>
									<p className={styles.rotateText}>kliknij aby obrócić</p>
								</div>
							</>
						) : (
							<p className={styles.emptySetInfo}>pusty zestaw</p>
						)}
					</div>

					{(retryMode ? retryFlashcards : set.flashcards)[0] ? (
						<div className={styles.buttons}>
							<Button
								icon={faXmark}
								btnClass="declineBtn"
								onClick={handleDecline}
							></Button>
							<Button
								icon={faArrowRotateLeft}
								btnClass="undoBtn"
								onClick={handlePreviousCard}
							></Button>
							<Button
								icon={faCheck}
								btnClass="confirmBtn"
								onClick={handleConfirm}
							></Button>
						</div>
					) : (
						""
					)}
				</>
			)}
		</>
	);
};
