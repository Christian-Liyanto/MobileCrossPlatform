import { IonAlert, IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonRow, IonThumbnail, IonTitle, IonToast, IonToolbar, isPlatform } from "@ionic/react";
import { addOutline, ban, banSharp, create, trash } from "ionicons/icons";
import { platform } from "os";
import { stringify } from "querystring";
import React, { useContext, useRef, useState } from "react";
import FriendsContext from "../data/friend-context";

export const FRIENDS_DATA = [
    {id: 'f1', name: 'John Thor', photo:'https://asset.kompas.com/crops/SV5q4gPkeD8YJTuzO31BqTr9DEI=/192x128:1728x1152/750x500/data/photo/2021/03/06/60436a28b258b.jpg'},
    {id: 'f2', name: 'John Ness', photo:'https://cdn-2.tstatic.net/tribunnews/foto/bank/images/20211025_113430jpg-20211025113649.jpg'},
    {id: 'f3', name: 'John Doe', photo:'https://indihome.co.id/uploads/images/blog/9-Hal-Penting-yang-Harus_21725210708093619_D.jpg'}
];

const Meet: React.FC = () =>{
    const [toastMessage, setToastMessage] = useState("");
    const [startBlocking, setStartBlocking] = useState(false);
    const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
    const [startDeleting, setStartDeleting] = useState(false);
    const friendsCtx = useContext(FriendsContext);
    const nameRef = useRef<HTMLIonInputElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState<{id: string, name: string, photo: string} | null>();
    const [modalType, setModalType] = useState('');

    const  callFriendHandler = () => {
        console.log("Calling...");
    };

    const startBlockingFriendHandler = () =>{
        setStartBlocking(true);
        slidingOptionsRef.current?.closeOpened();
    };
    const blockFriendHandler = () =>{
        setStartBlocking(false);
        setToastMessage("Blocked Friend!");
    };

    const startDeleteFriendHandler = (friendId: string) =>{
        setStartDeleting(true);
        slidingOptionsRef.current?.closeOpened();
        const friend = friendsCtx.friends.find(f => f.id === friendId);
        setSelectedFriend(friend);
    };
    const deleteFriendHandler = (friendId: string) => {
        setStartDeleting(false);
        setToastMessage("Deleted Friend!");
        friendsCtx.deleteFriend(friendId);
    };    

    const startAddFriendHandler = () => {
        setModalType("Add");
        console.log("adding friend....");
        setIsEditing(true);
        setSelectedFriend(null);
    };

    const saveFriendsHandler = () => {
        const enteredName = nameRef.current!.value;
        if(!enteredName) return;
        if(selectedFriend === null){
            friendsCtx.addFriend(enteredName.toString(), '');
        }
        else{
            friendsCtx.updateFriend(selectedFriend!.id.toString(), enteredName.toString(), selectedFriend!.photo.toString())
        }
        setIsEditing(false);
    };

    const startEditFriendHandler = (friendId: string) =>{
        slidingOptionsRef.current?.closeOpened();
        setModalType("Edit");
        console.log("Editing...");
        const friend = friendsCtx.friends.find(f => f.id === friendId);
        setSelectedFriend(friend);
        setIsEditing(true);
    };

    const cancelEditFriendHandler = () =>{
        setIsEditing(false);
    };

    return(
        <React.Fragment>
            <IonAlert   isOpen={startDeleting}
                        header='Are you sure?'
                        message='Do you want to delete your friend? This cannot be undone.' 
                        buttons={[
                            {text: 'No', role: 'cancel', handler: () => {setStartDeleting(false)}},
                            {text: 'Yes', handler: () => {deleteFriendHandler(selectedFriend!.id.toString())}}
                        ]} />
            
            <IonAlert   isOpen={startBlocking}
                        header='Are you sure?'
                        message='Do you want to Block your friend? This cannot be undone.' 
                        buttons={[
                            {text: 'No', role: 'cancel', handler: () => {setStartBlocking(false)}},
                            {text: 'Yes', handler: blockFriendHandler}
                        ]} />
            
            <IonToast   isOpen={!!toastMessage}
                        message={toastMessage}
                        duration={2000}
                        onDidDismiss={() => {setToastMessage("")}}/>

            <IonModal isOpen={isEditing}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle className="ion-text-center">
                            {modalType === 'Edit'? "Edit Current Friend" : "Add New Friend"}
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Friend Name</IonLabel>
                                    <IonInput type="text" value={selectedFriend?.name} ref={nameRef} />
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow className="ion-text-center">
                            <IonCol>
                                <IonButton fill="clear" color="dark" onClick={cancelEditFriendHandler}>Cancel</IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton color="secondary" expand="block" onClick={saveFriendsHandler}>Save</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonModal>
            
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        {!isPlatform("android") && (
                            <IonButtons slot="end">
                                <IonButton onClick={startAddFriendHandler}>
                                    <IonIcon icon={addOutline} />
                                </IonButton>
                            </IonButtons>
                        )}
                        <IonTitle>Meet</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        {/* {FRIENDS_DATA.map(friend =>} ( */}
                        {friendsCtx.friends.map(friend => (
                            <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
                                <IonItemOptions side="start">
                                    <IonItemOption color="danger" onClick={startBlockingFriendHandler}>
                                        <IonIcon slot="icon-only" icon={ban} />
                                    </IonItemOption>
                                    <IonItemOption color="warning" onClick={startDeleteFriendHandler.bind(null, friend.id)}>
                                        <IonIcon slot="icon-only" icon={trash} />
                                    </IonItemOption>
                                </IonItemOptions>
                                <IonItemOptions side="end">
                                    <IonItemOption color="success" onClick={startEditFriendHandler.bind(null, friend.id)}>
                                        <IonIcon slot="icon-only" icon={create} />
                                    </IonItemOption>
                                </IonItemOptions>
                                <IonItem lines="full" button onClick={callFriendHandler}>
                                    <IonThumbnail slot="start"><img src={friend.photo} /></IonThumbnail>
                                    <IonLabel>{friend.name}</IonLabel>
                                </IonItem>
                            </IonItemSliding>
                        ))}
                    </IonList>
                    {isPlatform("android") && (
                        <IonFab horizontal="end" vertical="bottom" slot="fixed">
                            <IonFabButton color="secondary" onClick={startAddFriendHandler}>
                                <IonIcon icon={addOutline} />
                            </IonFabButton>
                        </IonFab>
                    )}
                </IonContent>
            </IonPage>
        </React.Fragment>
    );
};

export default Meet;
