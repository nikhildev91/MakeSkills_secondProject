import { useEffect, useState } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StudentRoute = ({ children }) => {
    const navigate = useNavigate()
    const userLogin = useSelector( state => state.userLogin)
    const { userInfo } = userLogin

  useEffect(() => {
    if(!userInfo && !userInfo.isStudent){
        navigate('/login')
    }
  }, [ userInfo ]);


  return (
    <>
      {!userInfo ? (
        <SyncOutlined
          spin
          className='d-flex justify-content-center display-1 text-primary p-5'
        />
      ) : (
        <div className='container-fluid'>{children}</div>
      )}
    </>
  );
};

export default StudentRoute;