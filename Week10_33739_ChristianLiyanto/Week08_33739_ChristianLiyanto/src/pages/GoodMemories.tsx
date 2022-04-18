import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, isPlatform } from "@ionic/react"
import { add } from "ionicons/icons";
import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios, { AxiosResponse } from "axios";
import { API_KEY, LOCALHOST } from "../App";

const GoodMemories: React.FC = () => {
    const [data, setData] = useState<AxiosResponse>();
    const url = LOCALHOST + "select_all_good_memory.php";

    const [goodMemories, setGoodMemories] = useState<Array<any>>([]);

    useEffect(() => {
        axios.get(url).then((response) => {
            setData(response);
            console.log(data);
        });
    }, []);
    useEffect(() => {
        console.log(data);
        setGoodMemories(data?.data.memories);
    }, [data]);
    useEffect(() => {
        console.log(goodMemories);
    }, [goodMemories]);

    const loading = <div />;

    const containerStyle = {
        width: '100%',
        height: '200px'
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>
                        Good Memories
                    </IonTitle>
                    {!isPlatform('android') && (
                        <IonButtons slot="end">
                            <IonButton href="/tabs/new">
                                <IonIcon icon={add} />
                            </IonButton>
                        </IonButtons>)}
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid>
                    {!goodMemories && (
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <IonTitle color="primary">No good memories found.</IonTitle>
                            </IonCol>
                        </IonRow>)}
                    {goodMemories && (
                        <LoadScript
                            googleMapsApiKey={API_KEY}
                            loadingElement={loading}>
                            {goodMemories && goodMemories.map(memory => (
                                <IonRow key={memory.id}>
                                    <IonCol>
                                        <IonCard className="ion-text-center">
                                            <img src={LOCALHOST + memory.photo} alt={memory.title} />
                                            <GoogleMap
                                                mapContainerStyle={containerStyle}
                                                center={{ lat: +memory.markerLat, lng: +memory.markerLng }}
                                                zoom={10}>
                                                <Marker position={{ lat: +memory.markerLat, lng: +memory.markerLng }} />
                                            </GoogleMap>
                                            <IonCardHeader className="ion-text-left">
                                                <IonCardTitle>{memory.title}</IonCardTitle>
                                            </IonCardHeader>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>))}
                        </LoadScript>)}
                </IonGrid>
                {isPlatform('android') && (
                    <IonFab horizontal="end" vertical="bottom" slot="fixed">
                        <IonFabButton color="primary" href="/tabs/new">
                            <IonIcon icon={add} />
                        </IonFabButton>
                    </IonFab>)}
            </IonContent>
        </IonPage>
    );
};

export default GoodMemories;