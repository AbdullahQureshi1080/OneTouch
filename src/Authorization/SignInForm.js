import React, {  Component } from 'react'
import { Link } from 'react-router-dom';
import  {NavLink} from 'react-router-dom';

import Axios from "axios"

import "../Styles/Authorization/MainAuth.css"


class SignInForm extends Component{
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };
        this.email =""
        this.password=""

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        if(e.target.type==="email"){
            this.email = target.value
        }else{
            this.password = target.value
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.email,
            password: this.password
        }
        Axios.post("http://onetouch-portal.herokuapp.com/authenticateUser/", user).then((response)=>{
            if(response.status === 200){
              localStorage.setItem("sessionToken", response.data.session)
              alert(response.data.session.email)
            }
          }).catch((error)=>{
            alert(error)
          })
    }
    render(){
        return(
            <div className="App">
                    <div className = "App__Aside"></div>           
                    <div className = "App__Form">                   
                        <div className="PageSwitcher">                
                            <NavLink to = "/sign-in"   activeClassName = "PageSwitcher__Item--Active" className = "PageSwitcher__Item"> Sign In </NavLink>
                            <NavLink exact to = "/"   activeClassName = "PageSwitcher__Item--Active" className = "PageSwitcher__Item  "> Sign Up </NavLink>              
                        </div>                   
                        <div className = "FormTitle">                
                            <NavLink to= "/sign-in"  activeClassName = "FormTitle__Link--Active"    className ="FormTitle__Link"> Sign In</NavLink>                
                            or                 
                            <NavLink exact to ="/" className ="FormTitle__Link "  activeClassName = "FormTitle__Link--Active"> Sign Up</NavLink>
                        </div>
            <div className = "FormCenter">

            <form className = "FormFields" onSubmit = {this.handleSubmit}>
                   <div className = "FormField">
                       <label className = "FormField__Label" htmlFor="email">Email Address</label>
                       <input 
                           type = "email" id="email" className = "FormField__Input" placeholder = "Enter your Email ID"  onChange={this.handleChange} name="email">
                       </input>                  
                  </div> 
                  <div className = "FormField">
                       <label className = "FormField__Label" htmlFor="password">Password</label>
                       <input type = "password" id = "password" className = "FormField__Input" placeholder = "Enter your Password"
                        name="password" onChange={this.handleChange}>
                        </input>                   
                  </div> 
                  <div className= "FormField">
                        <button className ="FormField__Button mr-20" type="submit">Sign In</button>
                       <Link exact="true" to="/" className = "FormField__Link" > Create an Account </Link>
                  </div>
            </form> 

        </div>
        </div>
        </div>
        );
    
 }
}


export default SignInForm;