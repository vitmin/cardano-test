import { Button } from "@mui/material";
import { useState } from "react";
import { isDeepStrictEqual } from "util";

export enum WalletType  {
  NONE,
  NAMI,
  CCVAULT,
  FLINT
}

export const Wallet = () => {
  const cardano = window?.cardano;

  const [walletType, setWalletType] = useState(WalletType.NONE);

  const isWalletAvailable = (walletType !== WalletType.NONE);

  const onRefreshWalletClick = async () => {
    if (cardano?.nami) {
      setWalletType(WalletType.NAMI);
    }
    else if (cardano?.ccvault) {
      setWalletType(WalletType.CCVAULT);
    }
    else if (cardano?.flint) {
      setWalletType(WalletType.FLINT);
    }
  }

  return (
    <div>
      {isWalletAvailable && (
        <p>
          Available wallet type: {walletType}
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



