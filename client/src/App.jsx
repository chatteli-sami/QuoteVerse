import React from 'react'
import FirstPage from './Pages/FirstPage'
import Login from './Pages/Login';
import Singup from './Pages/Singup';
import Dashboard from './Pages/Dashboard';
import AddQuotes from './Pages/AddQuotes';
import OneQuote from './Pages/OneQuote';
import Profile from './Pages/Profile';
import Search from './Pages/Search';
import UpdateQuotes from './Pages/UpdateQuotes';
import EditProfile from './Pages/EditProfile';
import MyQuotes from './Pages/MyQuotes';
import FavoriteQuotes from './Pages/FavoriteQuotes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-quote" element={<AddQuotes />} />
        <Route path="/quote/:id" element={<OneQuote />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/update-quote/:id" element={<UpdateQuotes />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/my-quotes" element={<MyQuotes />} />
        <Route path="/favorite-quotes" element={<FavoriteQuotes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App