import { useEffect, useState } from "react";
import AppStyles from "./AppStyles.css";

const App = () => {
  class User {
    constructor(_user, _password) {
      this.password = _password;
      this.user = _user;
    }
    echoUser() {
      console.log("Logged in as User");
    }
  }
  class Admin extends User {
    constructor(_user, _password, _code) {
      super(_user, _password);
      this.code = _code;
    }

    echoAdmin() {
      console.log("Logged in as Admin");
    }
  }

  class AllUsers {
    constructor(...allUsers) {
      this.allUsers = allUsers;
    }
    addUser(_user, _password) {
      const newUser = new User(_user, _password);
      this.allUsers.push(newUser);
      this.echoAllUsers();
    }

    addAdmin(_user, _password, _code) {
      const newAdmin = new Admin(_user, _password, _code);
      this.allUsers.push(newAdmin);
      this.echoAllUsers();
    }
    echoAllUsers() {
      this.allUsers.forEach((user) => console.log(user));
      console.log("All users .length ===", this.allUsers.length);
    }

    verifyAdmin(targetLogin, targetPassword) {
      this.allUsers.forEach((element) => {
        if (element.user === targetLogin) {
          if (element.password === targetPassword) {
            showContent(true);
          }
        }
      });
    }

    verifyUser(targetLogin, targetPassword) {
      this.allUsers.forEach((element) => {
        if (element.user === targetLogin) {
          if (element.password === targetPassword) {
            showContent(false);
          }
        }
      });
    }
  }

  // VARS
  const inputFields = document.getElementsByClassName("input-fld");
  const [user, getUser] = useState("");
  const [password, getPassword] = useState("");
  const [code, getCode] = useState("");
  const globalAdminCode = "1234";
  const [users, setUsers] = useState(new AllUsers());

  const handleUser = (_data) => {
    getUser(_data.target.value);
  };

  const handlePassword = (_data) => {
    getPassword(_data.target.value);
  };

  const handleCode = (_data) => {
    getCode(_data.target.value);
  };

  const checkForAdmin = (_code) => {
    if (_code === globalAdminCode) {
      return true;
    } else {
      return false;
    }
  };

  const handleLogin = () => {
    if (code === globalAdminCode) {
      users.verifyAdmin(user, password);
    } else {
      users.verifyUser(user, password);
    }
  };

  const handleReturn = () => {
    document.getElementById("_login").style.visibility = "visible";
    document.getElementById("_register").style.visibility = "hidden";
    getUser("");
    getPassword("");
    getCode("");
  };

  const handleRegister = () => {
    document.getElementById("_login").style.visibility = "hidden";
    document.getElementById("hidden-content").style.visibility = "hidden";
    document.getElementById("_register").style.visibility = "visible";
  };

  const showContent = (isAdmin) => {
    document.getElementById("_login").style.visibility = "hidden";
    document.getElementById("hidden-content").style.visibility = "visible";
    document.getElementById("_register").style.visibility = "hidden";
    if (isAdmin) {
      document.getElementById("hidden-content").style.color = "red";
    } else {
      document.getElementById("hidden-content").style.color = "black";
    }
  };

  const createNewAccount = () => {
    if (checkForAdmin(code)) {
      users.addAdmin(user, password, code);
    } else {
      users.addUser(user, password);
    }
  };

  return (
    <div className="App">
      <div id="hidden-content" className="hidden-content">
        <h1>Here.</h1>
        <button onClick={handleReturn}>Return</button>
      </div>
      <div className="login-parent" id="_login">
        <div id="login-child">
          <h2>Login</h2>
          <h3>User</h3>
          <input
            className="input-fld"
            type="text"
            onChange={(ev) => handleUser(ev)}
          />
          <h3>Password</h3>
          <input
            className="input-fld"
            type="text"
            onChange={(ev) => handlePassword(ev)}
          />
          <h3>Code</h3>
          <input
            className="input-fld"
            type="text"
            onChange={(ev) => handleCode(ev)}
          />
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
      <div className="register-parent" id="_register">
        <div id="register-child">
          <h2>Register</h2>
          <h3>User</h3>
          <input
            className="input-fld"
            type="text"
            onChange={(ev) => handleUser(ev)}
          />
          <h3>Password</h3>
          <input
            className="input-fld"
            type="text"
            onChange={(ev) => handlePassword(ev)}
          />
          <h3>Admin Code</h3>
          <input
            className="input-fld"
            type="text"
            onChange={(ev) => handleCode(ev)}
          />
          <button onClick={createNewAccount}>Register</button>
          <button onClick={handleReturn}>Return</button>
        </div>
      </div>
    </div>
  );
};

export default App;
