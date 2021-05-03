import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateTopic, createTopic } from '../../redux/actions/appAction';
import APIService from '../../core/api/APIService';

function Form({
  topic,
  updatedInformation,
  insertedInformation,
  handleUpdateTopic,
  appReducers,
  handleCreateTopic,
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { currentUserDetail } = appReducers;

  useEffect(() => {
    setTitle(topic.title);
    setContent(topic.content);
  }, [topic]);

  const requestUpdateTopic = () => {
    const params = {
      topicId: topic.id,
      params: { title, content, user: currentUserDetail.id },
    };
    handleUpdateTopic(params.topicId, params.params);
  };
  const insertTopic = () => {
    const params = {
      title,
      content,
      user: currentUserDetail.id,
    };
    handleCreateTopic(params);
  };
  return (
    <div>
      {topic ? (
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Please Enter The Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <br />

          {topic.id ? (
            <button
              type="button"
              onClick={() => {
                requestUpdateTopic();
              }}
              className="btn btn-success"
            >
              Update topic
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                insertTopic();
              }}
              className="btn btn-success"
            >
              Insert topic
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  appReducers: state.appReducers,
});

const mapDispatchToProps = (dispatch) => ({
  handleUpdateTopic: (topicId, params) =>
    dispatch(updateTopic(topicId, params)),
  handleCreateTopic: (params) => dispatch(createTopic(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Form);
