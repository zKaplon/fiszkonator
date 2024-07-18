import styles from "./EditSetOfFlashcards.module.css";
import { Button } from "../Button/Button.jsx";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FlashcardInEditingMode } from "../FlashcardInEditingMode/FlashcardInEditingMode.jsx";
import { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export function EditSetOfFlashcards({
	onSaveBtnClick,
	onCancelBtnClick,
	existingSet,
}) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [flashcardsInEditingMode, setFlashcardsInEditingMode] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		if (existingSet) {
			setTitle(existingSet.title);
			setDescription(existingSet.description);
			setFlashcardsInEditingMode(existingSet.flashcards);
		}
	}, [existingSet]);

	const saveSet = () => {
		if (title !== "") {
			onSaveBtnClick(title, description, flashcardsInEditingMode);
		} else {
			setError("Podaj nazwę zestawu!!!");
		}
	};

	const updateFlashcard = (id, concept, definition) => {
		setFlashcardsInEditingMode((prevBase) => {
			const updatedBase = prevBase.map((flashcard) =>
				flashcard.id === id ? { ...flashcard, concept, definition } : flashcard
			);
			return updatedBase;
		});
	};

	const increaseNumberOfFlashcardsInEditingMode = () => {
		setFlashcardsInEditingMode((prevBase) => {
			const newFlashcard = {
				concept: "",
				definition: "",
				id: prevBase.length > 0 ? prevBase.at(-1).id + 1 : 0,
			};
			const updatedBase = [...prevBase, newFlashcard];
			console.log(updatedBase);
			return updatedBase;
		});
	};

	const deleteFlashcard = (id) => {
		setFlashcardsInEditingMode((prevBase) => {
			const updatedBase = prevBase.filter((flashcard) => flashcard.id !== id);
			return updatedBase;
		});
	};

	return (
		<div className={styles.editModeContainer}>
			{/* title */}
			<div className={styles.wrapper}>
				<h2 className={styles.addingSetTitle}>Dodawanie zestawu:</h2>
			</div>

			{/* info about set */}
			<div className={styles.oneInfo}>
				<label htmlFor="nameOfSet" className={styles.label}>
					NAZWA ZESTAWU:
				</label>
				<input
					type="text"
					id="nameOfSet"
					className={styles.input}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<p className={styles.errorInfo} id="errorInfo">
					{error}
				</p>
			</div>
			<div className={styles.oneInfo}>
				<label htmlFor="descriptionOfSet" className={styles.label}>
					OPIS:
				</label>
				<textarea
					id="descriptionOfSet"
					className={styles.textarea}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				></textarea>
			</div>

			{/* flashcards in editing mode */}
			<p className={styles.addingConceptsTitle}>FISZKI:</p>
			<DragDropContext
				onDragEnd={() => {
					console.log("dragggg");
				}}
			>
				<Droppable droppableId="flashcardsContainer" type="group">
					{(provided) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							className={styles.droppableContainer}
						>
							{flashcardsInEditingMode.map((flashcard, index) => (
								<Draggable
									draggableId={flashcard.id.toString()}
									key={flashcard.id}
									index={index}
								>
									{(provided) => (
										<div
										{...provided.draggableProps}
										{...provided.dragHandleProps}
											ref={provided.innerRef}
											className={styles.draggableItem}
										>
											<FlashcardInEditingMode
												key={flashcard.id}
												id={flashcard.id}
												cValue={flashcard.concept}
												dValue={flashcard.definition}
												onUpdate={updateFlashcard}
												onDelete={deleteFlashcard}
											/>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>

			<div className={styles.wrapper}>
				<Button
					icon={faCirclePlus}
					btnClass={`${"addBtn"}`}
					onClick={increaseNumberOfFlashcardsInEditingMode}
				></Button>
			</div>

			{/* save, cancel btns */}
			<div className={styles.buttons}>
				<button className={styles.saveBtn} onClick={saveSet}>
					Zapisz
				</button>
				<button className={styles.cancelBtn} onClick={onCancelBtnClick}>
					Anuluj
				</button>
			</div>
		</div>
	);
}
