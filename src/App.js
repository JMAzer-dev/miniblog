//CSS
import './App.css';

//hooks
import { useState, useEffect } from 'react';
import { useAuthenticantion } from './hooks/useAuthenticantion';

// router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//firebase
import { onAuthStateChanged } from 'firebase/auth';

// Context
import { AuthProvider } from './context/AuthContext';

//components
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

//pages
import Home from './pages/home/Home'
import About from './pages/about/About'
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import CreatePost from './pages/createpost/CreatePost';
import Dashboard from './pages/dashboard/Dashboard';
import Search from './pages/search/Search';
import Post from './pages/post/Post';
import EditPost from './pages/editpost/EditPost';


function App() {

  const [user, setUser] = useState(undefined)
  const { auth } = useAuthenticantion()

  // a const é o valor do usuario comparado com undefined
  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/search' element={<Search />} />
              <Route path='/posts/:id' element={<Post />}/>
              <Route path="/about" element={<About />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              {/*Usuarios autenticados */}
              <Route path='/posts/edit/:id' element={user ? <EditPost /> : <Navigate to="/login" />}/>
              <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/login" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
