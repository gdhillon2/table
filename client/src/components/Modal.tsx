import React, { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  fetchData: () => Promise<void>;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, item, fetchData }) => {
  if (!isOpen) return null;

  const [itemName, setItemName] = useState<string>(item.item);
  const [amount, setAmount] = useState<string>(item.amount);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("api/entries", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ itemName, amount }),
      });

      if (!response.ok) {
        throw new Error("network response was not ok");
      }
      const result = await response.json();
      console.log("success", result);

      onClose();
    } catch (error) {
      setError("failed to update item");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-full sm:max-w-md w-full mx-4 sm:mx-auto">
        <h2 className="text-xl mb-4">edit item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">name</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">amount</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded mr-2"
            >
              cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
