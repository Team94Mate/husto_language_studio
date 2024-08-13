import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './Components/Pages/HomePage/HomePage';
import { NotFoundPage } from './Components/Pages/NotFoundPage';
import { StorageProvider } from './storage/StorageContext';

export const Root = () => (
  <StorageProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </StorageProvider>
);
