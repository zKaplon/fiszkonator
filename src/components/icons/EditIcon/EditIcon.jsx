import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import styles from "./EditIcon.module.css"

export const EditIcon = () => {
    return    <FontAwesomeIcon className={styles.icon} icon={faPenToSquare} />
}