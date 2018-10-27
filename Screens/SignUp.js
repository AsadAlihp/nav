/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar,ScrollView,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextField } from 'q-react-native-material-textfield';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
   this.onSubmitLastName = this.onSubmitLastName.bind(this);
   this.onSubmitAbout = this.onSubmitAbout.bind(this);
   this.onSubmitEmail = this.onSubmitEmail.bind(this);
   this.onSubmitPassword = this.onSubmitPassword.bind(this);
   this.onAccessoryPress = this.onAccessoryPress.bind(this);

   this.firstnameRef = this.updateRef.bind(this, 'firstname');
   this.lastnameRef = this.updateRef.bind(this, 'lastname');
   this.aboutRef = this.updateRef.bind(this, 'about');
   this.emailRef = this.updateRef.bind(this, 'email');
   this.passwordRef = this.updateRef.bind(this, 'password');

   this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

   this.state = {
     firstname: '',
     isloading:false,
     secureTextEntry: true,
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
       ['firstname', 'lastname', 'about', 'email', 'password']
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
       this.lastname.focus();
     }

     onSubmitLastName() {
       this.about.focus();
     }

     onSubmitAbout() {
       this.email.focus();
     }

     onSubmitEmail() {
       this.password.focus();
     }

     onSubmitPassword() {
       this.password.blur();
     }

     onSubmit() {
       let errors = {};

       ['firstname', 'lastname', 'email', 'password']
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
    const { navigate, goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
      <StatusBar
         backgroundColor="#ff5e62"
         barStyle="light-content"
       />
      <LinearGradient colors={['#ff5e62',  '#ff9966']} style={{flex:1,width:'100%'}}>

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


      <View style={{alignItems:'center',marginTop:10,justifyContent:'center'}}>
          <Entypo name="documents" size={50}  color="#fff" />
          <Text style={{fontSize:20,color:'white',  fontFamily:'cochin'}}>WhatsPoetry</Text>
      </View>

      <View style={{flex:1,padding:20}}>
      <ScrollView>
      <TextField
                ref={this.firstnameRef}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitFirstName}
                returnKeyType='next'
                label='First Name'
                error={errors.firstname}
                textColor='white'
                tintColor='white'
              />

              <TextField
                ref={this.lastnameRef}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitLastName}
                returnKeyType='next'
                label='Last Name'
                error={errors.lastname}
                textColor='white'
                tintColor='white'
              />

              <TextField
                ref={this.aboutRef}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitAbout}
                returnKeyType='next'
                multiline={true}
                blurOnSubmit={true}
                label='About (optional)'
                characterRestriction={140}
                textColor='white'
                tintColor='white'
              />

              <TextField
                ref={this.emailRef}
                // defaultValue={defaultEmail}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitEmail}
                returnKeyType='next'
                label='Email Address'
                error={errors.email}
                textColor='white'
                tintColor='white'
              />

              <TextField
                ref={this.passwordRef}
                secureTextEntry={secureTextEntry}
                autoCapitalize='none'
                textColor='white'
                tintColor='white'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                clearTextOnFocus={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitPassword}
                returnKeyType='done'
                label='Password'
                error={errors.password}
                title='Choose wisely'
                maxLength={30}
                characterRestriction={20}
                renderAccessory={this.renderPasswordAccessory}
              />
              </ScrollView>
    </View>

      <View style={{justifyContent:'center',marginBottom:20,alignItems:'center'}} >

      <Button
          title="SIGN UP"
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
