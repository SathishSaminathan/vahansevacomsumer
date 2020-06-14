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

const ComplaintCardText = ({label, value, isReadMore = false}) => (
  <View style={{flexDirection: 'row', paddingVertical: 5}}>
    <View style={{flex: 3}}>
      <TextComponent>{label}</TextComponent>
    </View>
    <View style={{flex: 1}}>
      <TextComponent>:</TextComponent>
    </View>
    <View style={{flex: 7}}>
      <TextComponent type={FontType.BOLD}>{value}</TextComponent>
    </View>
  </View>
);

const CheckForStatus = (status) =>
  status === 'PENDING' ? Colors.red : Colors.green;

const History = () => {
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
  const [Active, setActive] = useState('Complaints');
  const [List, setList] = useState([
    {
      VehicleNo: 'TN 39 BT 4863',
      Name: 'Driving without License',
      FineAmount: '1000',
      PayType: 'Pay Now',
      FineStatus: 'PENDING',
      ScannedAt: '20-06-2020 1.30PM',
    },
    {
      VehicleNo: 'TN 39 BT 4863',
      Name: 'Driving without License',
      FineAmount: '1000',
      PayType: 'Pay Now',
      FineStatus: 'SUCCESS',
      ScannedAt: '20-06-2020 1.30PM',
    },
  ]);
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
            Sub Inspector - Madurai
          </TextComponent>
        </View>
        <View
          style={{flex: 2, alignItems: 'flex-end', justifyContent: 'center'}}>
          <View
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
          </View>
        </View>
      </View>
      <TextComponent style={{margin: 10, fontSize: 20}} type={FontType.BOLD}>
        History
      </TextComponent>
      {List.length === 0 ? (
        <NoData text="No Complaints..." />
      ) : (
        <View style={{flex: 1, backgroundColor: Colors.white}}>
          <View
            style={{flexDirection: 'row', marginVertical: 20, marginTop: 5}}>
            {['Complaints', 'Scanned', 'Fines'].map((data, i) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActive(data)}
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
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              backgroundColor: Colors.white,
              alignItems: 'center',
            }}>
            {List.map((data, i) => (
              <View
                key={i}
                style={{
                  width: widthPerc(97),
                  marginVertical: 10,
                  elevation: 10,
                  backgroundColor: Colors.white,
                  padding: 10,
                  borderRadius: 8,
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    height: '200%',
                    width: 5,
                    backgroundColor: CheckForStatus(data.FineStatus),
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                  }}></View>
                <ComplaintCardText label="Vehicle No" value={data.VehicleNo} />
                <ComplaintCardText label="Name" value={data.Name} />
                <ComplaintCardText
                  label="Fine Amount"
                  value={data.FineAmount}
                />
                <ComplaintCardText label="Pay Type" value={data.PayType} />
                <ComplaintCardText
                  label="Fine Status"
                  value={data.FineStatus}
                />
                <ComplaintCardText label="Scanned at" value={data.ScannedAt} />
                {/* <ReadmoreComponent
          style={{fontSize: 17}}
          lines={1}
          text={data.ComplaintDetails}
        /> */}
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default History;
