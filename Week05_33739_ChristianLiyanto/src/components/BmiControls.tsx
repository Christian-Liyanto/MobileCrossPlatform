import { IonButton, IonCol, IonRow, IonIcon } from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";
import React from "react";

const BmiControls: React.FC <{onCalculate: () => void; onReset: () =>void}> = props =>{
    return(
        <IonRow>
            <IonCol size="12" sizeMd="6" className="ion-text-center">
                <IonButton expand="block" color="success" onClick={props.onCalculate}>
                    <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
                    Calculate
                </IonButton>
            </IonCol>
            <IonCol size="12" sizeMd="6" className="ion-text-center">
                <IonButton fill="clear" color="medium" onClick={props.onReset}>
                    <IonIcon slot="start" icon={refreshOutline}></IonIcon>
                    Reset
                </IonButton>
            </IonCol>
        </IonRow>
    );
};

export default BmiControls;