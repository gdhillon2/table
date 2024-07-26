import Container from "../components/Container";
import EntryForm from "../components/EntryForm";
import Modal from "../components/Modal";
import Table from "../components/Table";
import TableHeader from "../components/TableHeader";
import { ShoppingItem } from "../types/shoppingItem";
import { useState, useEffect } from "react";

const Index: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ShoppingItem | null>(null);

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

  const openModal = (item: ShoppingItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <div className="text-white text-3xl">inventory</div>
      <EntryForm fetchData={fetchData} />
      <TableHeader />
      <Container>
        <Table items={items} fetchData={fetchData} onEdit={openModal} />
      </Container>
      <Modal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={closeModal}
        fetchData={fetchData}
      />
    </>
  );
};

export default Index;
