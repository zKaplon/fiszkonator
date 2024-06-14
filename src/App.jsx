import styles from './App.module.css'
import { SetOfFlashcards } from './components/SetOfFlashcards/SetOfFlashcards'
import { AddNewCardButton } from './components/AddNewCardButton/AddNewCardButton'

function App() {
	return (
		<>
			<div className={styles.background}>
				<header className={styles.titleBackground}>
					<h1 className={styles.siteTitle}>FISZKONATOR</h1>
				</header>

				<main className={styles.setOfFlashcardsContainer}>
					<SetOfFlashcards></SetOfFlashcards>
					<SetOfFlashcards></SetOfFlashcards>
					<SetOfFlashcards></SetOfFlashcards>
					<SetOfFlashcards></SetOfFlashcards>
				</main>
          <AddNewCardButton></AddNewCardButton>
			</div>
		</>
	)
}

export default App
