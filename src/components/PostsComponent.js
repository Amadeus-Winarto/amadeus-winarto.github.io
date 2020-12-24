import React from 'react';
import { Card, CardTitle, Breadcrumb, BreadcrumbItem, CardBody, CardSubtitle, CardText } from 'reactstrap';  
import { Link } from 'react-router-dom';

function RenderEachPost({ post }){ //<CardImg width="100%" src={dish.image} alt={dish.name} />
  return  <Card>
            <CardBody>
            <Link to={`/posts/${post.id}`}>
              <CardTitle tag="h4" className="mb-2">{post.name}</CardTitle>
              <div style={{'text-align' : "center"}}>
              <img width="50%" src={post.image} alt=""></img>
              </div>
              
            </Link>
              <CardSubtitle> <i className="fa fa-calendar" /> Published : {new Date(post.date).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"})}</CardSubtitle> 
              <CardText>{post.description}</CardText>
              </CardBody>
          </Card> ;
}

function Posts (props) {
  const menu = props.posts.map((post) => {
    return (
      <div key = {post.id} className="col-12 col-md-12 m-1">
        <RenderEachPost post={ post }/>
      </div>
      );
  }).reverse(); // Prob not a good strategy, but this will do now

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
          <BreadcrumbItem active>Posts</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Posts</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        { menu }
      </div>
    </div>
  );
}

export default Posts;