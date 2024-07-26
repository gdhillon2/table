import React, { useState } from "react";
import Button from "./Button/Button";

interface EntryFormProps {
  fetchData: () => Promise<void>;
}

const EntryForm: React.FC<EntryFormProps> = ({ fetchData }) => {
  const [item, setItem] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("api/entries", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ item, amount }),
      });
      if (!response.ok) {
        throw new Error("network response not ok");
      }
      const result = await response.json();
      console.log("success", result);
      setItem("");
      setAmount("");

      await fetchData();
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="flex flex-col items-center my-3 space-y-2 w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto">
            <label
              htmlFor="item"
              className="sm:mr-4 text-gray-400"
              style={{ display: "inline-block" }}
            >
              name
            </label>
            <input
              id="item"
              className="rounded p-1 w-full sm:w-auto"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto">
            <label
              htmlFor="amount"
              className="sm:mr-4 text-gray-400"
              style={{ display: "inline-block" }}
            >
              amount
            </label>
            <input
              id="amount"
              className="rounded p-1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <Button icon="add" description="submit your entry" />
        </div>
      </form>
    </div>
  );
};

export default EntryForm;
