import { Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

export enum WalletType {
  NONE = "NONE",
  NAMI = "NAMI",
  CCVAULT = "CCVAULT",
  FLINT = "FLINT"
}

export enum NetworkType {
  NONE = "NONE",
  TESTNET = "TESTNET",
  MAINNET = "MAINNET"
}

export const Wallet = () => {
  const cardano = window?.cardano;

  const [walletType, setWalletType] = useState(WalletType.NONE);
  const [networkType, setNetworkType] = useState(NetworkType.NONE);
  const [wallet, setWallet] = useState<any>();
  const [walletApi, setWalletApi] = useState<any>();
  const [isWalletEnabled, setIsWalletEnabled] = useState(false);
  const [walletApiVersion, setWalletApiVersion] = useState("");
  const [walletName, setWalletName] = useState("");

  const isWalletAvailable = (!!wallet);

  useEffect(() => {
    const connectWallet = async () => {
      const api = await wallet.enable();
      const isEnabled = await wallet.isEnabled();
      setIsWalletEnabled(isEnabled);
      setWalletApi(isEnabled ? api : null);
      setWalletApiVersion(isEnabled ? wallet.apiVersion : "");
      setWalletName(isEnabled ? wallet.name : "");
    };

    if (wallet) {
      connectWallet();
    }
    else {
      setIsWalletEnabled(false);
    }
  }, [wallet]);

  useEffect(() => {
    const getNetworkId = async () => {
      if (!isWalletEnabled) {
        return;
      }

      try {
        const networkId = await walletApi.getNetworkId();
        if (networkId === 0) {
          setNetworkType(NetworkType.TESTNET)
        }
        else if (networkId === 1) {
          setNetworkType(NetworkType.TESTNET)
        }
        else {
          setNetworkType(NetworkType.NONE)
        }

      } catch (error) {
        console.log(error);
      }
    };

    getNetworkId();
  }, [walletApi, isWalletEnabled]);

  const onRefreshWalletClick = async () => {
    if (cardano?.nami) {
      setWalletType(WalletType.NAMI);
      setWallet(cardano.nami);
    }
    else if (cardano?.ccvault) {
      setWalletType(WalletType.CCVAULT);
      setWallet(cardano.ccvault);
    }
    else if (cardano?.flint) {
      setWalletType(WalletType.FLINT);
      setWallet(cardano.flint);
    }
  }

  return (
    <div>
      {isWalletAvailable && (
        <p>
          Available wallet type: {walletType}
          <br />
          Enabled: { isWalletEnabled ? "Yes" : "No" }
          <br />
          API Version: { walletApiVersion }
          <br />
          Wallet Name: { walletName }
          <br />
          Network Type: { networkType }
        </p>
      )}
      {!isWalletAvailable && (
        <p>
          No Wallet is available.
        </p>
      )}

      <br />
      <Button
        variant="text"
        onClick={onRefreshWalletClick}
      >Refresh Wallet</Button>
    </div>
  );
}



