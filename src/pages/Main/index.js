import React, { Component } from 'react';
import { Text, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Press,
  Header,
  Body,
  Footer,
  HistoricHeader,
  TitleHistoric,
  MoreText,
  MoreButton,
  Card,
  Date,
  Day,
  Time,
  BorderMargin,
  Localization,
  HeaderDate,
  ContentTime,
  BorderView
} from './styles';
import api from '~/services/api';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window')

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
      textAlign: "center"
    },
    headerTitleAlign: 'center'
  };
  state = {
    latitude: 0,
    longitude: 0,
    pontos: [],
    isLoading: false,
    error: null
  }
  componentDidMount() {
    Geolocation.watchPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
    this.loadPontos();
  }
  loadPontos = async () => {
    this.setState({ isLoading: true })
    const response = await api.get("/ponto");
    const repositories = await response.data;
    this.setState({
      pontos: repositories, isLoading: false
    })
  };
  hitPoint = async () => {
    this.setState({ isLoading: true })
    await api.post("/ponto", {
      'latitude': this.state.latitude,
      'longitude': this.state.longitude
    });
    this.loadPontos();
    this.setState({ isLoading: false })
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
            }} showsUserLocation />
        </Header>
        <Body>
          <HistoricHeader>
            <TitleHistoric>Sexta 24, Janeiro</TitleHistoric>
            <MoreButton>
              <MoreText>Ver Mais</MoreText>
            </MoreButton>
          </HistoricHeader>
          <ActivityIndicator size="large" animating={this.state.isLoading} />
          <FlatList
            data={this.state.pontos}
            renderItem={({ item }) =>
              <Card>
                <BorderView>
                  <BorderMargin />
                </BorderView>
                <HeaderDate>
                  <Date>{item.dtPonto}</Date>
                  <Day>Sex</Day>
                </HeaderDate>
                <ContentTime>
                  <Time>08:00</Time>
                  <Localization>{item.latitude}</Localization>
                </ContentTime>
              </Card>
            }
          />
        </Body>
        <Footer>
          <Press onPress={() => this.hitPoint()}>
            <Icon name="fingerprint" size={85} color="#fff" />
          </Press>
        </Footer>
      </Container>
    );
  }
}
