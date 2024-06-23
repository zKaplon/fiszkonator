import styles from './App.module.css'
import { Button } from './components/Button/Button'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import {SetOfFlashcardsList} from './components/SetOfFlashcardsList/SetOfFlashcardsList'

function App() {
	return (
		<>
			<div className={styles.background}>
				<header className={styles.titleBackground}>
					<h1 className={styles.siteTitle}>FISZKONATOR</h1>
				</header>

				<main className={styles.setsOfFlashcardsContainer}>
					<SetOfFlashcardsList></SetOfFlashcardsList>
				</main>

				<Button icon={faCirclePlus} btnClass={`${'addBtn'}`}></Button>
			</div>
		</>
	)
}

export default App
