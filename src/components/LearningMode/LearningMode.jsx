import styles from "./LearningMode.module.css";
import { Button } from "../Button/Button.jsx";
import { faCheck, faXmark, faX, faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";


export const LearningMode = () => {
	return (
		<>
			<div className={styles.header}>
				<p className={styles.setTitle}>tytuł zestawu </p>
				<p className={styles.counter}>1/4</p>
				<Button icon={faX} btnClass="exitBtn" onClick={""}></Button>
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
				<div className={styles.cardFront}>
					<p className={styles.textFront}>
						POJĘCIE: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
						Illo, numquam?
					</p>
					<p className={styles.rotateText}>kliknij aby obrócić</p>
				</div>
				<div className={styles.cardBack}>
					<p className={styles.textBack}>
						DEFINICJA: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
						Illo, numquam
					</p>
					<p className={styles.rotateText}>kliknij aby obrócić</p>
				</div>
			</div>
			<div className={styles.buttons}>
				<Button icon={faXmark} btnClass="declineBtn"></Button>
				<Button icon={faArrowRotateLeft} btnClass="undoBtn"></Button>
				<Button icon={faCheck} btnClass="confirmBtn"></Button>
			</div>
		</>
	);
};
