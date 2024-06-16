import { Icon } from "../Icon/Icon";
import styles from "./Button.module.css";

export function Button({icon, btnClass}) {
	
let btnType;

	if (btnClass === 'addBtn') {
		btnType = styles.addBtn;
	}
	if (btnClass === 'editBtn') {
		btnType = styles.editBtn;
	}
	if (btnClass === 'deleteBtn') {
		btnType = styles.deleteBtn;
	}
	

	return (
		<button className={`${styles.btnReset} ${btnType}`} >
			<Icon icon={icon}></Icon>
		</button>
	);
}
