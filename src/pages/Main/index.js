import React, { Component } from 'react';
import { Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Press, Header, Body, Footer } from './styles';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.004
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

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
        <Header>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ height: '100%' }}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }} >
              <Marker coordinate={this.state}/>
            </MapView>
        </Header>
        <Body>

          <Text>{this.state.latitude}</Text>
          <Text>{this.state.longitude}</Text>
        </Body>
        <Footer>
          <Press>
            <Icon name="fingerprint" size={100} color="#fff" />
          </Press>
        </Footer>
      </Container>
    );
  }
}
