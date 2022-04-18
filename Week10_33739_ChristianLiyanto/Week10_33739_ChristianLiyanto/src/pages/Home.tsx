import { IonAvatar, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import axios, { AxiosResponse } from "axios";
import { LOCALHOST } from '../App';
import './Home.css';

const Home: React.FC = () => {
  const [data, setData] = useState('');
  const url = LOCALHOST + "insert_new_student.php";
  const nim = useRef<HTMLIonInputElement>(null);
  const nama = useRef<HTMLIonInputElement>(null);
  const prodi = useRef<HTMLIonInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File>();

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target!.files![0]);
  };

  const insertHandler = () => {
    const formData = new FormData();

    const inNim = nim.current?.value as string;
    const inNama = nama.current?.value as string;
    const inProdi = prodi.current?.value as string;

    formData.append('nim', inNim);
    formData.append('nama', inNama);
    formData.append('prodi', inProdi);
    formData.append('foto', selectedFile as File);

    // fetch(url, {
    //     method: "post",
    //     body: formData
    // }).then(response => response.text()).then((data) => {
    //     setData(data);
    //     console.log(data);
    // });

    axios.post(url, formData).then(res => {
      console.log(res);
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonItem lines="full">
          <IonLabel position="floating">NIM</IonLabel>
          <IonInput ref={nim}></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">Nama</IonLabel>
          <IonInput ref={nama}></IonInput>
        </IonItem>

        <IonItem lines="full">
          <IonLabel position="floating">Program Studi</IonLabel>
          <IonInput ref={prodi}></IonInput>
        </IonItem>

        <IonItem lines="full">
          <input type="file" onChange={fileChangeHandler} />
        </IonItem>

        <div className="ion-text-center ion-padding-top">
          <IonButton onClick={insertHandler}>Simpan</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
