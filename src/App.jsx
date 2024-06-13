import styles from './App.module.css'

function App() {
	return (
		<>
      <div className={styles.background}>
			<header className={styles.titleBackground}>
				<h1 className={styles.siteTitle}>FISZKONATOR</h1>
			</header>

      <main className={styles.setOfFlashcardsContainer}>
        <div className={styles.setOfFlashcards}></div>
        <div className={styles.setOfFlashcards}></div>
        <div className={styles.setOfFlashcards}></div>
        <div className={styles.setOfFlashcards}></div>
        <div className={styles.setOfFlashcards}></div>
        <div className={styles.setOfFlashcards}></div>
        <div className={styles.setOfFlashcards}></div>
      </main>

      </div>
		</>
	)
}

export default App
