import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

const ButtonConnect = () => {
  return (
    <ConnectButton
      showBalance={true}
      accountStatus={"avatar"}
      chainStatus={"none"}
    />
  );
};

export default ButtonConnect;
