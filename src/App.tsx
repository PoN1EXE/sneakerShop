import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { MainPage } from './pages/MainPage'
import { Favorites } from './pages/Favorites'
import { NotFound } from './pages/NotFound'
import { Profile } from './pages/Profile'
import { CartModal } from './components/CartModal/CartModal'

import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.body}>
      <div className={styles.mainPageBackground}>
        <Header />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/Favorites' element={<Favorites />} />
          <Route path='/Profile' element={<Profile />} />
        </Routes>
        <CartModal />
      </div>
    </div>
  )
}

export default App
