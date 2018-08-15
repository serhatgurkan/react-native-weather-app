import React from "react";
import { Platform, SafeAreaView, View, Text, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import { Constants, Location, Permissions } from 'expo';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import { endpoint,access_key, gpoint, gkey, weapoint, weahalf } from "../api/index";

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error:null,
      image: null,
      location:null,
      code:null,
      city:null,
      district:null,
      main:null,
      weather:null,
      wind:null
    };
  }

  componentDidMount() {
    if(Platform.OS === 'android' && !Constants.isDevice){
      this.setState({error:'Hata'})
    }else{
      this._getLocationAsync();
    }
  }
  
  componentDidUpdate(){
    const { location, city } = this.state;
    if(location !== null){
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;
      this._getGeocodeAsync(lat, lon);
      this._getUnsplashImageAsync(city);
      this._getWeathAsync(city);
    }
    
  }

  _getWeathAsync = async (city) => {
    const response = await fetch(`${weapoint}${city}${weahalf}`);
    const result = await response.json();
    this.setState({
      weather:result.weather,
      main:result.main,
      wind:result.wind
    });
  }
  
  _getGeocodeAsync = async (latitude, longitude) => {
    const response = await fetch(`${gpoint}${latitude},${longitude}${gkey}`);
    const result = await response.json();
    this.setState({
      geocode:result.results,
      district:result.results[1].address_components[1].long_name,
      city:result.results[1].address_components[2].long_name,
      code:result.results[1].address_components[3].short_name
    });
  }

  _getUnsplashImageAsync = async (city) => {
    const response = await fetch(`${endpoint}${city}${access_key}`);
    const result = await response.json();
    this.setState({ image: result.results[0].urls.regular });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status !== 'granted'){
      this.setState({error: 'Konum hizmetleri için izin verilmedi.'});
    }else{
      let location = await Location.getCurrentPositionAsync({});
      this.setState({location});
    }
    
  }

  render() {
    const { image, location, code, district, city, main, wind, error} = this.state;
    if(location !== null && image !== null && main !== null){
      return ( 
        <SafeAreaView style = {styles.container} >
          <ImageBackground source = {{uri: image}} style = {styles.background}>
            <Swiper
              horizontal={true}
              showsPagination={false}
            >
              <View style={styles.filter}>
                  <View style={styles.location}>
                    <Icon style={{marginRight:5}} name="ios-navigate" size={24} color="#ffffff"/>
                    <Text style={styles.text}>{city}</Text>
                    <Text style={styles.text}>-</Text>
                    <Text style={styles.text}>{district}</Text>
                  </View>
                  <View style={styles.maxmin}>
                    <Text style={styles.mText}>{Math.floor(main.temp_max - 273.15)}</Text>
                    <Icon style={{marginLeft:2.5, marginRight:3}}name="md-arrow-dropup" size={24} color="#ffffff" />
                    <Text style={styles.mText}>{Math.floor(main.temp_min - 273.15)}</Text>
                    <Icon style={{marginLeft:2.5}}name="md-arrow-dropdown" size={24} color="#ffffff" />
                  </View>
                  <View style={styles.weather}>
                    <Text style={styles.wText}>{Math.floor(main.temp - 273.15)}</Text>
                    <Icon name="md-radio-button-off" size={32} color="#ffffff" />
                  </View>
              </View>
              <View style={styles.filter1}>
                <Icon name="md-cloud" size={64} color="#ffffff" />
                <Text style={{color:'#ffffff', fontSize:18}}>Rüzgar {wind.speed} m/s</Text>
                <Text style={{color:'#ffffff', fontSize:18}}>Basınç {main.pressure} bar</Text>
                <Text style={{color:'#ffffff', fontSize:18}}>Nem %{main.humidity}</Text>
              </View>
            </Swiper>
          </ImageBackground> 
        </SafeAreaView>
      )
    }else{
      return(
        <View style={styles.container}>
          <ActivityIndicator size="large" color = "#000000" />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  background: {
    height: "100%",
    width: "100%"
  },
  filter:{
    height:"100%",
    width:"100%",
    justifyContent:'center',
    backgroundColor:'rgba(0, 0, 0, 0.2)',
  },
  filter1:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0, 0, 0, 0.2)',
  },
  location:{
    height:100,
    paddingHorizontal:15,
    flexDirection:'row',
    alignItems:'center'
  },
  maxmin:{
    paddingHorizontal:15,
    flexDirection:'row',
    alignItems:'center'
  },
  mText:{
    color:'#ffffff',
    marginRight:2.5
  },
  weather:{
    //backgroundColor:'yellow',
    height:200,
    paddingHorizontal:15,
    flexDirection:'row',
  },
  text:{
    fontSize:14,
    color:'#ffffff',
    marginRight:2.5,
    marginLeft:2.5
  },
  wText:{
    color:'#ffffff',
    fontSize:86
  }
});