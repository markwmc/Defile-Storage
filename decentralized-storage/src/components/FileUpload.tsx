import { useState } from "react";
import { create } from "ipfs-http-client";
import { IonButton, IonCard, IonCardContent, IonIcon, IonText, IonSpinner } from "@ionic/react";
import { cloudUploadOutline } from "ionicons/icons";

const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });

const FileUpload = () => {
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const added = await client.add(file);
            setFileUrl(`https://ipfs.io/ipfs/${added.path}`);
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setUploading(false);
        }
    }


    return (
        <IonCard>
            <IonCardContent className="ion-text-center">
                <input type="file" id="fileUpload" hidden onChange={uploadFile} />
                <IonButton expand="full" onClick={() => document.getElementById("fileUpload")?.click()}>
                    <IonIcon slot="start" icon={cloudUploadOutline} />
                    Upload File
                </IonButton>
                {uploading && <IonSpinner />}
                {fileUrl && (<IonText color="success"> <p>File Uploaded: <a href={fileUrl} target="_blank" rel="noopener noreferrer">View File</a></p>
                </IonText>
                )}
            </IonCardContent>
        </IonCard>
    );
};
export default FileUpload;