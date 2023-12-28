import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const DefaultPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard/profile');
  }, []);
  return (
    <>
    <Outlet />
    </>
  )
};

export default DefaultPage;
