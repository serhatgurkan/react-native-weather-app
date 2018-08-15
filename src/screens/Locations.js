import React from "react";
import { Platform, View, Text, StyleSheet, StatusBar } from "react-native";
import Swiper from 'react-native-swiper';

export default class Locations extends React.Component {
  render() {
    return (
      <Swiper
        loop={false}
        showsPagination={false}
        horizontal={false}
        index={1}

      >
        <View style={styles.slide1}>
          <Text>Locations</Text>
        </View>
        <View style={styles.slide2}>
          <Text>Locations</Text>
        </View>
        <View style={styles.slide3}>
          <Text>Locations</Text>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  slide1:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'yellow'
  },
  slide2:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'pink'
  },
  slide3:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'purple'
  }
})