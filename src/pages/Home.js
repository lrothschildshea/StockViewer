import React from 'react';
import {Text, View, TextInput} from 'react-native';


export default class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            company: 'AMD',
            price: 0,
            modifiedCompany: '',
            realStock: true
        }
    }
    
    componentDidMount(){
        fetch('https://api.iextrading.com/1.0/stock/' + this.state.company + '/quote').then(res => {
            return res.json()
        }).then(json =>{
            this.setState({price: json.latestPrice})
        })
    }

    textEdit(){
        this.setState({company: this.state.modifiedCompany.toUpperCase()});
        fetch('https://api.iextrading.com/1.0/stock/' + this.state.modifiedCompany + '/quote').then(res => {
            if(res.status < 400){
                this.setState({realStock: true})
                return res.json()
            } else {
                this.setState({realStock: false})
                return {latestPrice: this.state.price}
            }
        }).then(json =>{
            this.setState({price: json.latestPrice})
        });
    }



    render(){
          return(
            <View>
                <View style={textInput}>
                    <TextInput style={textInputStyle} onChangeText={(text) => this.setState({modifiedCompany: text})} onEndEditing={this.textEdit.bind(this)} underlineColorAndroid='transparent'/>
                </View>
                <Text style={labelStyle}>{this.state.company} Price</Text>
                <Text style={priceStyle}>${this.state.price}</Text>
                {
                    (!this.state.realStock) ? <Text style={errorStyle}>'{this.state.company}' is not a real Stock. Please check your spelling.</Text> : null
                }
            </View>
          );
      }
}

const labelStyle = {
    textAlign: 'center',
    fontSize: 40
}

const priceStyle = {
    textAlign: 'center',
    fontSize: 30
}

const errorStyle = {
    textAlign: 'center'
}

const textInputStyle = {
    height: 40,
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 50
}

const textInput = {
    alignItems: 'center'
}