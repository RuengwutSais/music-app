"use client";

import { useEffect, useState } from "react";
import AuthModal from "@/components/authmodal";
import UploadModal from "@/components/uploadmodal";
import SubscriptionModal from "@/components/subscriptionModal";
import { ProductWithPrice } from "@/types";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({
  products
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <SubscriptionModal products={products} />
      <UploadModal />
    </>
  );
}

export default ModalProvider;