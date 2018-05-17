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
        this.setState({company: this.state.modifiedCompany});
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
                <TextInput style={{height: 40, borderColor: 'black', borderWidth: 2}} onChangeText={(text) => this.setState({modifiedCompany: text})} onEndEditing={this.textEdit.bind(this)}/>
                <Text>{this.state.company} Price</Text>
                <Text>${this.state.price}</Text>
                {
                    (!this.state.realStock) ? <Text>This is not a real Stock. Please check your spelling.</Text> : null
                }
            </View>
          );
      }
}
