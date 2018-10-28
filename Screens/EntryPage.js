/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
   this.onSubmitPassword = this.onSubmitPassword.bind(this);
   this.onAccessoryPress = this.onAccessoryPress.bind(this);

   this.firstnameRef = this.updateRef.bind(this, 'firstname');
   this.passwordRef = this.updateRef.bind(this, 'password');

   this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

   this.state = {
     firstname: '',
     isloading:false,
     hidelogo:false,
     secureTextEntry: true,
   };
 }
 componentDidMount () {
   this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
   this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
 }

 componentWillUnmount () {
   this.keyboardDidShowListener.remove();
   this.keyboardDidHideListener.remove();
 }

 _keyboardDidShow = ()=> {
   this.setState({hidelogo:true});
 }

 _keyboardDidHide = ()=> {
   this.setState({hidelogo:false});
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
       ['firstname',  'password']
         .map((name) => ({ name, ref: this[name] }))
         .forEach(({ name, ref }) => {
           if (ref.isFocused()) {
             this.setState({ [name]: text });
           }
         });
     }

     onAccessoryPress() {
       this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
     }

     onSubmitFirstName() {
       this.password.focus();
     }

     onSubmitPassword() {
       this.password.blur();
     }

     onSubmit() {
       let errors = {};
         const { navigate } = this.props.navigation;
        let ok = true;
       ['firstname',  'password']
         .forEach((name) => {
           let value = this[name].value();

           if (!value) {
             errors[name] = 'Should not be empty';
             ok = false;
           } else {
             if ('password' === name && value.length < 6) {
               errors[name] = 'Too short';
               ok = false;
             }
           }
         });
         if(ok){
           navigate('HomeScreen', { propps: 'sign up prop' });
         }
       this.setState({ errors });
     }

     updateRef(name, ref) {
       this[name] = ref;
     }

     renderPasswordAccessory() {
       let { secureTextEntry } = this.state;

       let name = secureTextEntry?
         'visibility':
         'visibility-off';

       return (
         <MaterialIcons
           size={24}
           name={name}
           color={TextField.defaultProps.baseColor}
           onPress={this.onAccessoryPress}
           suppressHighlighting
         />
       );
     }

  render() {
    let { errors = {}, secureTextEntry, ...data } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <StatusBar
         backgroundColor="#ff5e62"
         barStyle="light-content"
       />
      <LinearGradient colors={['#ff5e62',  '#ff9966']} style={{justifyContent:'center',flex:1,width:'100%'}}>


{!this.state.hidelogo?
      <View style={{alignItems:'center',marginTop:30,justifyContent:'center',flex:1}}>
          <Entypo name="documents" size={120}  color="#fff" />
          <Text style={{fontSize:35,color:'white',  fontFamily:'cochin'}}>WhatsPoetry</Text>
      </View>
      :null}


<View style={{flex:1}}>

      <View style={{ justifyContent:'flex-end', paddingLeft:20,paddingRight:20}}>
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
           returnKeyType='next'
           tintColor='white'
           title='Type your username or email'
           label='User name'
           error={errors.firstname}
         />
         <TextField
            ref={this.passwordRef}
            value={data.password}
            secureTextEntry={secureTextEntry}
            autoCapitalize='none'
            textColor='white'
            tintColor='white'
            // baseColor='#ff5e62'
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            clearTextOnFocus={true}
            onFocus={this.onFocus}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitPassword}
            returnKeyType='done'
            label='Password'
            error={errors.password}
            title='Type your password'
            maxLength={30}
            characterRestriction={20}
            renderAccessory={this.renderPasswordAccessory}
          />

      </View> 
  </View>

        <View style={{justifyContent:'center',width:'100%', alignItems:'center'}} >
            <TouchableOpacity onPress={() =>
              navigate('ForgotPass', { propps: 'Guest prop' })
            }>
              <Text style={{color:'white',marginBottom:30}}> Forgot Password? </Text>
              </TouchableOpacity>
          <Button
              title="LOGIN"
              loading={this.state.isloading}
              loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
              titleStyle={{ fontWeight: "700" }}
              onPress={() =>
                this.onSubmit()
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
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',height:100,width:'100%'}}>
          <View style={{justifyContent:'center',height:'100%'}}>
          <TouchableOpacity onPress={() =>
            navigate('HomeScreenGuest', { propps: 'Guest prop' })
          }>
            <Text
              style={{color:'white'}}>LOGIN AS GUEST </Text>
              </TouchableOpacity>
          </View>

            <Button
                title="SIGN UP"
                loading={this.state.isloading}
                loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                titleStyle={{ fontWeight: "700" }}
                onPress={() =>
                  navigate('SignUp', { propps: 'sign up prop' })
                }
                buttonStyle={{
                  backgroundColor: "#ff5e62",
                  height: 30,

                  borderColor: "transparent",
                  marginRight:0,
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
