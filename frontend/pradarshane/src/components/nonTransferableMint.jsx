import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const NonTransferableTokenMintPage = () => {
  const { address } = useParams();
  return <div>{address}</div>;
};

export default NonTransferableTokenMintPage;
