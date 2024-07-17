import { Icon } from "../Icon/Icon";
import styles from "./Button.module.css";

export function Button({ icon, btnClass, onClick, text }) {
	let btnType;

	if (btnClass === "addBtn") {
		btnType = styles.addBtn;
	}
	if (btnClass === "editBtn") {
		btnType = styles.editBtn;
	}
	if (btnClass === "deleteBtn") {
		btnType = styles.deleteBtn;
	}
	if (btnClass === "confirmBtn") {
		btnType = styles.confirmBtn;
	}
	if (btnClass === "declineBtn") {
		btnType = styles.declineBtn;
	}
	if (btnClass === "xBtn") {
		btnType = styles.xBtn;
	}
	if (btnClass === "exitBtn") {
		btnType = styles.exitBtn;
	}
	if (btnClass === "undoBtn") {
		btnType = styles.undoBtn;
	}
	if (btnClass === "repeatWrongBtn") {
		btnType = styles.repeatWrongBtn;
	}
	if (btnClass === "repeatBtn") {
		btnType = styles.repeatBtn;
	}
	if (btnClass === "houseBtn") {
		btnType = styles.houseBtn;
	}


	return (
		<button className={`${styles.btnReset} ${btnType}`} onClick={onClick}> 
			<Icon icon={icon}></Icon>
			<p>{text}</p>
		</button>
	);
}