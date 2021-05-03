import React from 'react';
import APIService from '../../core/api/APIService';
import avatar from '../../default_avatar.jpeg';

function TopicList({ topics, editBtn, deleteBtn, currentUserDetail }) {
  const fiting = {
    width: '100%',
    borderRadius: '50%',
  };

  return (
    <div>
      {topics &&
        topics.map((topic) => {
          return (
            <div key={topic.id}>
              <div className="row">
                <div className="col-md-1">
                  <img style={fiting} src={avatar} alt="default avatar" />
                </div>
                <div className="col-md-11">
                  <div className="row">
                    <h4 className="col-md-3">{topic.title}</h4>
                    <p className="col-md-9">Create date: {topic.create_date}</p>
                  </div>
                  <p>{topic.content}</p>
                  {currentUserDetail && currentUserDetail.is_staff && (
                    <div className="row">
                      <div className="col-md-2">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={() => editBtn(topic)}
                        >
                          Update
                        </button>
                      </div>
                      <div className="col-md-2">
                        <button
                          type="button"
                          onClick={() => deleteBtn(topic)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <hr className="hrclass" />
            </div>
          );
        })}
    </div>
  );
}

export default TopicList;
