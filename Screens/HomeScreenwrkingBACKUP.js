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
   Dimensions
   } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={[styles.container, { backgroundColor: '#ff4081' }]} />
);
const SecondRoute = () => (
  <View style={[styles.container, { backgroundColor: '#673ab7' }]} />
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
        { key: 'first' },
        { key: 'second', },
      ],

      home:true,
      trend:false,
      hit:false,
      profile:false,
    };
  }


  static navigationOptions = {
   title: 'Home',

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

       <AntDesign name="home" size={24} style={styles.icon} />

);

_renderBadge = ({ route }) => {
  if (route.key === '2') {
    return (
      <View style={styles.badge}>
        <Text style={styles.count}>42</Text>
      </View>
    );
  }
  return null;
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
{this.state.home?
          <TabView
            navigationState={this.state}
            tabBarPosition="bottom"
            renderTabBar={this._renderTabBar}
            renderScene={SceneMap({
              first: FirstRoute,
              second: SecondRoute,
            })}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ width: Dimensions.get('window').width }}
          />
      :null }

      {this.state.trend?
            <View >
                <Text>trend</Text>
            </View>
            :null }

            {this.state.hit?
                  <View >
                      <Text>hit</Text>
                  </View>
                  :null }

                  {this.state.profile?
                        <View >
                            <Text>profile</Text>
                        </View>
                        :null }
     
      <View style={{height:50, flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
          <TouchableOpacity style={{flex:1}} onPress={() => this.tabpressed(1)  }>
            <View style={{flex:1,alignItems:'center'}}>
              {this.state.home?
              <AntDesign name="home" style={{fontSize:33, color:'#ff5e62'}} />
              :
              <AntDesign name="home" style={{fontSize:30}} />
              }
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{flex:1}}  onPress={() => this.tabpressed(2)  }>
            <View style={{flex:1,alignItems:'center'}}>
            {this.state.hit?
              <SimpleLineIcons name="trophy" style={{fontSize:30, color:'#ff5e62'}} />
              :
              <SimpleLineIcons name="trophy" style={{fontSize:28}} />
            }
            </View>
          </TouchableOpacity>

          <TouchableOpacity  style={{flex:1}} onPress={() => this.tabpressed(3)  }>
            <View style={{flex:1,alignItems:'center'}}>
            {this.state.trend?
              <AntDesign name="retweet" style={{fontSize:33, color:'#ff5e62'}} />
              :
              <AntDesign name="retweet" style={{fontSize:31}} />
            }
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{flex:1}}  onPress={() => this.tabpressed(4)  }>
            <View style={{flex:1,alignItems:'center'}}>
            {this.state.profile?
              <MaterialIcons name="person-outline" style={{fontSize:33, color:'#ff5e62'}} />
              :
              <MaterialIcons name="person-outline" style={{fontSize:30}} />
            }
            </View>
          </TouchableOpacity>
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#263238',
    overflow: 'hidden',
  },
  icon: {
    backgroundColor: 'transparent',
    color: 'white',
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
    marginRight: 32,
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
