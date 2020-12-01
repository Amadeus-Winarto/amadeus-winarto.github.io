import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardSubtitle, CardText } from 'reactstrap';  
import { Link } from 'react-router-dom';

function RenderIntro(){
  return  <Card>
            <CardBody>
                <div className='row'>
                <div className='col-md-4'>
                    <img width="100%" src="/assets/imgs/profile/dog.webp" alt="A Picture of Me :)"></img>
                </div>
                <div className='col-md-8'>
                    <CardTitle tag="h4">Hi! I'm <span style={{color:"#FFC607"}}>Amadeus Aristo Winarto</span></CardTitle>
                    <CardSubtitle tag="h6">Computer Science Undergrad @ National University of Singapore</CardSubtitle>
                    <hr />
                    <CardText>My name is Amadeus. And I have no idea what more to write...</CardText>
                </div>
                </div>
              </CardBody>
          </Card> ;
}

function RenderEducation(){
    return <Card>
                <CardBody>
                    <CardTitle tag="h5">Education </CardTitle>
                    <hr />
                    <CardSubtitle tag="h6">National University of Singapore</CardSubtitle>
                    <CardText>Year 1 Undergarduate <br></br>2020 - 2024 (Expected)</CardText>
                    <CardText>
                    Modules Taken:
                    <li>CS1101S: Programming Methodology</li>
                    <li>CS1231S: Discrete Structures</li>
                    <li>MA1101R: Linear Algebra</li>
                    <li>MA1521: Calculus For Computing</li>
                    </CardText>
                    <hr />
                    <CardSubtitle tag="h6">Hwa Chong Institution (College)</CardSubtitle>
                    <CardText>2018 - 2019</CardText>
                </CardBody>
            </Card>

}
function About (props) {
  return (
    <div className="container">
      <div className="row">
      </div>
      <div className="row">
      <div className="col-12 col-md-12 m-1">
        <RenderIntro/>
      </div>
      <div className="col-12 col-md-12 m-1">
        <RenderEducation />
      </div>
      </div>
    </div>
  );
}

export default About;