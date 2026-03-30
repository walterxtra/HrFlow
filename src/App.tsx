import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db, signInWithGoogle, logout } from './lib/firebase';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import { Button } from './components/ui/Button';
import { Users } from 'lucide-react';

// Auth Context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: string | null;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  role: null,
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userRef);
          
          let currentRole = 'user';
          if (userDoc.exists()) {
            currentRole = userDoc.data().role;
          } else {
            // Create user document if it doesn't exist
            currentRole = currentUser.email === "walterkeith697@gmail.com" ? 'admin' : 'user';
            await setDoc(userRef, {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              role: currentRole,
              createdAt: new Date().toISOString()
            });
          }
          setRole(currentRole);
        } catch (err) {
          console.error("Error syncing user profile:", err);
          // Fallback for UI state
          setRole(currentUser.email === "walterkeith697@gmail.com" ? 'admin' : 'user');
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, role, isAdmin }}>
      <Router>
        <div className="min-h-screen flex flex-col font-sans text-slate-900">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route 
                path="/dashboard" 
                element={
                  loading ? (
                    <div className="h-screen flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                  ) : user ? (
                    <Dashboard />
                  ) : (
                    <LoginScreen />
                  )
                } 
              />
            </Routes>
          </main>
          <FooterWrapper />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

function LoginScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Users className="text-white w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
        <p className="text-slate-600 mb-8">Sign in to access your HRFlow dashboard.</p>
        <Button size="lg" className="w-full" onClick={signInWithGoogle}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

function FooterWrapper() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  if (isDashboard) return null;
  return <Footer />;
}
