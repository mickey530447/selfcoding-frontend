import React, { useEffect } from 'react';
import Layout from 'antd/lib/layout/layout';
import { Carousel } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUserByEmail } from '../../redux/actions/appAction';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import carousel1 from './carousel1.jpeg';
import carousel2 from './carousel2.jpeg';
import carousel3 from './carousel3.png';
import carousel4 from './carousel4.jpeg';
import logo1 from './phat-trien-tu-duy-sang-tao.png';
import logo2 from './lam-quen-cong-nghe.png';
import logo3 from './mo-rong-co-hoi-nghe-nghiep.png';
import pic1 from './chia-khoa-lap-trinh.png';

function Home({ handleGetUserDetail }) {
//   const { currentUser } = appReducer;
  const body = {
    background: '#fff',
  };
  const text = {
    color: '#AB9FB2',
  };
  const list_key_features = {};
  const list_li = {
    listStyle: 'none',
    display: 'inline-block',
    width: '100%',
    marginBottom: '40px',
  };
  const heading_key = {
    display: 'flex',
    alignItem: 'center',
    marginBottom: '15px',
  };
  const heading_text = {
    fontSize: '26px',
    color: '#1e266d',
  };
  const normal_text = {
    fontSize: '18px',
  };
  const landing_img = {
    maxWidth: '100%',
    verticalAlign: 'middle',
    height: '32px',
  };
  const test = {
    width: '100%',
  };
  useEffect(() => {
    //   if(currentUser)
    //   {
    //       handle
    //   }
    handleGetUserDetail({ email: sessionStorage.getItem('email') });
    // currentUser && handleGetUserDetail({ email: currentUser.email });
    // currentUser && console.log(currentUser);
  }, []);
  return (
    <div>
      <Layout style={body}>
        <Header />
        <Carousel autoplay>
          <div>
            <img className="carousel1" src={carousel1} alt="carou1" />
          </div>
          <div>
            <img className="carousel1" src={carousel2} alt="carou1" />
          </div>
          <div>
            <img className="carousel1" src={carousel3} alt="carou1" />
          </div>
          <div>
            <img className="carousel1" src={carousel4} alt="carou1" />
          </div>
        </Carousel>
        <br />
        <div className="text-center">
          <h1 style={text}>
            Programming <br />
            is the in-demand skill for the future
          </h1>
        </div>
        <br />
        <div className="row">
          <div className="col-xs-12 col-sm-5 col-md-7">
            <img style={test} src={pic1} alt="abc" />
          </div>
          <div className="col-xs-12 col-sm-7 col-md-5">
            <ul style={list_key_features}>
              <li style={list_li}>
                <div style={heading_key}>
                  <img
                    style={landing_img}
                    src={logo1}
                    alt="Develop creative thing"
                  />
                  <h3 style={heading_text}>Develop creative thinking</h3>
                </div>
                <p style={normal_text}>
                  Learning to code helps you improve logical thinking and take
                  you to a new level in solving problems.
                </p>
              </li>
              <li style={list_li}>
                <div style={heading_key}>
                  <img
                    style={landing_img}
                    src={logo2}
                    alt="Get to know the technology world"
                  />
                  <h3 style={heading_text}>Get to know the technology world</h3>
                </div>
                <p style={normal_text}>
                  Learning to code to step into the world of Information
                  Technology and adapt to the Industry 4.0.
                </p>
              </li>
              <li style={list_li}>
                <div style={heading_key}>
                  <img
                    style={landing_img}
                    src={logo3}
                    alt="Get more job opportunities"
                  />
                  <h3 style={heading_text}>Get more job opportunities</h3>
                </div>
                <p style={normal_text}>
                  Programming jobs are growing 50% faster than the overall job
                  market with an average salary of 30% higher than that of other
                  jobs.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <Footer />
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => ({
  appReducer: state.appReducers,
});

const mapDispatchToProps = (dispatch) => ({
  handleGetUserDetail: (params) => dispatch(getUserByEmail(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Home);
