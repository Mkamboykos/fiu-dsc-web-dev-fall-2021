import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import homeBackground from '../Images/homeBackground.png'
import logo from '../Images/logo.svg'
import exitButton from '../Images/exitButton.svg'
import Axios from 'axios';

Axios.defaults.withCredentials = true;

function Home(){

  let navigate = useNavigate();

  const [code, setCode] = useState()
  const [showStart, setShowStart] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [showEnter, setShowEnter] = useState(false)
  const [showSignUp2, setShowSignUp2] = useState(false)
  const [showSignUp3, setShowSignUp3] = useState(false)
  const [showSignUp4, setShowSignUp4] = useState(false)
  const [showSignUp5, setShowSignUp5] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [errMsgEmail, setErrMsgEmail] = useState("")
  // eslint-disable-next-line no-unused-vars
  const {register, handleSubmit, watch, formState: { errors }} = useForm();
  //console.log(watch("Username")); // you can watch individual input by pass the name of the input


 

  // sign up pop-up view
  const StartHereView = () =>{
    return (
      <div className='startHerePanel'>
        <div className='startHereContainer'>
          <div className='loginExitButtonContainer'>
            <img src={exitButton} alt="exit button" loading="lazy" className="exitButton" onClick={() => setShowStart(false)}/>
          </div>

          {/* Use the logic from LoginView to create the Sign up form here */}

          <button className="yellowButton" onClick={() => setShowSignUp2(true) & setShowStart(false)}>Continues</button>
        </div>
      </div>
    )
  }

  // sign up 2 view
  const SignUp2View = () =>{
    return (
      <div className='startHerePanel'>
        <div className='startHereContainer'>
          <div className='loginExitButtonContainer'>
            <img src={exitButton} alt="exit button" loading="lazy" className="exitButton" onClick={() => setShowStart(false) & setShowSignUp2(false)}/>
          </div>

          {/* Use the logic from LoginView to create the Sign up form here */}

          <button className="yellowButton" onClick={() => setShowSignUp3(true) & setShowSignUp2(false) & setShowStart(false)}>Continuess</button>
        </div>
      </div>
    )
  }

  // sign up 3 view
  const SignUp3View = () =>{
    return (
      <div className='startHerePanel'>
        <div className='startHereContainer'>
          <div className='loginExitButtonContainer'>
            <img src={exitButton} alt="exit button" loading="lazy" className="exitButton" onClick={() => setShowSignUp3(false)}/>
          </div>

          {/* Use the logic from LoginView to create the Sign up form here */}

          <button className="yellowButton" onClick={() => setShowSignUp4(true) & setShowSignUp3(false)}>Continuesss</button>
        </div>
      </div>
    )
  }

  // sign up 4 view
  const SignUp4View = () =>{
    return (
      <div className='startHerePanel'>
        <div className='startHereContainer'>
          <div className='loginExitButtonContainer'>
            <img src={exitButton} alt="exit button" loading="lazy" className="exitButton" onClick={() => setShowSignUp4(false)}/>
          </div>

          {/* Use the logic from LoginView to create the Sign up form here */}

          <button className="yellowButton" onClick={() => setShowSignUp5(true) & setShowSignUp4(false)}>Continuessss</button>
        </div>
      </div>
    )
  }

  // sign up 5 view
  const SignUp5View = () =>{
    return (
      <div className='startHerePanel'>
        <div className='startHereContainer'>
          <div className='loginExitButtonContainer'>
            <img src={exitButton} alt="exit button" loading="lazy" className="exitButton" onClick={() => setShowSignUp5(false)}/>
          </div>

          {/* Use the logic from LoginView to create the Sign up form here */}

          <button className="yellowButton" onClick={() => setShowSignUp5(false)}>Submit</button>
        </div>
      </div>
    )
  }

  // used when forgot password email form gets submitted with Email data
  const forgotEmailSubmit = async (data) => {
    if (data){
      await Axios.post('http://localhost:8000/Forget/Email', {
            email: data.Email,
      }).then(res => {
        if (res.data.code){
          setCode(res.data.code)
        }
      }).catch(function (error) {
        if (error.response) {
          setErrMsgEmail(error.response.data.error)
          // console.log(error.response.data.error);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        }
      })
    }
  }

  const forgotContinueClick = () => {
    if(code !== undefined){
      setShowEnter(true)
      setShowForgot(false)
    }else{
      return
    }
    console.log(code)
  }

  // keeps on checking for code
  useEffect(() => {
    forgotContinueClick()
  });

  // forgot password pop-up view
  const ForgotPasswordView = () =>{

    // validation conditional message
    if(errors?.Email?.type === "required"){
      var validationMsg = <p style={{marginTop: "0.6rem", marginBottom: "-0.6rem"}}>Field Cannot be Empty!</p>
    }else if(errMsgEmail !== ""){
      // eslint-disable-next-line no-redeclare
      var validationMsg = <p style={{marginTop: "0.6rem", marginBottom: "-0.6rem"}}>{errMsgEmail}</p>
    }

    return (
      <div className='startHerePanel'>
        <div className='startHereContainer'>
          <div className='loginExitButtonContainer'>
            <img src={exitButton} alt="exit button" loading="lazy" className="exitButton" onClick={() => setShowForgot(false)}/> 
          </div>
          <br/>
          <div className='loginTitleContainer'>
            <h1><b>Forgot</b></h1>
            <h1><b>Password?</b></h1>
          </div>
          <br/>
          <div className='forgotParagraph'>
            <h5>
              Don’t worry! Just fill in your email and we’ll send you a link to reset your password.
            </h5>
          </div>
          <br/>
          <div className='loginLabelsContainer'>
              <form onSubmit={handleSubmit(forgotEmailSubmit)}>
                <div className='loginInputsContainer'>
                  <input type="email" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i, message: errMsg})}/>
                  {validationMsg}    
                  {/* See more examples at https://react-hook-form.com/ */}
                </div>
                <br/>
                <div className='loginButtonsContainers'>
                <button className="yellowButton" type='submit'>Continue</button>
                </div>
              </form>
            </div>
        </div>
      </div>
    )
  }

  // enter code pop-up view
  const EnterCodeView = () =>{
    return (
      <div className='startHerePanel'>
        <div className='startHereContainer'>
          <div className='loginExitButtonContainer'>
            <img src={exitButton} alt="exit button" loading="lazy" className="exitButton" onClick={() => setShowEnter(false)}/>
          </div>
          
          {/* Use the logic from LoginView to create the Sign up form here */}


          <button className="yellowButton" onClick={() => setShowNewPassword(true) & setShowEnter(false)}>Continue 2</button>

        </div>
      </div>
    )
  }

  // new password pop-up view
  const NewPasswordView = () =>{
    return (
      <div className='startHerePanel'>
        <div className='startHereContainer'>
          <div className='loginExitButtonContainer'>
            <img src={exitButton} alt="exit button" loading="lazy" className="exitButton" onClick={() => setShowNewPassword(false)}/>
          </div>
          
          {/* Use the logic from LoginView to create the Sign up form here */}


          <button className="yellowButton" type='submit' onClick={() => setShowNewPassword(false)}>Submit</button>

        </div>
      </div>
    )
  }



  // refresh page
  const refreshPage = () => {
    window.location.reload(false);
  }

  // used when login form gets submitted with Username and Password data
  const loginFormSubmit = async (data) => {
    if (data){
      await Axios.post('http://localhost:8000/Login/User', {
            username: data.Username,
            password: data.Password,
      }).then(res => {
        if (res.data.auth === true){
          authenticateUser()
        }
      }).catch(function (error) {
        if (error.response) {
          setErrMsg(error.response.data.error)
          // console.log(error.response.data.error);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        }
      })
    }
  }



  // authenticate the token provided when the login form gets submitted
  const authenticateUser = () =>{
    Axios.get('http://localhost:8000/Login/User')
    .then(res => {
      if (res.data.LoggedIn === true){
        let stringUser = res.data.username
        redirectUser(stringUser)
      }else if (res.data.message === "Tokens not present"){
        refreshPage()
      }
    }).catch(error => {
      console.log(error)
    })
  }


  // login form pop-up view
  const LoginView = (e) =>{

    // validation conditional message
    if(errors?.Password?.type === "required" || errors?.Username?.type === "required"){
      var validationMsg = <p style={{marginTop: "0.6rem", marginBottom: "-0.6rem"}}>Field(s) Cannot be Empty!</p>
    }else if(errMsg !== ""){
      // eslint-disable-next-line no-redeclare
      var validationMsg = <p style={{marginTop: "0.6rem", marginBottom: "-0.6rem"}}>{errMsg}</p>
    }

    return (
      <div className='loginPanel'>
        <div className='loginContainer'>
          <div className='loginFlexContainer'>
            <div className='loginExitButtonContainer'>
              <img src={exitButton} alt="exit button" loading="lazy" className="exitButton" onClick={() => setShowLogin(false)}/>
            </div>
            <div className='loginLogoContainer'>
              <img src={logo} alt="logo" className='logoLogin' loading="lazy"/>
            </div>
            <br/>
            <div className='loginTitleContainer'>
              <h1><b>Welcome</b></h1>
            </div>
            <br/>
            <div className='loginLabelsContainer'>
              <form onSubmit={handleSubmit(loginFormSubmit)}>
                <div className='loginInputsContainer'>
                  <input type="text" placeholder="Username" {...register("Username", {required: true, min: 1, pattern: /^[A-Za-z]+$/i})}/>
                  {errors?.Username?.type === "pattern" && (<p>Alphabetical characters only</p>)}
                  <br/>
                  <input type="password" placeholder="Password" {...register("Password", {required: true, min: 1, message: errMsg})}/>
                  {validationMsg}    
                  {/* See more examples at https://react-hook-form.com/ */}
                </div>
                <br/>
                <div className='loginButtonsContainers'>
                  <button className="yellowButton loginButtons" onClick={() => setShowStart(true) & setShowLogin(false)}>SIGN UP</button>
                  <button className="yellowButton loginButtons" type="submit">LOGIN</button> 
                </div>
              </form>
            </div>
            <br/>
            <div>
              <span onClick={() => setShowForgot(true) & setShowLogin(false)} style={{cursor: "pointer"}}>Forgot Password?</span>
            </div>
          </div>
          <hr/>
          <div>
            <button>
              Google
            </button>
          </div>
        </div>
      </div>
    )
  }


  // redirect user to their dashboard 
  const redirectUser = (user) =>{
    if (user !== "") {
        return navigate(`/Dashboard/${user}`);
    }
  }


  // everything starts here
  return (
    <div>
    
      {showStart ? <StartHereView/>: ""}
      {showLogin ? <LoginView/> : ""}
      {showForgot ? <ForgotPasswordView/> : ""}
      {showEnter ? <EnterCodeView/> : ""}
      {showNewPassword ? <NewPasswordView/> : ""}
      {showSignUp2 ? <SignUp2View/> : ""}
      {showSignUp3 ? <SignUp3View/> : ""}
      {showSignUp4 ? <SignUp4View/> : ""}
      {showSignUp5 ? <SignUp5View/> : ""}

      <nav>
        <Link to={`/`}>
          <img src={logo} alt="logo" className='logoHome' loading="lazy"/>
        </Link>
        <div className='navButtons'>
          <Link to={`/About`} style={{textDecoration: "none"}}><button className="yellowButton">About</button></Link>
          <div className="navButtonRight">
            <button onClick={() => setShowLogin(true)} className="yellowButton navButtonRight">Login</button>
          </div> 
        </div>
      </nav>

      <div className='startHereButtonPlacement'>
        <button className="yellowButton" onClick={() => setShowStart(true)}> Start Here </button>
      </div>

      <img src={homeBackground} className='homeBackground' alt="" loading="lazy"/>
    </div>
  )
}

export default Home;