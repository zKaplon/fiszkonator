import styles from './App.module.css'
import { SetOfFlashcards } from './components/SetOfFlashcards/SetOfFlashcards'
import { Button } from './components/Button/Button'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

function App() {
	return (
		<>
			<div className={styles.background}>
				<header className={styles.titleBackground}>
					<h1 className={styles.siteTitle}>FISZKONATOR</h1>
				</header>

      <main className={styles.setsOfFlashcardsContainer}>
      <SetOfFlashcards></SetOfFlashcards>
      <SetOfFlashcards></SetOfFlashcards>
      <SetOfFlashcards></SetOfFlashcards>
      <SetOfFlashcards></SetOfFlashcards>
      </main>
      {/* <AddNewCardButton></AddNewCardButton> */}
      
      {/*  */}
  <Button icon={faCirclePlus} btnClass={`${'addBtn'}`}></Button>

      </div>
		</>
	)
}

export default App
