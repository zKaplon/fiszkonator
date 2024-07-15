import styles from "./LearningMode.module.css";
import { Button } from "../Button/Button.jsx";
import {
	faCheck,
	faXmark,
	faX,
	faArrowRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const LearningMode = ({ onExitBtnClick, set }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleNextCard = () => {
		if (currentIndex < set.flashcards.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}
	};

	const handlePreviousCard = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	return (
		<>
			<div className={styles.header}>
				<p className={styles.setTitle}>{set.title}</p>
				<p className={styles.counter}>
					{currentIndex + 1}/{set.flashcards.length}
				</p>
				<Button icon={faX} btnClass="exitBtn" onClick={onExitBtnClick}></Button>
			</div>
			<div
				className={styles.card}
				onClick={(e) => {
					const card = e.currentTarget;
					const front = card.querySelector(`.${styles.cardFront}`);
					const back = card.querySelector(`.${styles.cardBack}`);
					front.classList.toggle(styles.cardFrontClick);
					back.classList.toggle(styles.cardBackClick);
				}}
			>
				{set.flashcards[0] ? (
					<>
						<div className={styles.cardFront}>
							<p className={styles.textFront}>
								{set.flashcards[currentIndex].concept}
							</p>
							<p className={styles.rotateText}>kliknij aby obrócić</p>
						</div>
						<div className={styles.cardBack}>
							<p className={styles.textBack}>
								{set.flashcards[currentIndex].definition}
							</p>
							<p className={styles.rotateText}>kliknij aby obrócić</p>
						</div>
					</>
				) : (
					<p className={styles.emptySetInfo}>pusty zestaw</p>
				)}
			</div>

			{set.flashcards[0] ? (
				<div className={styles.buttons}>
					<Button
						icon={faXmark}
						btnClass="declineBtn"
						onClick={handleNextCard}
					></Button>
					<Button
						icon={faArrowRotateLeft}
						btnClass="undoBtn"
						onClick={handlePreviousCard}
					></Button>
					<Button
						icon={faCheck}
						btnClass="confirmBtn"
						onClick={handleNextCard}
					></Button>
				</div>
			) : (
				""
			)}
		</>
	);
};
