import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import CustomerList from './pages/customer/List';
import CustomerDetail from './pages/customer/Detail';
import CustomerAdd from './pages/customer/Add';
import LeadList from './pages/lead/List';
import FollowupList from './pages/followup/List';
import Funnel from './pages/Funnel';
import Report from './pages/Report';
import Reminder from './pages/Reminder';
import Mine from './pages/Mine';
import { storage } from './utils/storage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = storage.get('accessToken');
    setIsLoggedIn(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={() => setIsLoggedIn(true)} />}
      />
      <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />}>
        <Route index element={<Navigate to="/customers" />} />
        <Route path="customers" element={<CustomerList />} />
        <Route path="customers/:id" element={<CustomerDetail />} />
        <Route path="customers/add" element={<CustomerAdd />} />
        <Route path="leads" element={<LeadList />} />
        <Route path="followups" element={<FollowupList />} />
        <Route path="funnel" element={<Funnel />} />
        <Route path="report" element={<Report />} />
        <Route path="reminder" element={<Reminder />} />
        <Route path="mine" element={<Mine />} />
      </Route>
    </Routes>
  );
}

export default App;
