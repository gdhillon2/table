import React, { useState, useEffect } from "react";
import ShoppingItem from "../types/shoppingItem";

interface TableProps {
  items: ShoppingItem[];
  fetchData: () => Promise<void>;
  onEdit: (item: ShoppingItem) => void;
}

const Table: React.FC<TableProps> = ({ items, fetchData, onEdit }) => {
  const [error, setError] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<string>("");
  const [editAmount, setEditAmount] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (itemId: number) => {
    try {
      const response = await fetch(`/api/entries/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("network response not ok");
      }

      fetchData();
    } catch (error) {
      if (error instanceof Error) {
        setError("failed to delete item");
      }
    }
  };

  const handleEdit = (item: ShoppingItem) => {
    setEditingItemId(item.itemid);
    setEditItem(item.item);
    setEditAmount(item.amount);
  };

  const handleCancel = () => {
    setEditingItemId(null);
    setEditItem("");
    setEditAmount("");
  };

  const handleSave = async (itemId: number) => {
    try {
      const response = await fetch(`/api/entries/${itemId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ item: editItem, amount: editAmount }),
      });
      if (!response.ok) {
        throw new Error("network response was not ok");
      }
      setEditingItemId(null);
      fetchData();
    } catch (error) {
      if (error instanceof Error) {
        setError("couldn't save edited value");
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  return (
    <div className="text-md text-slate-100 bg-slate-500 rounded-br-lg h-[100%] rounded-bl-lg overflow-y-auto">
      {error && <p>{error}</p>}
      {items.length > 0 && (
        <div className="w-full">
          {items.map((item) => (
            <div
              key={item.itemid}
              className="flex justify-between transition-colors duration-500 items-center p-3 hover:bg-slate-400 hover:text-black"
            >
              {editingItemId === item.itemid ? (
                <>
                  <input
                    className="w-1/3 bg-slate-700 text-white p-1 rounded mr-2"
                    value={editItem}
                    onChange={(e) => setEditItem(e.target.value)}
                  />
                  <input
                    className="w-1/3 bg-slate-700 text-white p-1 rounded mr-2"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <span className="w-1/3 mr-2">{item.item}</span>
                  <span className="w-1/3 mr-2">{item.amount}</span>
                </>
              )}
              <span className="w-1/3">{formatDate(item.created)}</span>
              <span className="w-1/6 flex flex-col sm:flex-row gap-2">
                {editingItemId === item.itemid ? (
                  <>
                    <button
                      onClick={() => handleSave(item.itemid)}
                      className="bg-slate-100 hover:bg-slate-800 hover:text-white transition-colors duration-500 text-black text-xs p-2 rounded max-w-max"
                    >
                      save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-red-500 hover:bg-red-800 hover:text-white text-black transition-colors duration-500 text-xs p-2 rounded max-w-max"
                    >
                      cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-slate-100 hover:bg-slate-800 hover:text-white transition-colors duration-500 text-black text-xs p-2 rounded max-w-max"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.itemid)}
                      className="bg-red-500 hover:bg-red-800 hover:text-white text-black transition-colors duration-500 text-xs p-2 rounded max-w-max"
                    >
                      delete
                    </button>
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Table;
