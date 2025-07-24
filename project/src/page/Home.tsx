import { useEffect, useState } from 'react';
import { itemService } from '../services/itemService';
import type { Item } from '../types/item';
import { Form } from '../components/Form';
import { ItemList } from '../components/ItemList';

export const Home = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  // Fetch items on component mount
  useEffect(() => {
    itemService.getAll().then(setItems);
  }, []);

  const handleCreate = async (data: Omit<Item, 'id'>) => {
    const newItem = await itemService.create(data);
    setItems((prev) => [...prev, newItem]);
  };

  const handleUpdate = async (id: number, data: Omit<Item, 'id'>) => {
    const updated = await itemService.update(id, data);
    if (!updated) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? updated : item))
    );
    setEditingItem(null);
  };

  const handleDelete = async (id: number) => {
    const success = await itemService.delete(id);
    if (success) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleEditClick = (item: Item) => {
    setEditingItem(item);
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧠 React + TS CRUD</h1>
      
      <Form
        key={editingItem?.id || 'new'}
        onSubmit={
          editingItem
            ? (data) => handleUpdate(editingItem.id, data)
            : handleCreate
        }
        initialData={editingItem}
      />

      <hr className="my-6" />

      <ItemList
        items={items}
        onDelete={handleDelete}
        onEdit={handleEditClick}
      />
    </main>
  );
};
