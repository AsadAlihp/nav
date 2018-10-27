/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextField } from 'q-react-native-material-textfield';
import { Button } from 'react-native-elements';
const instructions = Platform.select({
  ios: 'Entry screen',
  android:
    'Entry screen',
});

type Props = {};
export default class App extends Component<Props> {
  static navigationOptions = {
   title: 'Welcome',
   header: null,
 };
 constructor(props) {
   super(props);

   this.onFocus = this.onFocus.bind(this);
   this.onSubmit = this.onSubmit.bind(this);
   this.onChangeText = this.onChangeText.bind(this);
   this.onSubmitFirstName = this.onSubmitFirstName.bind(this);

   this.firstnameRef = this.updateRef.bind(this, 'firstname');


   this.state = {
     firstname: '',
     isloading:false,
   };
 }

     onFocus() {
       let { errors = {} } = this.state;

       for (let name in errors) {
         let ref = this[name];

         if (ref && ref.isFocused()) {
           delete errors[name];
         }
       }

       this.setState({ errors });
     }

     onChangeText(text) {
       ['firstname']
         .map((name) => ({ name, ref: this[name] }))
         .forEach(({ name, ref }) => {
           if (ref.isFocused()) {
             this.setState({ [name]: text });
           }
         });
     }



     onSubmitFirstName() {
       this.firstname.blur();
     }



     onSubmit() {
       let errors = {};

       ['firstname' ]
         .forEach((name) => {
           let value = this[name].value();

           if (!value) {
             errors[name] = 'Should not be empty';
           } else {
             if ('password' === name && value.length < 6) {
               errors[name] = 'Too short';
             }
           }
         });

       this.setState({ errors });
     }

     updateRef(name, ref) {
       this[name] = ref;
     }
resetpass(){
    if(this.state.isloading){
    this.setState({isloading:false});
  }else{
    this.setState({isloading:true});
  }
}
  render() {
    let { errors = {}, ...data } = this.state;
    const { navigate, goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
      <StatusBar
         backgroundColor="#ff5e62"
         barStyle="light-content"
       />
      <LinearGradient colors={['#ff5e62',  '#ff9966']} style={{justifyContent:'center',flex:1,width:'100%'}}>

      <TouchableOpacity onPress={() => goBack()}>
      <View style={{
                    borderRadius:45,
                    width:60,
                    justifyContent:'center',
                    margin:5,
                    alignItems:'center',
                    backgroundColor:'rgba(255,255,255,0.4)',
                    padding:2,
                    }}>
                    <Ionicons name="md-arrow-back" size={30} style={{padding:5,alignItems:'center',justifyContent:'center',width:45}} color="#fff" />
        </View>
        </TouchableOpacity>


      <View style={{justifyContent:'center',flex:1}}>


      <View style={{alignItems:'center',justifyContent:'center'}}>
          <Entypo name="documents" size={120}  color="#fff" />
          <Text style={{fontSize:35,color:'white',  fontFamily:'cochin'}}>WhatsPoetry</Text>
      </View>

      <View style={{padding:20}}>
      <TextField
           ref={this.firstnameRef}
           value={data.firstname}
           autoCorrect={false}
           textColor='white'
           // baseColor='#ff5e62'
           enablesReturnKeyAutomatically={true}
           onFocus={this.onFocus}
           onChangeText={this.onChangeText}
           onSubmitEditing={this.onSubmitFirstName}
           returnKeyType='SEND'
           tintColor='white'
           title='Type your Email Address'
           label='Email address'
           error={errors.firstname}
         />
         </View>

      <View style={{justifyContent:'center',alignItems:'center'}} >

      <Button
          title="RESET"
          loading={this.state.isloading}
          loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
          titleStyle={{ fontWeight: "700" }}
          onPress={() =>
            this.resetpass()
          }
          buttonStyle={{
            backgroundColor: "transparent",
            width: 300,
            height: 45,
            borderColor: "white",
            borderWidth: 1,
            borderRadius: 5
          }}
          containerStyle={{ marginTop: 20 }}
        />



      </View>



        </View>
      </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
