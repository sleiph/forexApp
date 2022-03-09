import React from "react";
import { getCurrentUser } from "../services/auth.service";

const Profile: React.FC = () => {
  const currentUser = getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <p>
        <strong>Credits:</strong> {currentUser.credits}
      </p>
      <strong>Stocks Owned:</strong>
      <ul>
        {
          "test"
        //currentUser.stocks &&
          //currentUser.stocks.map((stock: string, index: number) => <li key={index}>{stock}</li>)
        }
      </ul>
    </div>
  );
};

export default Profile;
