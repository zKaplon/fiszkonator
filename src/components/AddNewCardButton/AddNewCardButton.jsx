import { AddIcon } from '../icons/AddIcon/AddIcon'
import styles from './AddNewCardButton.module.css'
import styles2 from '../icons/AddIcon/AddIcon.module.css'

export function AddNewCardButton() {
	return (
			<button className={styles.addBtn}>
				<AddIcon className={styles2.plusIcon}></AddIcon>
			</button>
		
	)
}
