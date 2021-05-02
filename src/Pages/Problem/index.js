import React from 'react';
import Header from '../../components/Header';

const ProblemList = () => {
  
  const problem_list = [
    {
      id: 1,
      create_date: '2021-05-02',
      title: 'Intro Gate',
      description: 'Description 1',
      exp: 10,
      result: '1 2 3',
      level: 'Beginner',
      completed: true,
      user: 1,
      childProblems: [{ name: 'abc' }, { name: 'bcd' }],
    },
  ];
  return (
    <div className="d-flex flex-column height-100-per width-100-per">
      <Header />
      <div className="height-100-per width-100-per problem-list-container d-flex justify-content-center">
        <div className="d-flex flex-column width-60-per justify-content-center align-items-center">
          <h2 className="m-b-20"> The Core</h2>
          {problem_list.length > 0 &&
            problem_list.map((problem) => (
              <div className="position-relative d-flex flex-column width-100-per align-items-center">
                <div className="problem-title-container min-width-by-px-180 position-absolute ps-t--18">
                  <h5 className="m-b-0 d-flex justify-content-center">{problem.title}</h5>
                </div>
                <div
                  className="width-100-per height-by-px-232"
                  style={{
                    backgroundImage: `url(/assets/background-${problem.level}).png`,
                  }}
                >
                  <img
                    alt="abc"
                    className="width-100-per height-100-per"
                    src={`/assets/background-${problem.level}.png`}
                  ></img>
                </div>
                <div className="detail-problem-list-container width-100-per d-flex justify-content-center ph-3">
                  {problem.childProblems.length > 0 &&
                    problem.childProblems.map((child, index) => (
                      <div className="problem-item d-flex justify-content-center align-items-center m-r-20 width-by-px-30 height-by-px-30">
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

export default ProblemList;
