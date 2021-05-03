import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from 'reactstrap';
import TopicList from '../../components/TopicList';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  getTopicList,
  deleteTopic,
  verifyTopic,
} from '../../redux/actions/appAction';
import Form from '../../components/Form';
import Header from '../../components/Header';

function TopicPage({
  handleGetTopicList,
  appReducers,
  handleDeleteTopic,
  handleVerifyTopic,
}) {
  const { topicList, currentUserDetail } = appReducers;
  const [topics, setTopics] = useState([]);
  const [editTopic, setEditTopic] = useState(null);

  useEffect(() => {
    if (topicList && currentUserDetail) {
      const verifyList = topicList.filter((item) => item.isVerified);
      setTopics(verifyList);
    }
  }, [topicList, currentUserDetail]);

  const filterPendingTopic = () => {
    if (topicList) {
      const unVerifyList = topicList.filter((item) => !item.isVerified);
      setTopics(unVerifyList);
    }
  };

  useEffect(() => {
    handleGetTopicList();
  }, []);

  const editBtn = (topic) => {
    setEditTopic(topic);
  };

  const deleteBtn = (topic) => {
    handleDeleteTopic(topic.id);
  };

  const filterPublicTopic = () => {
    if (topicList) {
      const myTopicList = topicList.filter((item) => item.isVerified);
      setTopics(myTopicList);
    }
  };

  const filterMyTopic = () => {
    if (topicList && currentUserDetail) {
      const myTopicList = topicList.filter(
        (item) => item.user === currentUserDetail.id,
      );
      setTopics(myTopicList);
    }
  };

  const requestVerifyTopic = (topic_id) => {
    const params = { topic_id, isVerified: true };
    handleVerifyTopic(params);
  };

  const updatedInformation = (topic) => {
    const new_topic = topics.map((mytopic) => {
      if (mytopic.id === topic.id) {
        return topic;
      }
      return mytopic;
    });
    setTopics(new_topic);
  };

  const topicForm = () => {
    setEditTopic({ title: '', content: '' });
  };

  const insertedInformation = (topic) => {
    const new_topic = [...topics, topic];
    setTopics(new_topic);
  };

  const storyboard = {
    borderRight: '1px solid #ecf0f1',
    // marginLeft: '10px',
  };

  const side_bar = {};

  return (
    <div className="App">
      <Header />
      <br />
      <br />
      <div className="row">
        <div style={storyboard} className="offset-md-1 col-md-7 col-xs-12">
          <TopicList
            currentUserDetail={currentUserDetail}
            topics={topics}
            editBtn={editBtn}
            deleteBtn={deleteBtn}
            requestVerifyTopic={requestVerifyTopic}
          />
          {editTopic ? (
            <Form
              topic={editTopic}
              updatedInformation={updatedInformation}
              insertedInformation={insertedInformation}
            />
          ) : null}
        </div>
        <div className="col-md-4 col-xs-12">
          <div className="d-flex ">
            <button
              type="button"
              onClick={topicForm}
              className="btn btn-primary m-r-10"
            >
              Insert
            </button>
            <Button
              type="button"
              color="primary"
              onClick={() => {
                filterMyTopic();
              }}
              className="m-r-10"
            >
              My Topic
            </Button>
            {currentUserDetail && currentUserDetail.is_staff && (
              <Button
                type="button"
                onClick={() => {
                  filterPendingTopic();
                }}
                color="success"
                className="m-r-10"
              >
                Pending Topic
              </Button>
            )}
            <Button
              type="button"
              onClick={() => {
                filterPublicTopic();
              }}
              color="info"
            >
              Public Topic
            </Button>
          </div>

          <div style={side_bar}>
            <div
              style={{ backgroundImage: 'url(/assets/challenge.png)' }}
              className="challenge"
            >
              <div className="side-bar-item-text">
                <span>Joining Challenge to improve your skill</span>
              </div>
            </div>

            <div style={{ backgroundColor: 'gray' }} className="challenge">
              <div className="side-bar-item-text">
                <span>Joining Challenge to improve your skill</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  appReducers: state.appReducers,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetTopicList: (params) => dispatch(getTopicList(params)),
  handleDeleteTopic: (params) => dispatch(deleteTopic(params)),
  handleVerifyTopic: (params) => dispatch(verifyTopic(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TopicPage);
