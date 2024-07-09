import { useState } from "react";
import { Button } from "../Button/Button";
import styles from "./FlashcardInEditingMode.module.css";
import { faX } from "@fortawesome/free-solid-svg-icons";

export function FlashcardInEditingMode({ id, cValue, dValue, onUpdate }) {
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

	return (
		<div className={styles.flashcardInEditingMode}>
			<div className={styles.conceptContainer}>
				<input
					type="text"
					id="concept"
					value={conceptValue}
					onChange={handleConceptChange}
				/>
				<label htmlFor="concept">POJĘCIE</label>
			</div>

			<div className={styles.definitionContainer}>
				<input
					type="text"
					id="definition"
					value={definitionValue}
					onChange={handleDefinitionChange}
				/>
				<label htmlFor="definition">DEFINICJA</label>
			</div>

			<Button icon={faX} btnClass="xBtn"></Button>
		</div>
	);
}
