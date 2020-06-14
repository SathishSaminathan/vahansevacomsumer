import React, {useState, useEffect, useCallback} from 'react';
import {Dimensions, View, Alert, BackHandler} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useFocusEffect} from '@react-navigation/native';

import {Colors} from '../constants/ThemeConstants';
import TextComponent from '../components/Shared/TextComponent';
import VehicleInfo from './Details/VehicleInfo';
import OwnerInfo from './Details/OwnerInfo';
import ComplaintInfo from './Details/ComplaintInfo';
import ScannedInfo from './Details/ScannedInfo';
import LottieAnimation from '../components/Shared/LottieAnimation';
import {LottieFile} from '../assets/lottie';
import {heightPerc, widthPerc} from '../helpers/styleHelper';
import {FontType, IconType, GET} from '../constants/AppConstants';
import Ripple from 'react-native-material-ripple';
import IconComponent from '../components/Shared/IconComponent';
import NoData from './NoData';
import ButtonComponent from '../components/Shared/ButtonComponent';
import Services from '../services';

const initialLayout = {width: Dimensions.get('window').width};

const DetailsPage = (props) => {
  let {barcodeValue, positions} = props.route.params;
  positions = JSON.parse(positions);
  const {
    coords: {latitude, longitude},
  } = positions;
  console.warn(barcodeValue, positions);
  const [index, setIndex] = React.useState(0);
  const [Loading, setLoading] = useState(true);
  const [Details, setDetails] = useState(null);
  const [VehicleInfoD, setVehicleInfo] = useState(null);
  const [OwnerInfoD, setOwnerInfo] = useState(null);
  const [ComplaintInfoD, setComplaintInfo] = useState(null);
  const Service = new Services();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    Service.api(
      GET,
      `qrcode/scan?latitude=${latitude}&longitude=${longitude}&qrCodeNumber=${encodeURIComponent(
        barcodeValue,
      )}`,
    )
      .then((res) => {
        console.log('vehicle/info/complaints...', barcodeValue, res.data);
        setDetails(res.data);
        setOwnerInfo(res.data.ownerInfo);
        setVehicleInfo(res.data.vehicleInfo);
        setComplaintInfo(res.data.policeComplaints);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => props.navigation.goBack()},
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  const [routes] = React.useState([
    {key: 'VehicleInfo', title: 'Vehicle'},
    {key: 'OwnerInfo', title: 'Owner'},
    {key: 'ComplaintInfo', title: 'Complaint'},
  ]);

  const renderScene = SceneMap({
    VehicleInfo: () => <VehicleInfo VehicleInfo={VehicleInfoD} {...props} />,
    OwnerInfo: () => <OwnerInfo OwnerInfo={OwnerInfoD} {...props} />,
    ComplaintInfo: () => (
      <ComplaintInfo ComplaintInfo={ComplaintInfoD} {...props} />
    ),
  });

  const renderLabel = ({route}) => (
    <TextComponent
      style={{
        fontFamily: 'ProximaNova-Bold',
        fontSize: 15,
        color: Colors.tabText,
      }}>
      {route.title}
    </TextComponent>
  );

  const renderHeader = (props) => (
    <TabBar
      indicatorStyle={{
        backgroundColor: Colors.primaryLightThemeColor,
        height: 1.5,
      }}
      style={{backgroundColor: Colors.white}}
      renderLabel={renderLabel}
      {...props}
    />
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      {Loading ? (
        <LottieAnimation />
      ) : Details ? (
        <>
          <TabView
            navigationState={{index, routes}}
            renderTabBar={renderHeader}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
          />
          <View
            style={{
              flexDirection: 'row',
              width: widthPerc(100),
              paddingBottom: 5,
              backgroundColor: Colors.transparent,
            }}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <ButtonComponent
                style={{width: '90%', borderRadius: 8}}
                onPress={() => props.navigation.navigate('OtpVerification')}>
                Verify OTP
              </ButtonComponent>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <ButtonComponent
                onPress={() => props.navigation.navigate('ChargeFine')}
                style={{
                  backgroundColor: Colors.red,
                  width: '90%',
                  borderRadius: 8,
                }}>
                Charge Fine
              </ButtonComponent>
            </View>
          </View>
        </>
      ) : (
        <NoData hasRoute {...props} />
      )}
    </View>
  );
};

export default DetailsPage;
