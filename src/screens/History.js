import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';

import {GET, AppVariables} from '../constants/AppConstants';
import TextComponent from '../components/Shared/TextComponent';
import {ReadmoreComponent} from '../components/Shared/ReadMore';
import {Colors} from '../constants/ThemeConstants';
import {widthPerc} from '../helpers/styleHelper';
import {FontType} from '../constants/AppConstants';
import Services from '../services';
import NoData from './NoData';
import ImageComponent from '../components/Shared/ImageComponent';
import {connect} from 'react-redux';
import Ripple from 'react-native-material-ripple';
import Scanned from './Scanned';
import Fines from './Fines';

const ComplaintCardText = ({label, value, isReadMore = false, rs = null}) => (
  <View style={{flexDirection: 'row', paddingVertical: 5}}>
    <View style={{flex: 3}}>
      <TextComponent>{label}</TextComponent>
    </View>
    <View style={{flex: 1}}>
      <TextComponent>:</TextComponent>
    </View>
    <View
      style={{flex: 7, flexDirection: 'row', justifyContent: 'space-between'}}>
      <TextComponent type={FontType.BOLD}>{value}</TextComponent>
      {rs && (
        <TextComponent
          type={FontType.BOLD}
          style={{color: Colors.green}}>{`Rs: ${rs}`}</TextComponent>
      )}
    </View>
  </View>
);

const CheckForStatus = (status) =>
  status === 'PENDING' ? Colors.red : Colors.green;

const History = (props) => {
  const getData = (type) => {
    setList([])
    const {VehicleNo} = props;
    let url =
      type === 'Scanned'
        ? `vehicle/complaints/logs?vehicleNumber=${VehicleNo}`
        : `vehicle/complaints?ERole=CONSUMERS&vehicleNumber=${VehicleNo}`;
    new Services()
      .api(GET, url)
      .then((res) => {
        setList(type === 'Scanned' ? res.data.logs : res.data.complaints);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Service = new Services();

  useEffect(() => {
    Service.api(GET, 'police/complaint')
      .then((res) => {
        // console.log(res);
        // setList(res.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [Active, setActive] = useState('Fines');
  const [List, setList] = useState([]);

  useEffect(() => {
    getData(Active);
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
        }}>
        <View style={{flex: 8}}>
          <TextComponent type={FontType.BOLD} style={{fontSize: 25}}>
            Hi, Saravanan
          </TextComponent>
          <TextComponent type={FontType.BOLD} style={{color: Colors.textWhite}}>
            {props.VehicleNo}
          </TextComponent>
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextComponent
              type={FontType.BOLD}
              style={{color: Colors.green, fontSize: 14}}>
              Scanned: 100
            </TextComponent>
            <TextComponent
              type={FontType.BOLD}
              style={{color: Colors.green, fontSize: 14}}>
              Amount Charged: 100
            </TextComponent>
          </View> */}
        </View>
        <View
          style={{flex: 2, alignItems: 'flex-end', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile')}
            activeOpacity={0.9}
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: Colors.white,
              elevation: 20,
              overflow: 'hidden',
            }}>
            <ImageComponent
              source={{
                uri:
                  'https://pickaface.net/gallery/avatar/66961165_171026_2019_co0p.png',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TextComponent style={{margin: 10, fontSize: 20}} type={FontType.BOLD}>
        History
      </TextComponent>
      {List && List.length === 0 ? (
        <NoData text="Loading..." />
      ) : (
        <View style={{flex: 1, backgroundColor: Colors.white}}>
          <View
            style={{flexDirection: 'row', marginVertical: 20, marginTop: 5}}>
            {['Fines', 'Scanned'].map((data, i) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setActive(data);
                  getData(data);
                }}
                key={i}
                style={{
                  backgroundColor: Active === data ? Colors.red : Colors.white,
                  padding: 10,
                  paddingHorizontal: 20,
                  borderRadius: 20,
                  marginHorizontal: 5,
                  elevation: 5,
                }}>
                <TextComponent
                  style={{
                    color: Active === data ? Colors.white : Colors.red,
                  }}>
                  {data}
                </TextComponent>
              </TouchableOpacity>
            ))}
          </View>
          {Active === 'Fines' ? (
            <Fines {...props} List={List} />
          ) : (
            <Scanned {...props} List={List} />
          )}
        </View>
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

export default connect(mapStateToProps, null)(History);
