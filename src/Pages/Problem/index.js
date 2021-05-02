import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router-dom';
import * as PageRoutes from '../../router/router';
import Header from '../../components/Header';
import { PROBLEM_LEVEL, LEVEL_TITLE } from '../../constants/common';
import { getProblemList, getUserByEmail } from '../../redux/actions/appAction';

const ProblemList = ({
  appReducers,
  handleGetProblemList,
  handleGetUserByEmail,
}) => {
  const { problemList, currentUserDetail } = appReducers;
  const [currentProblemList, setCurrentProblemList] = useState([]);
  const history = useHistory();
  const handleSelectProblem = (problem_id) => {
    problem_id && history.push(`${PageRoutes.PROBLEM}/${problem_id}`);
  };

  useEffect(() => {
    !currentUserDetail &&
      handleGetUserByEmail({ email: sessionStorage.getItem('email') });
  }, []);

  useEffect(() => {
    currentUserDetail && handleGetProblemList({ id: currentUserDetail.id });
  }, [currentUserDetail]);

  useEffect(() => {
    if (problemList) {
      const beginnerList = problemList.filter(
        (problem) => problem.level === PROBLEM_LEVEL.BEGINNER,
      );
      const middleList = problemList.filter(
        (problem) => problem.level === PROBLEM_LEVEL.MIDDLE,
      );
      const advanceList = problemList.filter(
        (problem) => problem.level === PROBLEM_LEVEL.ADVANCE,
      );
      setCurrentProblemList([
        {
          level: PROBLEM_LEVEL.BEGINNER,
          list: beginnerList,
          title: LEVEL_TITLE.BEGINNER,
        },
        {
          level: PROBLEM_LEVEL.MIDDLE,
          list: middleList,
          title: LEVEL_TITLE.MIDDLE,
        },
        {
          level: PROBLEM_LEVEL.ADVANCE,
          list: advanceList,
          title: LEVEL_TITLE.ADVANCE,
        },
      ]);
    }
  }, [problemList]);

  return (
    <div className="d-flex flex-column height-100-per width-100-per">
      <Header />
      <div className="width-100-per problem-list-container d-flex justify-content-center">
        <div className="d-flex flex-column width-60-per justify-content-center align-items-center m-t-60">
          <h2 className="m-b-41"> The Core</h2>
          {currentProblemList &&
            currentProblemList.length > 0 &&
            currentProblemList.map((problem) => (
              <div
                key={problem.level}
                className="position-relative d-flex flex-column width-100-per align-items-center m-b-60"
              >
                <div className="problem-title-container min-width-by-px-180 position-absolute ps-t--18">
                  <h5 className="m-b-0 d-flex justify-content-center">
                    {problem.title}
                  </h5>
                </div>
                <div className="width-100-per height-by-px-232">
                  <img
                    alt="abc"
                    className="width-100-per height-100-per"
                    src={`/assets/background-${problem.level}.png`}
                  ></img>
                </div>
                <div className="detail-problem-list-container width-100-per d-flex justify-content-center ph-3">
                  {problem.list.length > 0 &&
                    problem.list.map((childProblem, index) => (
                      <div
                        role="button"
                        key={`item_${index}`}
                        className={`problem-item font-weight-bold d-flex justify-content-center align-items-center m-r-20 width-by-px-30 height-by-px-30 ${
                          childProblem.solve && 'solved-detail-problem'
                        }`}
                        onClick={() => {
                          handleSelectProblem(childProblem.id);
                        }}
                      >
                        {index + 1}
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  appReducers: state.appReducers,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetProblemList: (params) => dispatch(getProblemList(params)),
  handleGetUserByEmail: (params) => dispatch(getUserByEmail(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProblemList);
