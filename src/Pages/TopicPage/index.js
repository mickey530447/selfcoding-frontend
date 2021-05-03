import React, { useState, useEffect } from "react";
import TopicList from '../../components/TopicList';
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "../../components/Form";
import Header from '../../components/Header';

function TopicPage() {
  const [topics, setTopics] = useState([]);
  const [editTopic, setEditTopic] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/topics/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${sessionStorage.getItem('mytoken')}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setTopics(res))
      // .catch((err) => console.log(err));
  }, []);

  const editBtn = (topic) => {
    setEditTopic(topic);
  };

  const deleteBtn = (topic) => {
    const new_topics = topics.filter(mytopic => {
      if (mytopic.id === topic.id) {
        return false
      }
      return true;
    })
    setTopics(new_topics)
  }

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
    setEditTopic({ title: '', content: '' })
  }

  const insertedInformation = (topic) => {
    const new_topic = [...topics, topic]
    setTopics(new_topic)
  }

  const storyboard = {
    borderRight: '1px solid #ecf0f1',
    // marginLeft: '10px',

  }

  const side_bar = {

  }

  return (
    <div className="App">
      <Header />
      <br />
      <br />
      <div className="row">
        <div style={storyboard} className="offset-md-1 col-md-7 col-xs-12">
          <TopicList topics={topics} editBtn={editBtn} deleteBtn={deleteBtn} />
          {editTopic ? (
            <Form topic={editTopic} updatedInformation={updatedInformation} insertedInformation={insertedInformation} />
          ) : null}
        </div>
        <div className="col-md-4 col-xs-12">
          <button type="button" onClick={topicForm} className="btn btn-primary">Insert</button>
          <div style={side_bar}>
            <div style={{backgroundImage: "url(/assets/challenge.png)"}} className="challenge">
              <div className = "side-bar-item-text">
                <span>Joining Challenge to improve your skill</span>
              </div>
            </div>

            <div style = {{backgroundColor:"gray"}} className="challenge">
              <div className = "side-bar-item-text">
                <span>Joining Challenge to improve your skill</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicPage;
