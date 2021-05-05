import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from 'reactstrap';
import {
  getClassList,
  enrollInClass,
  showAlert,
} from '../../redux/actions/appAction';
import Header from '../../components/Header';

function ClassRoom({
  appReducer,
  handleGetClassList,
  handleEnrollClass,
  handleShowAlert,
}) {
  const { currentUserDetail, classList, enrollClassSuccess } = appReducer;
  const [classListState, setClassListState] = useState([]);
  useEffect(() => {
    handleGetClassList({
      user_id: currentUserDetail.id,
    });
  }, []);

  useEffect(() => {
    classList && setClassListState(classList);
  }, [classList]);

  const handleEnrollInclass = (class_id) => {
    handleEnrollClass({
      user_id: currentUserDetail.user_id,
      class_id,
    });
  };

  useEffect(() => {
    enrollClassSuccess &&
      handleShowAlert({
        type: 'success',
        state: true,
        message: 'Enroll in Class Success',
        cssClass:
          'justify-content-end position-fixed ps-t-30 ps-r-20 custom-toast',
      });
  }, [enrollClassSuccess]);

  return (
    <div>
      <Header />
      {currentUserDetail.is_staff ? (
        <div> admin form create class here</div>
      ) : (
        classListState.length > 0 &&
        classListState.map((appClass) => (
          <div className="d-flex justify-content-between align-items-center shadow width-70-per">
            <div className="d-flex flex-column">
              <h5>{appClass.title}</h5>
              <p>{appClass.content}</p>
            </div>
            <Button
              onClick={() => {
                handleEnrollInclass(appClass.id);
              }}
              disabled={appClass.enrollment}
              color="info"
            >
              Enroll
            </Button>
          </div>
        ))
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  appReducer: state.appReducers,
});

const mapDispatchToProps = (dispatch) => ({
  handleShowAlert: (params) => dispatch(showAlert(params)),
  handleGetClassList: (params) => dispatch(getClassList(params)),
  handleEnrollClass: (params) => dispatch(enrollInClass(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ClassRoom);
