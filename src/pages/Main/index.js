import React, { Component } from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, Press} from './styles';
import Geolocation from 'react-native-geolocation-service';


export default class Main extends Component {
  static navigationOptions = {
    title: "PontoGo",
    headerStyle: {
      backgroundColor: "#1e71eb"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      textAlign: "center",
      flex: 1
    },
    headerTitleAlign: 'center'
  };
  state = {
    latitude: 0,
    longitude: 0,
    error: null
  }
  componentDidMount() {
    Geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  render() {
    return (
      <Container>
        <Text>{this.state.latitude}</Text>
        <Text>{this.state.longitude}</Text>
        <Press>
          <Icon name="fingerprint" size={100} color="#1e71eb"/>
        </Press>
      </Container>
    );
  }
}
