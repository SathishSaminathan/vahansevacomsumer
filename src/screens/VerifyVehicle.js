import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {Colors} from '../constants/ThemeConstants';
import {NavigationHeader, CustomButton} from './OTP/lib';
import {GenericStyles} from './OTP/styles/GenericStyles';
import TextComponent from '../components/Shared/TextComponent';
import {FontType} from '../constants/AppConstants';
import {widthPerc} from '../helpers/styleHelper';
import TimerText from './OTP/components/otp/TimerText';
import ButtonComponent from '../components/Shared/ButtonComponent';
import {ScrollView} from 'react-native-gesture-handler';

const RESEND_OTP_TIME_LIMIT = 3; // 30 secs

let resendOtpTimerInterval;

export default class VerifyVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VehicleNo: '',
      resendButtonDisabledTime: RESEND_OTP_TIME_LIMIT,
      OTP: '',
    };
  }

  startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (this.state.resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
        this.setState({
          resendButtonDisabledTime: RESEND_OTP_TIME_LIMIT,
        });
      } else {
        this.setState({
          resendButtonDisabledTime: this.state.resendButtonDisabledTime - 1,
        });
      }
    }, 1000);
  };

  render() {
    const {VehicleNo, resendButtonDisabledTime, OTP} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        {/* <NavigationHeader
          title={'Verify Vehicle'}
          leftIconAction={() => this.props.navigation.goBack()}
          // leftIconType={'back'}
          containerStyle={GenericStyles.navigationHeaderBorder}
        /> */}
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: 'center',
          }}>
          <View style={{}}>
            <TextComponent
              style={{fontSize: 25, alignSelf: 'center', paddingVertical: 10}}
              type={FontType.BOLD}>
              Enter Vehicle Number
            </TextComponent>

            <View
              style={{
                width: widthPerc(80),
                borderWidth: 3,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <TextInputMask
                autoCapitalize="characters"
                autoFocus
                type={'custom'}
                options={{
                  mask: 'AA 99 AA 9999',
                }}
                style={{fontSize: 30}}
                value={VehicleNo}
                onChangeText={(VehicleNo) => {
                  this.setState({
                    VehicleNo,
                  });
                }}
              />
            </View>
          </View>
          <ButtonComponent
            style={{width: widthPerc(80), borderRadius: 10, marginTop: 10}}
            onPress={() =>
              VehicleNo &&
              this.props.navigation.navigate('OtpVerification', {
                VehicleNo,
              })
            }>
            Get OTP
          </ButtonComponent>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 45,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 0,
    borderWidth: 1,
    fontWeight: 'bold',
    color: Colors.themeBlack,
  },
});
