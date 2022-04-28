import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import { IonAvatar, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import './Home.css';
import "../firebaseConfig.ts";
import React, { useEffect, useRef, useState } from "react";
import { async } from "@firebase/util";

const Home: React.FC = () => {
  // useEffect(() => {
  //   const addData = async () => {
  //     try {
  //       const docRef = await addDoc(collection(db, "users"), {
  //         first: "Ada",
  //         last: "Lovelace",
  //         born: 1815
  //       });
  //       console.log("Document written with ID: ", docRef.id);
  //     }
  //     catch (e) {
  //       console.log("Error adding docuremnt :", e);
  //     }
  //   }
  //   addData();
  // })

  const nim = useRef<HTMLIonInputElement>(null);
  const nama = useRef<HTMLIonInputElement>(null);
  const prodi = useRef<HTMLIonInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileName, setFileName] = useState('');
  const storage = getStorage();
  const db = getFirestore();
  const [students, setStudents] = useState<Array<any>>([]);

  useEffect(() => {
    async function getData() {
      const querySnapshot = await getDocs(collection(db, "students"));
      console.log("querySnapshot:", querySnapshot);
      setStudents(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log('doc:', doc);
      });
    }
    getData();
  }, []);

  const fileChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target!.files![0]);
    setFileName(event.target!.files![0].name);
  }

  const addData = async (url: string) => {
    try {
      const docRef = await addDoc(collection(db, "students"), {
        nim: nim.current?.value,
        nama: nama.current?.value,
        prodi: prodi.current?.value,
        foto: fileName,
        fotoUrl: url
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const insertHandler = async () => {
    const storageRef = ref(storage, fileName);
    uploadBytes(storageRef, selectedFile as Blob).then(() => {
      console.log("Upload FIle Success");
      getDownloadURL(ref(storage, fileName)).then((url) => {
        addData(url);
      })
    })
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonLabel position="floating">NIM</IonLabel>
          <IonInput ref={nim}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Nama</IonLabel>
          <IonInput ref={nama}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Prodi</IonLabel>
          <IonInput ref={prodi}></IonInput>
        </IonItem>
        <IonItem>
          <input type="file" onChange={fileChangedHandler} />
        </IonItem>
        <IonButton onClick={insertHandler}>Simpan</IonButton>

        <IonList>
          {students.map(student => (
            <IonItem key={student.id}>
              <IonAvatar slot="start">
                <img src={student.fotoUrl} />
              </IonAvatar>
              <IonLabel>
                {student.nim}<br />
                {student.nama}<br />
                {student.prodi}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
