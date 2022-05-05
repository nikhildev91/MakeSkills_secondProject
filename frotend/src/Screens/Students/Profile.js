import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo]);

  return (
    <div style={{ minHeight: '78vh' }}>
      <div className='container'>
        <div className='d-flex justify-content-center mt-5'>
          <h1 style={{ fontWeight: 'bold' }}>Profile</h1>
        </div>
        <div className='d-flex justify-content-center'>
          <div className='profile'></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
