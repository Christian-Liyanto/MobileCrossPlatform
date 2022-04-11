import { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Geolocation } from '@capacitor/geolocation';

import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

import './Home.css';

const Home: React.FC = () => {
  const getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });

    console.log('Current Position:', coordinates);
    console.log('Lat:', coordinates.coords.latitude);
    console.log('Lng:', coordinates.coords.longitude);
    setLat(coordinates.coords.latitude);
    setLng(coordinates.coords.longitude);
  }

  const trackPositoin = async () => {
    const data = await Geolocation.watchPosition({
      enableHighAccuracy: true,
      timeout: 1000
    }, (position, err) => {
      if (position) {
        console.log(position);
      }
    });
  };

  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  const [lat, setLat] = useState(-6.257377926995551);
  const [lng, setLng] = useState(106.61829861017398);

  const selectPos = (e: google.maps.MapMouseEvent) => {
    if(e.latLng?.lat()){
      setLat(e.latLng?.lat());
    }

    if(e.latLng?.lng()){
      setLng(e.latLng?.lng());
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={getCurrentPosition}>Current Position</IonButton>
        <IonButton onClick={trackPositoin}>Track Position</IonButton>
        <LoadScript googleMapsApiKey="AIzaSyChTJ0LrGbmcV9VZPOq4wp8m31tIRy3rYc">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: lat, lng: lng }}
            zoom={10}
            onClick={selectPos}>
            <></>
            <InfoWindow position={{lat: -6.257377926995551, lng: 106.61829861017398}}>
              <div>
                <h1>Kampus paling keren.</h1>
              </div>
            </InfoWindow>

            <Marker position={{lat: lat, lng: lng}} />
          </GoogleMap>
        </LoadScript>
      </IonContent>
    </IonPage>
  );
};

export default Home;
