import React from 'react';
import {Text, View, TextInput} from 'react-native';


export default class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            company: '',
            price: 0,
            modifiedCompany: '',
            realStock: true,
            stockInfo: {
                latestPrice: 0,
                change: 0
            },
            color: 'green'
        }
    }

    textEdit(){
        this.setState({company: this.state.modifiedCompany.toUpperCase()});
        fetch('https://api.iextrading.com/1.0/stock/' + this.state.modifiedCompany + '/quote').then(res => {
            if(res.status < 400){
                this.setState({realStock: true})
                return res.json()
            } else {
                this.setState({realStock: false})
                return this.state.stockInfo
            }
        }).then(json =>{
            if(json.change < 0){
                this.setState({stockInfo: json,
                                color: 'red'});
            } else {
                this.setState({stockInfo: json,
                    color: 'green'});
            }
        });
    }

    render(){
          return(
            <View>
                <View style={textInput}>
                    <TextInput style={textInputStyle} onChangeText={(text) => this.setState({modifiedCompany: text})} onEndEditing={this.textEdit.bind(this)} underlineColorAndroid='transparent'/>
                </View>
                <Text style={labelStyle}>{this.state.company} Price</Text>
                <Text style={[priceStyle, {color: this.state.color}]}>${this.state.stockInfo.latestPrice}</Text>
                <Text style={[changeStyle, {color: this.state.color}]}>Change: {this.state.stockInfo.change}</Text>
                {
                    (!this.state.realStock) ? <Text style={errorStyle}>"{this.state.company}" is not a real Stock. Please check your spelling.</Text> : null
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

const changeStyle = {
    textAlign: 'center'
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
    alignItems: 'center',
    margin: 20
}