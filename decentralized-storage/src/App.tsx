import React from "react";
import MetaMaskLogin from "./components/MetaMaskLogin";
import FileUpload from "./components/FileUpload";
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonApp } from "@ionic/react";


const App: React.FC = () => {
  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Decentralized File Storage</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="6" offsetMd="3">
              <MetaMaskLogin />
              <FileUpload />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonApp>
  )
}

export default App;