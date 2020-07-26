import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import GuestList from "./GuestList";
import Counter from "./Counter";
import Header from "./Header";
import {Provider} from "./Context";
import {Login} from "./Login";
import RegisterAccount from "./RegisterAccount";
import { withRouter } from 'react-router';

class App extends Component{


  state = {
    pendingGuest: "",
    isFiltered : false,
    justRegistered : false,
    invites : [
      // {
      //   name : "Dorel",
      //   conf : false,
      //   isTextBox: false
      // },
      // {
      //   name : "Bobonete",
      //   conf : false,
      //   isTextBox: false
      // }
    ]
  };

  nextID = -1;
  registrationSuccess = "";

  componentDidMount() {
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa('Sireanu' + ':' + '1234'));

    fetch("http://127.0.0.1:5000/insguests?username=Bulan&conf=True",{method:"POST", headers:headers});

    fetch("http://127.0.0.1:5000/guests",{headers:headers})    
    .then(res => res.json())
        .then((data) => {
          this.setState({ invites: data })
        })
        .catch(console.log)
  }  

  getNextID = () => {
    this.nextID = this.nextID + 1;
    return this.nextID;
  }

  getTotalInvites = () => {

    return this.state.invites.length;

  }


  handleRemoveElement = (name) => {
    this.setState({
      invites : this.state.invites.filter((p) => p.name === name ? false : true )
    })
  }

  toogleConfirmation = (id) => {

    this.setState({
      invites : this.state.invites.map((p) => {
        if(id === p.id){
          return {
            ...p,
            conf: !p.conf
          }
        }
        return p;
      })
    })

  }

  changeToTextBox = (id) => {

    this.setState({
      invites : this.state.invites.map((p) => {
        if(id === p.id){
          return {
            ...p,
            isTextBox : !p.isTextBox
          }
        }
        return p;
      })
    });
  }

  setNameAt = (name , id) => {

    this.setState({
      invites : this.state.invites.map((p) => {
        if(id === p.id){
          return {
            ...p,
            name:name
          }
        }
        return p;
      })
    })
  
  }


  setPendingGuest = (e) => {
    this.setState({
      pendingGuest: e.target.value
    })
  }

  toogleFilter = () => {
    this.setState({
      isFiltered : !this.state.isFiltered
    })
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.setState({
      invites : [
        {
          name: this.state.pendingGuest,
          conf : false,
          isTextBox: false,
          id: this.getNextID()
        },
        ...this.state.invites
      ],
      pendingGuest: ""
    })

  }

  handleLogin = (user,password) => {
    console.log(user);
    console.log(password);
  }

  getNumberOfConf = () => {
    return this.state.invites.filter((p) => p.conf ? true : false).length;
  }

  getNumberOfUnconf = () => {
    // return this.state.invites.filter((p) => p.conf ? false : true).length;
    return this.state.invites.reduce((accumulator, value) => !value.conf ? accumulator+1 : accumulator , 0);
  }

  getNumberOfInvites = () => {
    return this.state.invites.length;
  }

  temporary=0;

  handleRegistration = async (user , pass1, pass2) => {
    console.log(user);
    console.log(pass1);
    console.log(pass2);

    let headers = new Headers();    
    let resp ;
    let retCode;

    headers.append('Authorization', 'Basic ' + btoa('Sireanu' + ':' + '1234'));
    
    let data = await fetch(`http://127.0.0.1:5000/register?username=${user}&password=${pass1}`,{method:"POST", headers:headers})
                      .then((response) => response.json())
                      .then(data => {
                        return data;
                      });          
    
    console.log("JSON = "+data.status);

    if(data.status[0] == 1)
    {
      console.log(data.status[0]);
      this.registrationSuccess = true;
      
      console.log("registrationSuccess is set to True");        
      return true;
    }
    else
    {
      this.registrationSuccess = false;
      console.log("registrationSuccess is set to False");        
      return false;
    }
        
    
     
  }

  render() {
  return (
    <BrowserRouter>
    <div>
      <Route exact path="/" render={() => <Login registration={this.registrationSuccess} />} />
      <Route path="/register" render={() => <RegisterAccount handleRegistration={this.handleRegistration } /> } />
    </div>
    </BrowserRouter>
  );
  
  //   <div className="App">
  //   <Provider value={{pendingGuest: this.state.pendingGuest, 
  //                    setPendingGuest: this.setPendingGuest,
  //                    handleOnSubmit: this.handleOnSubmit,
  //                    numberOfUnconf: this.getNumberOfUnconf(),
  //                    numberOfConf: this.getNumberOfConf(),
  //                    numberOfInvites: this.getNumberOfInvites(),
  //                    guests: this.state.invites,
  //                    toogleConfirmationAt: this.toogleConfirmation,
  //                    handleEdit: this.changeToTextBox,
  //                    handleChangeName: this.setNameAt,
  //                    isFiltered: this.state.isFiltered,
  //                    handleRemove: this.handleRemoveElement
  //                   }} >  
  //     <Header />
  //     <div className="main">
  //       <div>
  //         <h2>Invitees</h2>
  //         <label>
  //           <input type="checkbox" onChange = {this.toogleFilter} checked={this.state.isFiltered} /> Hide those who haven't responded
  //         </label>
  //       </div>
  //       <Counter numberOfUnconf={this.getNumberOfUnconf()} numberOfConf={this.getNumberOfConf()} numberOfInvites={this.getNumberOfInvites()} />
  //       <GuestList pendingGuest = {this.state.pendingGuest} guests={this.state.invites} toogleConfirmationAt={this.toogleConfirmation} handleEdit={this.changeToTextBox} handleChangeName={this.setNameAt} 
  //           isFiltered={this.state.isFiltered} handleRemove={this.handleRemoveElement}/>
  //     </div>
  //   </Provider>
  // </div>
  // );
}
}

export default App;
