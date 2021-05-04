import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Edit3 } from 'react-feather';
import Header from '../../components/Header';

const ProfilePage = ({ appReducer }) => {
  const { currentUserDetail } = appReducer;
  return (
    <div>
      <Header />
      <div className="width-100-per d-flex justify-content-center m-t-90">
        <div className="width-70-per d-flex shadow ph-20 border-radius-px-20">
          <div className="width-30-per d-flex flex-column">
            <div className="avatar-section d-flex flex-column align-items-center">
              <div className="avatar width-by-px-100 height-by-px-100 p-b-50 m-b-15">
                <img
                  alt="images not found"
                  src="/assets/background-MIDDLE.png"
                />
              </div>
              <h5>{currentUserDetail.name}</h5>
            </div>
            <div className="d-flex flex-column align-items-center info-section">
              <p className="bold">{currentUserDetail.email}</p>
              <p className="bold">Exp: {currentUserDetail.exp}</p>
            </div>
          </div>
          <div className="width-65-per d-flex flex-column m-l-30">
            <div className="language-header d-flex width-100-per justify-content-between">
              <p className="language-font m-b-2">Languages</p>
              <Edit3 className="cursor-pointer"></Edit3>
            </div>
            <div className="d-flex width-100-per languages-container flex-wrap p-t-8">
              <div className="d-flex m-r-8">
                <div className="detail-language-contain border-radius-px-30 d-flex justify-content-between align-items-center p-l-20 p-r-20 ph-6">
                  <img src="/assets/js.svg" alt="can't find images" />
                  <p className="language-text m-l-10 m-b-0">Javascript</p>
                </div>
              </div>
              <div className="d-flex">
                <div className="detail-language-contain border-radius-px-30 d-flex justify-content-between align-items-center p-l-20 p-r-20 ph-6">
                  <img src="/assets/py.svg" alt="can't find images" />
                  <p className="language-text m-l-10 m-b-0">Python</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  appReducer: state.appReducers,
});

const mapDispatchToProps = () => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProfilePage);
