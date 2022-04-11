import { IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar, isPlatform } from "@ionic/react"
import { add } from "ionicons/icons";
import { useContext } from "react";
import MemoriesContext from "../data/memories-context";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const BadMemories: React.FC = () => {
    const memoriesCtx = useContext(MemoriesContext);
    const badMemories = memoriesCtx.memories.filter(memory => memory.type === 'bad');

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
                        Bad Memories
                    </IonTitle>
                    {!isPlatform('android') && (
                        <IonButtons slot="end">
                            <IonButton href="/tabs/new">
                                <IonIcon icon={add}></IonIcon>
                            </IonButton>
                        </IonButtons>
                    )}
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid>
                    {badMemories.length === 0 && (
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <IonTitle color="primary">No bad memories found.</IonTitle>
                            </IonCol>
                        </IonRow>
                    )}

                    <LoadScript
                        googleMapsApiKey="API_KEY"
                        loadingElement={loading}
                    />

                    {badMemories.map(memory => (
                        <IonRow key={memory.id}>
                            <IonCol>
                                <IonCard className="ion-text-center">
                                    <img src={memory.base64Url} alt={memory.title} />

                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={{ lat: memory.markerLat, lng: memory.markerLng }}
                                        zoom={10}
                                    >
                                        <></>
                                        <Marker position={{ lat: memory.markerLat, lng: memory.markerLng }} />
                                    </GoogleMap>

                                    <IonCardHeader className="ion-text-left">
                                        <IonCardTitle>{memory.title}</IonCardTitle>
                                    </IonCardHeader>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    ))}
                </IonGrid>
                {isPlatform('android') && (
                    <IonFab horizontal="end" vertical="bottom" slot="fixed">
                        <IonFabButton color="primary" href="/tabs/new">
                            <IonIcon icon={add}></IonIcon>
                        </IonFabButton>
                    </IonFab>
                )}
            </IonContent>
        </IonPage>
    );
};

export default BadMemories;