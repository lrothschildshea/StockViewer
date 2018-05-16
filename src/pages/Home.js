import React from 'react';
import {Text} from 'react-native';


export default class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            price: 0
        }
    }
    
    componentDidMount(){
        fetch('https://api.iextrading.com/1.0/stock/amd/quote').then(res => {
            return res.json()
        }).then(json =>{
            this.setState({price: json.latestPrice})
        })
    }



    render(){
          return(
            <Text>${this.state.price}</Text>
          );
      }
}












