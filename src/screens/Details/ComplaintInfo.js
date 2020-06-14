import React, {useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Colors} from '../../constants/ThemeConstants';
import {widthPerc} from '../../helpers/styleHelper';
import {ReadmoreComponent} from '../../components/Shared/ReadMore';
import TextComponent from '../../components/Shared/TextComponent';
import {FontType} from '../../constants/AppConstants';
import NoData from '../NoData';
import Ripple from 'react-native-material-ripple';

const ComplaintCardText = ({label, value, isReadMore = false}) => (
  <View style={{flexDirection: 'row', paddingVertical: 5}}>
    <View style={{flex: 3}}>
      <TextComponent>{label}</TextComponent>
    </View>
    <View style={{flex: 1}}>
      <TextComponent>:</TextComponent>
    </View>
    <View style={{flex: 7}}>
      {isReadMore ? (
        <ReadmoreComponent
          style={{fontWeight: 'bold'}}
          lines={1}
          text={value}
        />
      ) : (
        <TextComponent type={FontType.BOLD}>{value}</TextComponent>
      )}
    </View>
  </View>
);

const ComplaintInfo = ({ComplaintInfoD = [], navigation}) => {
  const [List, setList] = useState(
    // ComplaintInfoD,
    [
      {
        Name: 'Helmet',
        Count: 10,
      },
      {
        Name: 'Fast Driving',
        Count: 3,
      },
      {
        Name: 'Drunk & Drive',
        Count: 2,
      },
      {
        Name: 'Driving without License',
        Count: 5,
      },
    ],
  );
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Colors.white,
        // alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
      {List.length !== 0 ? (
        List.map((data, i) => (
          <View
            key={i}
            style={{
              width: widthPerc(50),
              // height: 100,
              // marginVertical: 10,
              padding: 10,
              borderRadius: 8,
              overflow: 'hidden',
            }}>
            <Ripple
              onPress={() => navigation.navigate('ComplaintInfoDetails')}
              style={{
                elevation: 10,
                backgroundColor: Colors.white,
                padding: 10,
                alignItems: 'center',
                borderRadius: 8,
              }}>
              <View style={{height: 40}}>
                <TextComponent style={{fontSize: 13}}>
                  {data.Name}
                </TextComponent>
              </View>
              <TextComponent
                style={{
                  fontSize: 30,
                  color: data.Count > 3 ? Colors.red : Colors.green,
                }}
                type={FontType.BOLD}>
                {data.Count}
              </TextComponent>
            </Ripple>
            {/* <ReadmoreComponent
            style={{fontSize: 17}}
            lines={1}
            text={data.ComplaintDetails}
          /> */}
          </View>
        ))
      ) : (
        <NoData text="No Complaints..." />
      )}
    </ScrollView>
  );
};

export default ComplaintInfo;
