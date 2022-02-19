import { Routes, Route, Link } from 'react-router-dom'
import MadLibList from './MadLibList'
import MadLib from './MadLib'
import NotFound from './NotFound'
import styles from './App.module.css'

function App() {
  return (
    <>
      <header className={styles.header}>
        <Link className={styles.headerLink} to="/">
          Sanity Mad Libs
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <Routes>
            <Route path="/" element={<MadLibList />}  />
            <Route path="/mad-libs/:slug" element={<MadLib />} />
            <Route element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
