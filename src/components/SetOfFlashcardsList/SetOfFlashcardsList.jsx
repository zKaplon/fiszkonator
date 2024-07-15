import { SetOfFlashcards } from "../SetOfFlashcards/SetOfFlashcards";

let cardListIncrement = 0;

export function SetOfFlashcardsList({
	onEditBtnClick,
	onDeleteBtnClick,
	onSetClick,
	base,
}) {
	return base.map((card) => {
		cardListIncrement++;
		return (
			<SetOfFlashcards
				key={cardListIncrement}
				title={card.title}
				description={card.description}
				onEditBtnClick={() => onEditBtnClick(card.id)}
				onDeleteBtnClick={() => onDeleteBtnClick(card.id)}
				onSetClick={() => onSetClick(card.id)}
			></SetOfFlashcards>
		);
	});
}
