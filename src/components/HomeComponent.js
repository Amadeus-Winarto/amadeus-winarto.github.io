import React from 'react';
import pdf from "../shared/CV.pdf";
import { Card, CardTitle, CardBody, CardText, Button} from 'reactstrap';  
import { Link } from 'react-router-dom';

function RenderIntro(){
  return  <Card>
            <CardBody>
                <div className='row'>
                <div className='col-md-3'>
                    <img width="100%" src="/assets/imgs/profile/profile.jpeg" alt=""></img>
                </div>
                <div className='col-md'>
                    <CardTitle tag="h4">Hi! I'm <span style={{color:"#FFC607"}}>Amadeus Aristo Winarto</span></CardTitle>
                    <hr />
                    <CardText>I'm currently a first year Computer Science undergraduate at the National University of Singapore</CardText>
                    <CardText>I'm interested in generalisation of machine learning algorithms, out-of-distribution detection, and adversarial machine learning. I'm also broadly interested in various topics related to computer science and mathematics.</CardText>
                    <CardText>Once in a while I'll do a write-up on topics that interest me and post it <Link to={`/posts`}>here</Link></CardText>
                    <div style={{'text-align' : "right"}}>
                      <Button color="warning" onClick={() => window.open(pdf)}>Resume</Button>
                    </div>
                </div>
                </div>
              </CardBody>
          </Card> ;
}

function RenderEachFeatured(post){
  return <div>
            <Link to={`/posts/${post.id}`}>
              <h6>{post.name}</h6>
              <div style={{'text-align' : "center"}}>
                <img width="50%" src={post.image} alt=""></img>
              </div>              
            </Link>
            <p> <i className="fa fa-calendar" /> Published : {new Date(post.date).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"})}</p>
            <p>{post.description}</p>
        </div>
}

function RenderFeatured ({posts}) {
  const featured = posts.posts.filter(post => post.featured === true).reverse(); // Prob not a good strategy, but this will do now

  if(featured === undefined || featured.length < 1){
    return <div></div>;
  } else{
    const f = featured.map((post) => RenderEachFeatured(post));
    return (
      <div>
          { f }
          <div style={{'text-align' : "right"}}>
            <Link to="/posts">See all</Link>
          </div>
      </div>
    );
  }
}

function Home (posts) {
  return (
    <div className="container">
      <div className="row">
      <div className="col-12 col-md-12 m-1">
        <RenderIntro/>
      </div>
      
      <div className="col-12 col-md-12 m-1">
      <Card>
        <CardBody>
          <div className="col-12">
            <CardTitle tag="h4">Featured Posts</CardTitle>
            <hr />
          </div>
          <div className="col-12 col-md-12 m-1">
            <RenderFeatured posts={posts}/>
          </div>
        </CardBody>
      </Card>
    
      </div>
    </div>
    </div>
  );
}

export default Home;