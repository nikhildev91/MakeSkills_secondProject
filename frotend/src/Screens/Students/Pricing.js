import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const Pricing = () => {
  return (
    <div className='pricingBox mt-3' style={{ minHeight: '76vh' }}>
      <div className='container mt-3'>
        <div className='d-flex justify-content-center'>
          <h1>Plan Pricing</h1>
        </div>
        <div className='row mt-5'>
          <div className='col-sm-12 col-md-6 p-2'>
            <div className='cardBox p-4 shadow'>
              <div className='d-flex justify-content-center'>
                <h4 style={{ fontWeight: 'bold' }}>
                  <u>Free</u>
                </h4>
              </div>
              <div className='container align-item-center d-flex justify-content-center mt-2'>
                <div className='row'>
                  <div className='col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center mt-3'>
                    <h6 style={{ fontWeight: 'bold', fontSize: '15px' }}>
                      Buy Courses
                    </h6>
                  </div>
                  <div className='col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center mt-3'>
                    <h5 style={{ fontWeight: 'bold', fontSize: '15px' }}>
                      <i className='fas fa-check text-success'></i>
                    </h5>
                  </div>
                  <div className='col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center mt-3'>
                    <h5 style={{ fontWeight: 'bold', fontSize: '15px' }}>
                      Chat Instructor
                    </h5>
                  </div>
                  <div className='col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center mt-3'>
                    <h5 style={{ fontWeight: 'bold', fontSize: '15px' }}>
                      <i className='fas fa-times text-danger'></i>
                    </h5>
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-center mt-5'>
                <LinkContainer to='/'>
                  <span className='btn btn-success btn-block'>
                    Start Course
                  </span>
                </LinkContainer>
              </div>
            </div>
          </div>
          <div className='col-sm-12 col-md-6 p-2'>
            <div className='cardBox p-4 shadow'>
              <div className='d-flex justify-content-center'>
                <h4 style={{ fontWeight: 'bold' }}>
                  <u>Premium</u>
                </h4>
              </div>
              <div className='container align-item-center d-flex justify-content-center mt-2'>
                <div className='row'>
                  <div className='col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center mt-3'>
                    <h6 style={{ fontWeight: 'bold', fontSize: '15px' }}>
                      Buy Courses
                    </h6>
                  </div>
                  <div className='col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center mt-3'>
                    <h5 style={{ fontWeight: 'bold', fontSize: '15px' }}>
                      <i className='fas fa-check text-success'></i>
                    </h5>
                  </div>
                  <div className='col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center mt-3'>
                    <h5 style={{ fontWeight: 'bold', fontSize: '15px' }}>
                      Chat Instructor
                    </h5>
                  </div>
                  <div className='col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center mt-3'>
                    <h5 style={{ fontWeight: 'bold', fontSize: '15px' }}>
                      <i className='fas fa-check text-success'></i>
                    </h5>
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-center mt-5'>
                <span className='btn btn-success btn-block'>Get Premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
