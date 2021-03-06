/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
   StyleSheet,
   Text, View,
   StatusBar,
   TouchableOpacity,
   Button,
   Dimensions,
   Animated
   } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Cardss from './Cardss';
import CardssTrend from './CardssTrend';
import CardssHits from './CardssHits';
import Profile from './Profile';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
  <Cardss />
);
const SecondRoute = () => (
  <CardssTrend />
);
const ThirdRoute = () => (
  <CardssHits />
);
const FourthRoute = () => (
  <Profile />
);
type State = NavigationState<
  Route<{
    key: string,
    icon: string,
    color: string,
  }>
>;

const instructions = Platform.select({
  ios: 'Home screen',
  android:
    'Home screen',
});

type Props = {};
export default class App extends Component<Props> {






  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
          {key: 'first',
           icon: 'home',
           color: '#fcc8ae',
         },
         {
           key: 'second',
           icon: 'Trophy',
           color: '#fcc8ae',
         },
         {
           key: 'third',
           icon: 'rocket1',
           color: '#fcc8ae',
         },
         {
           key: 'fourth',
           icon: 'profile',
           color: '#fcc8ae',
         },
      ],

      home:true,
      trend:false,
      hit:false,
      profile:false,
    };
  }


  static navigationOptions = {
   title: 'WhatsPoetry',
   headerRight: <Feather name="edit" size={24} style={{color:'black',marginRight:5}} />,
 };

tabpressed(id){
  switch (id) {
    case 1:
      this.setState({
        home:true,
        trend:false,
        hit:false,
        profile:false,
      });
      break;
      case 2:
        this.setState({
          home:false,
          hit:true,
          trend:false,
          profile:false,
        });
        break;
        case 3:
          this.setState({
            home:false,
            hit:false,
            trend:true,
            profile:false,
          });
          break;
          case 4:
            this.setState({
              home:false,
              hit:false,
              trend:false,
              profile:true,
            });
            break;
    default:

  }
}
_renderIcon = ({ route }) => (

       <AntDesign name={route.icon} size={24} style={styles.icon} />

);

_renderBadge = ({ route }) => {
  if (route.key === 'second') {
    return (
      <View style={styles.badge}>
        <Text style={styles.count}>8</Text>
      </View>
    );
  }
  return null;
};
_renderIndicator = props => {
   const { width, position } = props;
   const inputRange = [
     0,
     0.48,
     0.49,
     0.51,
     0.52,
     1,
     1.48,
     1.49,
     1.51,
     1.52,
     2,
     2.48,
     2.49,
     2.51,
     2.52,
     3,
   ];

   const scale = position.interpolate({
     inputRange,
     outputRange: inputRange.map(x => (Math.trunc(x) === x ? 2 : 0.1)),
   });
   const opacity = position.interpolate({
     inputRange,
     outputRange: inputRange.map(x => {
       const d = x - Math.trunc(x);
       return d === 0.49 || d === 0.51 ? 0 : 1;
     }),
   });
   const translateX = position.interpolate({
     inputRange: inputRange,
     outputRange: inputRange.map(x => Math.round(x) * width),
   });
   const backgroundColor = position.interpolate({
     inputRange,
     outputRange: inputRange.map(
       x => props.navigationState.routes[Math.round(x)].color
     ),
   });

   return (
     <Animated.View
       style={[styles.container, { width, transform: [{ translateX }] }]}
     >
       <Animated.View
         style={[
           styles.indicator,
           { backgroundColor, opacity, transform: [{ scale }] },
         ]}
       />
     </Animated.View>
   );
 };

_renderTabBar = props => (
  <TabBar
    {...props}
    renderIcon={this._renderIcon}
    renderBadge={this._renderBadge}
    renderIndicator={this._renderIndicator}
    style={styles.tabbar}
  />
);
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex:1 }}>
      <StatusBar hidden />
          <TabView
            navigationState={this.state}
            tabBarPosition="bottom"
            renderTabBar={this._renderTabBar}
            renderScene={SceneMap({
              first: FirstRoute,
              second: SecondRoute,
              third: ThirdRoute,
              fourth: FourthRoute,
            })}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ width: Dimensions.get('window').width }}
          />



      </View>
    );
  }
}
const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#ffff',
    overflow: 'hidden',
  },
  icon: {
    backgroundColor: 'transparent',
    color: '#1c1b1b',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  indicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0084ff',
    margin: 6,
  },
  badge: {
    marginTop: 4,
    marginRight: 15,
    backgroundColor: '#f44336',
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  count: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -2,
  },
});
