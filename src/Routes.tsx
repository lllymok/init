import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from 'pages/singUp/SingUp';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
