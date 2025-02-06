import { useState, useEffect } from 'react';
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { IonButton, IonCard, IonCardContent, IonText, IonIcon } from "@ionic/react";
import { walletOutline } from "ionicons/icons";




const MetaMaskLogin = () => {
    const [account, setAccount] = useState<string | null>(null);

    useEffect(() => {
        const checkWallet = async () => {
            const provider = await detectEthereumProvider();
            if (provider) {
                const accounts = await (window as any).ethereum.request({ method: "eth_accounts" });
                if (accounts.length > 0) setAccount(accounts[0]);
            }
        }
        checkWallet();
    }, []);

    const connectWallet = async () => {
        try {
            const provider = await detectEthereumProvider();
            if (!provider) throw new Error("MetaMask not installed");

            const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]);
        } catch (error) {
            console.error("Wallet connection failed", error);
        }
    };

    return (
        <IonCard>
            <IonCardContent className="ion-text-center">
                {account ? (
                    <IonText color="success"> <p> Connected: {account}</p> </IonText>
                ) : (
                    <IonButton expand="full" onClick={connectWallet}><IonIcon slot="start" icon={walletOutline} /> Connect MetaMask
                    </IonButton>
                )}
            </IonCardContent>
        </IonCard>
    )
}

export default MetaMaskLogin;