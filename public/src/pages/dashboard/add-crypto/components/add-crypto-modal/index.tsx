import { Modal } from "@/components/Modal";
import React, { useState, FormEvent } from "react";
import { AddCryptoForm } from "./components/add-crypto-form";
import { AddCryptoModalProps } from "./interfaces";
import { AddCryptoFormData } from "./components/add-crypto-form/interfaces";

export const AddCryptoModal: React.FC<AddCryptoModalProps> = ({
  isModalOpen,
  newCrypto,
  platforms,
  onToggleModal,
  onSubmit,
}) => {
  const [formState, setFormState] = useState<AddCryptoFormData>({
    investedValue: 0,
    cryptoValue: 0,
    platform: "",
  });

  const handleInputChange = (
    field: keyof AddCryptoFormData,
    value: string | number
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onAction={(action) => {
        if (action === "confirm") {
          handleSubmit(new Event("submit") as any);
        } else {
          onToggleModal();
        }
      }}
      title={`Adicionar Criptomoeda (${newCrypto})`}
    >
      <AddCryptoForm
        platforms={platforms}
        formState={formState}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};
