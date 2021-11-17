import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import InformationRow from '../components/InformationRow';
import ContactUsForm from '../components/ContactUsForm';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';

import homeImgFir from '../images/girl-earth.svg';
import clothing from '../../images/learn_clothing.svg';
import houseHold from '../../images/learn_household.svg';
import food from '../../images/learn_food.svg';
import transportation from '../../images/learn_transportation.svg';
import shopping from '../../images/learn_shopping.svg';
import anniversary from '../../images/dig_anniversary.png';
import {useAuth} from "../states/userState";
import logoImg from "../images/dig-logo.png";

const Home = () => {
  const {user, getCatScores} = useAuth();
  useEffect(() => {
    getCatScores()
  }, [])
  return (
    <div>
      <div className='background-color1'>
        <div className='container'>
          <div className='row mt-5 hero-row-reverse-mobile home-row jumbotron'>
            <Carousel>

              <Carousel.Item>
                <Card className='profile-card' border='primary'>
                  <div className="card-header">
                    <img
                      src={logoImg}
                      className='nav-bar-logo center-logo-carousel p-3'
                      alt='Dream In Green logo'
                    />
                  </div>
                  <div className='container'>
                    <div className='row mt-5 hero-row-reverse-mobile home-row jumbotron'>
                      <div className='col-lg-6 text-center txt-md-left'>

                        <div className='row mb-3'>
                          <h1 className='display-4 font-weight-bold'>
                            Monitor your greenhouse emissions
                          </h1>
                        </div>
                        {user && (<Link
                          to='/questionnaire'
                          className='btn btn-primary my-2 my-lg-0 py-3 px-5'
                        >
                          Get Started
                        </Link>)}
                        {!user && <Link
                          to='/welcome-questionnaire'
                          className='btn btn-primary my-2 my-lg-0 py-3 px-5'
                        >
                          Take Your First Quiz*
                        </Link>}
                        {!user && <div className='font-weight-bold'>
                          *Will have opportunity at end of quiz, to create an account or login, to be able to track
                          progress
                        </div>}
                      </div>
                      <div className='col-lg-6'>
                        <div className='hero-img-right card-headers'>
                          <img
                            src={homeImgFir}
                            className='fluid-img'
                            alt='Sitting on questionnaire'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <br/><br/>
                  </div>
                </Card>
              </Carousel.Item>

              <Carousel.Item>
                <Card className='profile-card' border='primary'>
                  <div className="card-header">
                    <img
                      src={logoImg}
                      className='nav-bar-logo center-logo-carousel p-3'
                      alt='Dream In Green logo'
                    />
                  </div>
                  <div className='container'>
                    <div className='row mt-5 hero-row-reverse-mobile home-row jumbotron'>
                      <div className='col-lg-6 text-center txt-md-left'>
                        <div className='row mb-3'>
                          <h1 className='display-4 font-weight-bold'>
                            Learn how your choice of travel can affect the environment.
                          </h1>
                        </div>

                        {user && (<Link
                          to='/questionnaire'
                          className='btn btn-primary my-2 my-lg-0 py-3 px-5'
                        >
                          Get Started
                        </Link>)}
                        {!user && <Link
                          to='/welcome-questionnaire'
                          className='btn btn-primary my-2 my-lg-0 py-3 px-5'
                        >
                          Take Your First Quiz*
                        </Link>}
                        {!user && <div className='font-weight-bold'>
                          *Will have opportunity at end of quiz, to create an account or login, to be able to track
                          progress
                        </div>}
                      </div>
                      <div className='col-lg-6'>
                        <div className='hero-img-right'>
                          <img
                            src={transportation}
                            className='fluid-img'
                            alt='Sitting on questionnaire'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer p-3">
                    <br/><br/>
                  </div>
                </Card>
              </Carousel.Item>

              <Carousel.Item>
                <Card className='profile-card' border='primary'>
                  <div className="card-header">
                    <img
                      src={logoImg}
                      className='nav-bar-logo center-logo-carousel p-3'
                      alt='Dream In Green logo'
                    />
                  </div>
                  <div className='container'>
                    <div className='row mt-5 hero-row-reverse-mobile home-row jumbotron'>
                      <div className='col-lg-6 text-center txt-md-left'>
                        <div className='row mb-3'>
                          <h1 className='display-4 font-weight-bold'>
                            Learn how much energy is being used in your house and lower your emissions.
                          </h1>
                        </div>
                        {user && (<Link
                          to='/questionnaire'
                          className='btn btn-primary my-2 my-lg-0 py-3 px-5'
                        >
                          Get Started
                        </Link>)}
                        {!user && <Link
                          to='/welcome-questionnaire'
                          className='btn btn-primary my-2 my-lg-0 py-3 px-5'
                        >
                          Take Your First Quiz*
                        </Link>}
                        {!user && <div className='font-weight-bold'>
                          *Will have opportunity at end of quiz, to create an account or login, to be able to track
                          progress
                        </div>}
                      </div>
                      <div className='col-lg-6'>
                        <div className='hero-img-right'>
                          <img
                            src={houseHold}
                            className='fluid-img'
                            alt='Sitting on questionnaire'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <br/><br/>
                  </div>
                </Card>
              </Carousel.Item>

              <Carousel.Item>
                <Card className='profile-card' border='primary'>
                  <div className="card-header">
                    <img
                      src={logoImg}
                      className='nav-bar-logo center-logo-carousel p-3'
                      alt='Dream In Green logo'
                    />
                  </div>
                  <div className='container'>
                    <div className='row mt-5 hero-row-reverse-mobile home-row jumbotron'>
                      <div className='col-lg-6 text-center txt-md-left'>
                        <div className='row mb-3'>
                          <h1 className='display-4 font-weight-bold'>
                            Learn how the foods you consume can affect the environment.
                          </h1>
                        </div>
                        {user && (<Link
                          to='/questionnaire'
                          className='btn btn-primary my-2 my-lg-0 py-3 px-5'
                        >
                          Get Started
                        </Link>)}
                        {!user && <Link
                          to='/welcome-questionnaire'
                          className='btn btn-primary my-2 my-lg-0 py-3 px-5'
                        >
                          Take Your First Quiz*
                        </Link>}
                        {!user && <div className='font-weight-bold'>
                          *Will have opportunity at end of quiz, to create an account or login, to be able to track
                          progress
                        </div>}
                      </div>
                      <div className='col-lg-6'>
                        <div className='hero-img-right'>
                          <img
                            src={food}
                            className='fluid-img'
                            alt='Sitting on questionnaire'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <br/><br/>
                  </div>
                </Card>
              </Carousel.Item>

              <Carousel.Item>
                <Card className='profile-card' border='primary'>
                  <div className="card-header">
                    <img
                      src={logoImg}
                      className='nav-bar-logo center-logo-carousel p-3'
                      alt='Dream In Green logo'
                    />
                  </div>
                  <div className='container'>
                    <div className='row mt-5 hero-row-reverse-mobile home-row jumbotron'>
                      <div className='col-lg-6 text-center txt-md-left'>
                        <div className='row mb-3'>
                          <h1 className='display-4 font-weight-bold'>
                            Learn how shopping affects the environment.
                          </h1>
                        </div>
                        {user && (<Link
                          to='/questionnaire'
                          className='btn btn-primary my-2 my-lg-0 py-3 px-5'
                        >
                          Get Started
                        </Link>)}
                        {!user && <Link
                          to='/welcome-questionnaire'
                          className='btn btn-primary my-2 my-lg-0 py-3 px-5'
                        >
                          Take Your First Quiz*
                        </Link>}
                        {!user && <div className='font-weight-bold'>
                          *Will have opportunity at end of quiz, to create an account or login, to be able to track
                          progress
                        </div>}
                      </div>
                      <div className='col-lg-6'>
                        <div className='hero-img-right'>
                          <img
                            src={shopping}
                            className='fluid-img'
                            alt='Sitting on questionnaire'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <br/><br/>
                  </div>
                </Card>
              </Carousel.Item>

              <Carousel.Item>
                <Card className='profile-card' border='primary'>
                  <div className="card-header">
                    <img
                      src={logoImg}
                      className='nav-bar-logo center-logo-carousel p-3'
                      alt='Dream In Green logo'
                    />
                  </div>
                  <div className='container'>
                    <div className='row mt-5 hero-row-reverse-mobile home-row jumbotron'>
                      <div className='col-lg-6 text-center txt-md-left'>
                        <div className='row mb-3'>
                          <h1 className='display-4 font-weight-bold'>
                            Learn how apparel production affects the environment.
                          </h1>
                        </div>
                        {user && (<Link
                          to='/questionnaire'
                          className='btn btn-primary my-2 my-lg-0 py-3 px-5'
                        >
                          Get Started
                        </Link>)}
                        {!user && <Link
                          to='/welcome-questionnaire'
                          className='btn btn-primary my-2 my-lg-0 py-3 px-5'
                        >
                          Take Your First Quiz*
                        </Link>}
                        {!user && <div className='font-weight-bold'>
                          *Will have opportunity at end of quiz, to create an account or login, to be able to track
                          progress
                        </div>}
                      </div>
                      <div className='col-lg-6'>
                        <div className='hero-img-right'>
                          <img
                            src={clothing}
                            className='fluid-img'
                            alt='Sitting on questionnaire'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <br/><br/>
                  </div>
                </Card>
              </Carousel.Item>

            </Carousel>

          </div>
        </div>
      </div>
      <div>
        <div className='container '>
          <InformationRow/>
          <div>
            <ContactUsForm/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
