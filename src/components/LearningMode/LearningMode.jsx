import styles from "./LearningMode.module.css";
import { Button } from "../Button/Button.jsx";
import {
	faCheck,
	faXmark,
	faX,
	faArrowRotateLeft,
	faHouse,
	faRepeat,
	faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const LearningMode = ({ onExitBtnClick, set }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [animationClass, setAnimationClass] = useState("");
	const [knownFlashcards, setKnownFlashcards] = useState([]);
	const [unknownFlashcards, setUnknownFlashcards] = useState([]);
	const [isEndScreenShown, setIsEndScreenShown] = useState(false);
	const [retryFlashcards, setRetryFlashcards] = useState([]);
	const [retryMode, setRetryMode] = useState(false);

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
			showEndScreen();
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

	return (
		<>
			{isEndScreenShown ? (
				<div className={styles.endScreen}>
					<p>Gratulacje! To już wszystko, co chcesz teraz zrobić?</p>
					<Button
						icon={faExclamationTriangle}
						btnClass
						onClick={handleRetryWrong}
					>
						Kolejna runda - ucz się tylko złych fiszek
					</Button>
					<Button icon={faRepeat} btnClass onClick={handleRepeatAll}>
						Powtórz tę rundę
					</Button>
					<Button icon={faHouse} btnClass onClick={onExitBtnClick}>
						Wyjdź z trybu nauki
					</Button>
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
						<Button
							icon={faX}
							btnClass="exitBtn"
							onClick={onExitBtnClick}
						></Button>
					</div>
					<div
						className={`${styles.card} ${animationClass}`}
						onClick={(e) => {
							const card = e.currentTarget;
							const front = card.querySelector(`.${styles.cardFront}`);
							const back = card.querySelector(`.${styles.cardBack}`);
							front.classList.toggle(styles.cardFrontClick);
							back.classList.toggle(styles.cardBackClick);
						}}
					>
						{(retryMode ? retryFlashcards : set.flashcards)[0] ? (
							<>
								<div className={styles.cardFront}>
									<p className={styles.textFront}>
										{
											(retryMode ? retryFlashcards : set.flashcards)[
												currentIndex
											].concept
										}
									</p>
									<p className={styles.rotateText}>kliknij aby obrócić</p>
								</div>
								<div className={styles.cardBack}>
									<p className={styles.textBack}>
										{
											(retryMode ? retryFlashcards : set.flashcards)[
												currentIndex
											].definition
										}
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
