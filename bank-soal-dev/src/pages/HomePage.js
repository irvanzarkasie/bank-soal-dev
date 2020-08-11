import React from 'react';

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        counter: 0
    }
  }
  
  render(){
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
  }
}

export default HomePage;
