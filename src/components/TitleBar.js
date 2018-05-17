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
    color: 'white',
    backgroundColor: 'steelblue',
    width: '100%',
    height: '10%',
    textAlign: 'center'
}