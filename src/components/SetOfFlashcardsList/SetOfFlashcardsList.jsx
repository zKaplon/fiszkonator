import { SetOfFlashcards } from '../SetOfFlashcards/SetOfFlashcards'

const flashcards = [
	{ title: 'tytuł', description: 'blablabla bla bla blblala lwsadlsad adsadsad sda' },
	{ title: 'tytuł2', description: 'blablabla bla bla blblala lwsadlsad adsadsad 2' },
]
let cardListIncrement = 0

export function SetOfFlashcardsList() {
	return flashcards.map(card => {
		cardListIncrement++
		return <SetOfFlashcards key={cardListIncrement} title={card.title} description={card.description}></SetOfFlashcards>
	})
}
