import React, { useEffect, useState } from "react";
import { ShoppingItem } from "../types/shoppingItem";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ShoppingItem | null;
  fetchData: () => Promise<void>;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, item, fetchData }) => {
  const [itemName, setItemName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && item) {
      setItemName(item.item);
      setAmount(item.amount);
    }
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!item) {
      setError("no item to update!");
      return;
    }

    try {
      const response = await fetch(`api/entries/${item.itemid}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ item: itemName, amount }),
      });

      if (!response.ok) {
        throw new Error("network response was not ok");
      }
      const result = await response.json();
      console.log("success", result);
      fetchData();
      onClose();
    } catch (error) {
      setError("failed to update item");
    }
  };
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50 ${isOpen ? "visible" : "invisible"}`}
    >
      <div
        className={`bg-slate-500 shadow-2xl rounded-lg shadow-lg max-w-full sm:max-w-md w-full mx-4 sm:mx-auto transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <h2 className="text-xl mb-4 px-2 py-1 bg-slate-700 text-white rounded-tr-lg rounded-tl-lg">edit item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 px-2">
            <label className="block text-gray-700">name</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4 px-2">
            <label className="block text-gray-700">amount</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="p-3 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 transition-all duration-300 text-white p-2 rounded mr-2"
            >
              cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-800 transition-all duration-300 text-white p-2 rounded mr-2"
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
