import React from "react";
import { withRouter } from "react-router";

class BlogBanner extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
      this.state = { 
        blogObject: {
          title: "",
          date: "",
          body: "",
          caption: "" 
        },
        blogID: props.blogID 
      };

      // class zigzag (add margin on the left and right)
      

    }
    routeChange = () => {
      this.props.history.push(`/blog-post/${this.state.blogID}`);
    }

    editBlogPost = () => {
      this.props.history.push(`/edit-post/${this.state.blogID}`);
    }
  
    getBlogObject() {
        fetch(`http://localhost:9000/retrieveBlogPost?blogID=${this.state.blogID}`)
          .then(res => res.json())  
          .then(res => {this.setState({ blogObject: JSON.parse(res)})})
            .catch(error => {
              alert(error)
          });
    }
  
    componentWillMount() {
        this.getBlogObject();
    }
  
    render() {
      let {reverseBanner} = this.props
      if(reverseBanner === undefined){
        reverseBanner = false
      } 
      
      let caption = <div className = {"col"} onClick={this.routeChange} style={{width:"60%",margin:"20px"}} >
                      <div className={"boxShadow"} style={{backgroundColor:this.props.webStyle.lightShade,height:"300px"}}>
                        <h3>{this.state.blogObject.title}</h3>
                        <div style={{textAlign:"left", padding:"0px 20px"}}>{this.state.blogObject.caption}</div>
                        <h4>{this.state.blogObject.date}</h4>
                      </div>
                    </div>

      let picture = <div className = {"col"} style = {{width:"40%", margin:"20px"}}  onClick={this.routeChange}>
                      <div className={"boxShadow"} style = {{height:"300px",  width:"100%", backgroundColor:this.props.webStyle.darkShade}}></div>
                    </div>
      
      let adminButtons =  <div className = {"col"} style={{justifyContent:"space-evenly",height:"300px", margin:"20px"}}>
                            <input className={"boxShadow"} type = {"button"} value = {"Edit"} onClick={this.editBlogPost} style ={{border:"none",backgroundColor:this.props.webStyle.mainBrandColor,color:this.props.webStyle.lightShade}} />
                            <input className={"boxShadow"} type = {"button"} value = {"Delete"} style ={{border:"none",backgroundColor:this.props.webStyle.mainBrandColor,color:this.props.webStyle.lightShade}} />
                          </div>
  
      if (reverseBanner){
        return (
          <div className={"row blog-banner"} style={{width:"100%",margin:'auto'}} >
            {caption}
            {picture}
           
            {this.props.userIsAdmin && ! this.props.viewAsNormalUser &&
              adminButtons}
          </div>
          
        );
      }
      else{
        return (
          <div className={"row  blog-banner"}  style={{width:"100%",margin:'auto'}}>
            
            {picture}
            {caption}

            {this.props.userIsAdmin && ! this.props.viewAsNormalUser &&
              adminButtons}
          </div>
        );
      }
      
    }
  }

  export default withRouter(BlogBanner)