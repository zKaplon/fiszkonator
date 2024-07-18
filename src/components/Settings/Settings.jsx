import styles from "./Settings.module.css";
import { Button } from "../Button/Button.jsx";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const Settings = ({
	set,
	onCancelBtnClick,
	updateSettings,
	changeIsDefFirstModeActivated,
	isDefFirstModeActivated,
}) => {
	const [isDefFirstModeActivatedText, setIsDefFirstModeActivatedText] =
		useState(isDefFirstModeActivated);

	const saveSettings = () => {
		const updatedSettings = {
			isDefFirstModeActivated: isDefFirstModeActivatedText,
		};

		changeIsDefFirstModeActivated(isDefFirstModeActivatedText);

		updateSettings(set.id, updatedSettings);

		console.log("tekst" + isDefFirstModeActivatedText);

		onCancelBtnClick();
	};

	const changeIsDefFirstModeActivatedText = () => {
		setIsDefFirstModeActivatedText((prevValue) => !prevValue);
	};

	return (
		<>
			<div className={styles.bgShadow}>
				<div className={styles.popupContainer}>
					<div className={styles.settingsButtons}>
						<Button
							icon={faRepeat}
							btnClass="defModeBtn"
							onClick={changeIsDefFirstModeActivatedText}
							text={
								isDefFirstModeActivatedText
									? "Kliknij aby z przodu pokazywało POJĘCIE"
									: "Kliknij aby z przodu pokazywało DEFINICJĘ"
							}
						></Button>
					</div>

					<div className={styles.buttons}>
						<button className={styles.saveBtn} onClick={saveSettings}>
							Zapisz
						</button>
						<button className={styles.cancelBtn} onClick={onCancelBtnClick}>
							Anuluj
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
