import React from 'react';
import { Spinner } from 'reactstrap';
import avatar from '../../default_avatar.jpeg';

function TopicList({
  topics,
  editBtn,
  deleteBtn,
  currentUserDetail,
  requestVerifyTopic,
}) {
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
                  <div className="d-flex justify-content-between width-100-per">
                    <p className="width-90-per m-r-20">{topic.content}</p>
                    {!topic.isVerified && (
                      <div className="d-flex align-items-center">
                        <p className="m-b-0 m-r-5">Pending</p>
                        <Spinner size="sm" />
                      </div>
                    )}
                  </div>
                  {currentUserDetail &&
                    currentUserDetail.id === topic.user &&
                    topic.isVerified && (
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
                  {currentUserDetail &&
                    currentUserDetail.is_staff &&
                    !topic.isVerified && (
                      <div className="row">
                        <div className="col-md-2">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={() => requestVerifyTopic(topic.id)}
                          >
                            Verify
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
