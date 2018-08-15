import { createStackNavigator } from "react-navigation";
import Weather from "./src/screens/Weather";
import Locations from "./src/screens/Locations";

export default createStackNavigator(
  {
    Weather: {
      screen: Weather
    },
    Locations: {
      screen: Locations
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Weather"
  }
);
