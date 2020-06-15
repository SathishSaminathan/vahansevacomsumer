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
import {connect} from 'react-redux';

const initialLayout = {width: Dimensions.get('window').width};

const DetailsPage = (props) => {
  const [index, setIndex] = React.useState(0);
  const [Loading, setLoading] = useState(true);
  const [Details, setDetails] = useState(null);
  const [VehicleInfoD, setVehicleInfo] = useState(null);
  const [OwnerInfoD, setOwnerInfo] = useState(null);
  const [ComplaintInfoD, setComplaintInfo] = useState(null);
  const [VehicleId, setVehicleId] = useState(null);
  const [Attachments, setAttachments] = useState([]);
  const [TrafficFines, setTrafficFines] = useState([]);
  const Service = new Services();

  const getDetails = (VehicleNo = null) => {
    let url = `vehicle/info?vehicleNumber=${VehicleNo}`;
    Service.api(GET, url)
      .then((res) => {
        console.log('vehicle/info/complaints...', res.data);
        setDetails(res.data);
        setOwnerInfo(res.data.ownerInfo);
        setVehicleInfo(res.data.vehicleInfo);
        setVehicleId(res.data.vehicleInfo.vehicleId);
        setComplaintInfo(res.data.policeComplaints);
        setAttachments(res.data.attachments);
        setTrafficFines(res.data.trafficFines);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    let {VehicleNo} = props;
    getDetails(VehicleNo);
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     const backAction = () => {
  //       Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //         {
  //           text: 'Cancel',
  //           onPress: () => null,
  //           style: 'cancel',
  //         },
  //         {text: 'YES', onPress: () => props.navigation.goBack()},
  //       ]);
  //       return true;
  //     };

  //     const backHandler = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       backAction,
  //     );

  //     return () => backHandler.remove();
  //   }, []),
  // );

  const [routes] = React.useState([
    {key: 'VehicleInfo', title: 'Vehicle'},
    {key: 'OwnerInfo', title: 'Owner'},
  ]);

  const renderScene = SceneMap({
    VehicleInfo: () => <VehicleInfo VehicleInfo={VehicleInfoD} {...props} />,
    OwnerInfo: () => (
      <OwnerInfo Attachments={Attachments} OwnerInfo={OwnerInfoD} {...props} />
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
        </>
      ) : (
        <NoData hasRoute {...props} text="User is not Registered with VIN" />
      )}
    </View>
  );
};

const mapStateToProps = ({
  user: {
    current_user: {VehicleNo},
    isLoading,
  },
}) => {
  return {
    VehicleNo,
  };
};

export default connect(mapStateToProps, null)(DetailsPage);
