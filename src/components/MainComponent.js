import React from 'react';
import Posts from './PostsComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Blog from './BlogComponent';
import { POSTS } from '../shared/posts';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
          posts : POSTS
        };
      }

    render() {
      const PostWithId = ({ match }) => { // Prob not a good idea to keep constructing function object
        return <Blog post={this.state.posts.filter(post => post.id === parseInt(match.params.postId, 10))[0]}/>;
      }

      return  <div>
                  <Header />
                  <Switch>
                  <Route path="/home" component={() => <Home posts={this.state.posts}/>} />
                  <Route exact path="/posts" component={() => <Posts posts={this.state.posts}/>} />
                  <Route path="/posts/:postId" component={PostWithId} />
                  <Redirect to="/home" />
              </Switch>
              </div> ;
    }
}

export default Main;