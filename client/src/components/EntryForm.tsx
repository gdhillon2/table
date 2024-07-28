import React, { useState, useRef, useEffect } from "react";

interface EntryFormProps {
  fetchData: () => Promise<void>;
}

const EntryForm: React.FC<EntryFormProps> = ({ fetchData }) => {
  const [item, setItem] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [example, setExample] = useState<string>("");

  const nameRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      if (document.activeElement === nameRef.current) {
        amountRef.current?.focus();
      } else if (document.activeElement === amountRef.current) {
        nameRef.current?.focus();
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (item === "") {
      setError("no item inputted");
    } else if (amount === "") {
      setError("no amount inputted");
    }
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
      <form
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        className="w-full"
      >
      <label className="text-slate-200">
        add an item
      </label>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:w-auto">
            <input
              id="item"
              placeholder="name"
              className="rounded w-full px-2 py-1 text-slate-100 bg-slate-700 sm:w-auto"
              ref={nameRef}
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:w-auto">
            <input
              id="amount"
              placeholder="amount"
              ref={amountRef}
              className="rounded w-full px-2 py-1 text-slate-100 bg-slate-700 sm:w-auto"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button className="text-slate-100 bg-slate-900 hover:bg-slate-400 hover:text-slate-900 py-1 px-2 rounded">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default EntryForm;
