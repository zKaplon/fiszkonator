
import styles from './App.module.css'
import { SetOfFlashcards } from "./components/SetOfFlashcards/SetOfFlashcards";


function App() {
	return (
		<>

      <div className={styles.background}>
			<header className={styles.titleBackground}>
				<h1 className={styles.siteTitle}>FISZKONATOR</h1>
			</header>

      <main className={styles.setOfFlashcardsContainer}>
      <SetOfFlashcards></SetOfFlashcards>
      </main>

      </div>
		</>
	)

}

export default App;
