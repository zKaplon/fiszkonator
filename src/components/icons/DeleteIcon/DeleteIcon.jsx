import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash} from "@fortawesome/free-solid-svg-icons";
import styles from "./DeleteIcon.module.css"

export const DeleteIcon = () => {
    return    <FontAwesomeIcon className={styles.icon} icon={faTrash} />
}