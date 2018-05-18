import React from 'react';
import {Text} from 'react-native';

export default class TitleBar extends React.Component {

    render(){
        return (
            <Text style={titleStyle}>Stock Viewer</Text>
        );
    }
}

const titleStyle = {
    fontSize: 40,
    color: 'rgb(30, 30, 30)',
    backgroundColor: 'rgb(255, 128, 0)',
    width: '100%',
    height: '10%',
    textAlign: 'center',
    borderBottomWidth: 2,
    borderColor: 'rgb(30, 30, 30)'
}
