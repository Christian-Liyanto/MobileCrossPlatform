import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonMenuButton, IonPage, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react";
import { ban, banSharp, create, trash } from "ionicons/icons";
import React, { useRef } from "react";

export const FRIENDS_DATA = [
    {id: 'f1', name: 'John Thor', avatar:'https://asset.kompas.com/crops/SV5q4gPkeD8YJTuzO31BqTr9DEI=/192x128:1728x1152/750x500/data/photo/2021/03/06/60436a28b258b.jpg'},
    {id: 'f2', name: 'John Ness', avatar:'https://cdn-2.tstatic.net/tribunnews/foto/bank/images/20211025_113430jpg-20211025113649.jpg'},
    {id: 'f3', name: 'John Doe', avatar:'https://indihome.co.id/uploads/images/blog/9-Hal-Penting-yang-Harus_21725210708093619_D.jpg'}
];

const Meet: React.FC = () =>{
    const  callFriendHandler = () => {
        console.log("Calling...");
    };
    
    const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

    const blockFriendHandler = () =>{
        slidingOptionsRef.current?.closeOpened();
        console.log("Blocking...");
    };
    
    const deleteFriendHandler = () => {
        slidingOptionsRef.current?.closeOpened();
        console.log("Deleting...");
    }

    const editFriendHandler = () => {
        slidingOptionsRef.current?.closeOpened();
        console.log("Editing...");
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Meet</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {FRIENDS_DATA.map(friend => (
                        <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
                            <IonItemOptions side="start">
                                <IonItemOption color="danger" onClick={blockFriendHandler}>
                                    <IonIcon slot="icon-only" icon={ban} />
                                </IonItemOption>
                                <IonItemOption color="warning" onClick={deleteFriendHandler}>
                                    <IonIcon slot="icon-only" icon={trash} />
                                </IonItemOption>
                            </IonItemOptions>
                            <IonItemOptions side="end">
                                <IonItemOption color="warning" onClick={editFriendHandler}>
                                    <IonIcon slot="icon-only" icon={create} />
                                </IonItemOption>
                            </IonItemOptions>
                            <IonItem lines="full" button onClick={callFriendHandler}>
                                <IonThumbnail slot="start"><img src={friend.avatar} /></IonThumbnail>
                                <IonLabel>{friend.name}</IonLabel>
                            </IonItem>
                        </IonItemSliding>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Meet;
