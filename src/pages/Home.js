import React from 'react';
import {Text, View, TextInput, ScrollView} from 'react-native';


export default class Home extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            company: 'Stock',
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
            <ScrollView>
                <View style={textInput}>
                    <TextInput style={textInputStyle} placeholder='Enter a stock abbreviation' onChangeText={(text) => this.setState({modifiedCompany: text})} onEndEditing={this.textEdit.bind(this)} underlineColorAndroid='transparent'/>
                </View>
                <Text style={labelStyle}>{this.state.company} Price</Text>
                <Text style={[priceStyle, {color: this.state.color}]}>${this.state.stockInfo.latestPrice.toFixed(2)}</Text>
                <Text style={[changeStyle, {color: this.state.color}]}>Change: {this.state.stockInfo.change.toFixed(2)}</Text>
                {
                    (!this.state.realStock) ? <Text style={errorStyle}>"{this.state.company}" is not a real Stock. Please check your spelling.</Text> : null
                }
            </ScrollView>
          );
      }
}

const labelStyle = {
    textAlign: 'center',
    fontSize: 40,
    color: 'rgb(255, 128, 0)'
}

const priceStyle = {
    textAlign: 'center',
    fontSize: 30
}

const changeStyle = {
    textAlign: 'center',
    fontSize: 20
}

const errorStyle = {
    textAlign: 'center',
    color: 'red'
}

const textInputStyle = {
    height: 40,
    width: '90%',
    borderColor: 'rgb(255, 128, 0)',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 50,
    color: 'rgb(255, 128, 0)'
}

const textInput = {
    alignItems: 'center',
    margin: 20
}