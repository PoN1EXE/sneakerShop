import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { MainPage } from './pages/MainPage'
import { Favorites } from './pages/Favorites'
import { ShoppingCart } from './pages/ShoppingCart'
import { Profile } from './pages/Profile'

import styles from './App.module.scss'
import { CartModal } from './components/CartModal/CartModal'

function App() {
  return (
    <div className={styles.body}>
      <div className={styles.mainPageBackground}>
        <Header />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/cart' element={<ShoppingCart />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        <CartModal />
      </div>
    </div>
  )
}

export default App
