import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './Components/Layout'
import AddTransactionPage from './Pages/AddTransactionPage'
import EditTransactionPage from './Pages/EditTransactionPage'
import HomePage from './Pages/HomePage'
import NotFoundPage from './Pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="ekle" element={<AddTransactionPage />} />
          <Route path="duzenle/:id" element={<EditTransactionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
