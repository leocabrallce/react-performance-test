import { useCallback, useState } from "react";
import { ItemBox } from "./ItemBox";
import { getRandomItem, Item } from "./getRandomItem";

export const App = () => {
  const [items, setItems] = useState(() =>
    Array.from({ length: 1000 }, () => getRandomItem()),
  );

  const addItem = () => {
    setItems((items) => [getRandomItem()].concat(items));
  };

  const updateUnusedProperty = () => {
    setItems((items) => items.map((item) => ({ ...item, unusedProperty: Math.random() })));
  };

  const removeItem = useCallback((itemToRemove: Item) => {
    setItems((items) => items.filter((item) => item.id !== itemToRemove.id));
  }, []);

  return (
    <>
      <div className="content">
        {items.map((item) => (
          <ItemBox key={item.id} item={item} onRemove={removeItem} />
        ))}
      </div>
      <button className="fab left" onClick={addItem}>
        +
      </button>
      <button className="fab right" onClick={updateUnusedProperty}>
        ↻
      </button>
    </>
  );
};

export default App;
