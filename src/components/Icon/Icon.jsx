import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Icon.module.css'

export function Icon({ icon }) {
	return <FontAwesomeIcon className={styles.icon} icon={icon} />
}
