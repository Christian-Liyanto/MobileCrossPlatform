import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const Settings: React.FC = () =>{
    return(
        <IonPage>
            <IonHeader>
                 <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h2>Settings</h2>
            </IonContent>
        </IonPage>
    );
};
export default Settings;