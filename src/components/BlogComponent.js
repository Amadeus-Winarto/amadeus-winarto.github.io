import React from 'react'
import ReactMarkdownWithHtml from 'react-markdown/with-html'
import {InlineMath, BlockMath} from 'react-katex'
import math from 'remark-math'
import 'katex/dist/katex.min.css' // `react-katex` does not import the CSS for you
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {coy} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';  
import { Link } from 'react-router-dom';

class Blog extends React.Component{
    constructor(props){
        super(props);
        this.state = {  path : "/assets/posts/".concat(this.props.post.id.toString(), ".md"), 
                        content : null,
                        renderers : {
                            inlineMath: ({value}) => <InlineMath math={value} />,
                            math: ({value}) => <BlockMath math={value} />,
                            code: ({language, value}) => {
                                return <SyntaxHighlighter style={coy} language={language} children={value} />
                              }
                          }
                        };
    }

    componentDidMount(){
        fetch(this.state.path).then(res => res.text()).then(text => this.setState({ content: text }));
    }

    render(){
        return  <div className="container">
                    <div className="row">
                        <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/posts'>Posts</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.post.id}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                        <ReactMarkdownWithHtml 
                            plugins={[math]}
                            renderers={this.state.renderers}
                            children={this.state.content} 
                            allowDangerousHtml />
                        <hr />
                        </div>
                    </div>
                </div>

    }
}

export default Blog;