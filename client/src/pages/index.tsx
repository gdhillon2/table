import EntryForm from "../components/EntryForm";
import Table from "../components/Table";
import TableHeader from "../components/TableHeader";
import { ShoppingItem } from "../types/shoppingItem";
import { useState, useEffect } from "react";

const Index: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/entries");
      if (!response.ok) {
        throw new Error("network response not ok");
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    () => fetchData();
  }, []);

  return (
    <div>
      <div className="text-white text-5xl">inventory list</div>
      <EntryForm fetchData={fetchData} />
      <div className="h-[60vh]">
        <TableHeader />
        <Table items={items} fetchData={fetchData} />
      </div>
    </div>
  );
};

export default Index;
