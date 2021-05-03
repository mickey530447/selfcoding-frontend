import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useForm } from 'react-hook-form';
import { Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { submitAnswer, getProblemDetail } from '../../redux/actions/appAction';
import Header from '../../components/Header';

function ProblemDetail({
  handleSubmitAnswer,
  appReducer,
  handleGetProblemDetail,
}) {
  const { problemDetail } = appReducer;
  const { problem_id } = useParams();
  const [detail, setDetail] = useState(undefined);

  const publicChatMethods = useForm({
    defaultValues: {
      source: '',
    },
  });

  useEffect(() => {
    problem_id && handleGetProblemDetail(problem_id);
  }, [problem_id]);

  useEffect(() => {
    problemDetail && setDetail(problemDetail);
  }, [problemDetail]);

  const { handleSubmit, register, watch } = publicChatMethods;
  const answerValue = watch('script');

  const formSubmitAnswer = (data) => {
    const params = {
      ...data,
      compilerId: 56,
      compilerVersionId: 5,
    };
    handleSubmitAnswer(params);
  };

  return (
    <div>
      <Header />
      {detail && (
        <form
          onSubmit={handleSubmit(formSubmitAnswer)}
          className="d-flex width-100-per flex-column height-100-per p-t-50 p-b-50 align-items-center"
        >
          <div className="d-flex width-90-per height-100-per problem-detail-container shadow">
            <div className="d-flex flex-column height-100-per width-30-per problem-description px-3 ph-8">
              <h3>Description</h3>
              <p>{detail.description}</p>
              <h3>Result</h3>
              <p>{detail.result}</p>
            </div>
            <div className="d-flex flex-column height-100-per width-70-per">
              <textarea
                id="answer"
                name="source"
                ref={register}
                className="width-100-per problem-solver height-100-per "
              ></textarea>
            </div>
          </div>
          <div className="d-flex justify-content-end width-90-per p-l-20">
            <Button
              className="mh-6"
              color="primary"
              disabled={answerValue === ''}
            >
              Submit Answer
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  appReducer: state.appReducers,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetProblemDetail: (params) => dispatch(getProblemDetail(params)),
  handleSubmitAnswer: (params) => dispatch(submitAnswer(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProblemDetail);
