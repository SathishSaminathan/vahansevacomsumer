import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import ImageComponent from '../components/Shared/ImageComponent';
import {Colors} from '../constants/ThemeConstants';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyBahBVMx9kedh0tsBDsS3UKDt7BTuLXVE8';

class ScannedLocationMap extends Component {
  constructor(props) {
    super(props);

    // AirBnB's Office, and Apple Park
    this.state = {
      coordinates: [
        {
          latitude: 11.169605,
          longitude: 77.346383,
        },
        // {
        //   latitude: 11.170057,
        //   longitude: 77.349731,
        // },
      ],
    };

    this.mapView = null;
  }

  componentDidMount() {
    // this.mapView.animateToRegion(
    //   {
    //     latitude: 11.169605,
    //     longitude: 77.346383,
    //     latitudeDelta: LATITUDE_DELTA,
    //     longitudeDelta: LONGITUDE_DELTA,
    //   },
    //   3000,
    // );
  }

  onMapPress = (e) => {
    this.setState({
      coordinates: [...this.state.coordinates, e.nativeEvent.coordinate],
    });
  };

  render() {
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          height: '100%',
          width: width,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <MapView
          initialRegion={{
            latitude: 11.169605,
            longitude: 77.346383,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={{
            width,
            height,
            flex: 1,
          }}
          ref={(c) => (this.mapView = c)}
          // onPress={this.onMapPress}
        >
          {this.state.coordinates.map((coordinate, index) => (
            <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: Colors.white,
                  borderRadius: 20,
                  overflow: 'hidden',
                  elevation: 10,
                }}>
                <ImageComponent
                  source={{
                    uri:
                      'https://pickaface.net/gallery/avatar/66961165_171026_2019_co0p.png',
                  }}
                  style={{flex: 1, width: null, height: null}}
                  resizeMode="cover"
                />
              </View>
            </MapView.Marker>
          ))}
        </MapView>
      </View>
    );
  }
}

export default ScannedLocationMap;
