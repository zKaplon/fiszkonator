import { useState } from "react";
import { Button } from "../Button/Button";
import styles from "./FlashcardInEditingMode.module.css";
import { faX } from "@fortawesome/free-solid-svg-icons";

export function FlashcardInEditingMode({
	id,
	cValue,
	dValue,
	onUpdate,
	onDelete,
}) {
	const [conceptValue, setConceptValue] = useState(cValue);
	const [definitionValue, setDefinitionValue] = useState(dValue);

	const handleConceptChange = (e) => {
		setConceptValue(e.target.value);
		onUpdate(id, e.target.value, definitionValue);
	};

	const handleDefinitionChange = (e) => {
		setDefinitionValue(e.target.value);
		onUpdate(id, conceptValue, e.target.value);
	};

	const handleDelete = () => {
		onDelete(id);
	};

	return (
		<div className={styles.flashcardInEditingMode}>
			<div className={styles.conceptContainer}>
				<input
					type="text"
					id={`concept${id}`}
					value={conceptValue}
					onChange={handleConceptChange}
				/>
				<label htmlFor={`concept${id}`}>POJĘCIE</label>
			</div>

			<div className={styles.definitionContainer}>
				<input
					type="text"
					id={`definition${id}`}
					value={definitionValue}
					onChange={handleDefinitionChange}
				/>
				<label htmlFor={`definition${id}`}>DEFINICJA</label>
			</div>

			<Button icon={faX} btnClass="xBtn" onClick={handleDelete}></Button>
		</div>
	);
}
