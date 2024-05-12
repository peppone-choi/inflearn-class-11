import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import MainPage from './pages/MainPage';

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  </div>
);

export default App;
