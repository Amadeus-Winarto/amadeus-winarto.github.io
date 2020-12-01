import React from 'react';
import Home from './HomeComponent';
import Notes from './NotesComponent';
import Header from './HeaderComponent';
import About from './AboutComponent';
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
                  <Route path="/home" component={() => <Home />} />
                  <Route path="/about" component={() => <About />} />
                  <Route exact path="/posts" component={() => <Notes posts={this.state.posts}/>} />
                  <Route path="/posts/:postId" component={PostWithId} />
                  <Redirect to="/home" />
              </Switch>
              </div> ;
    }
}

export default Main;