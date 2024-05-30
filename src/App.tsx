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

  const removeItem = (itemToRemove: Item) => {
    setItems((items) => items.filter((item) => item !== itemToRemove));
  };

  return (
    <>
      <div className="content">
        {items.map((item) => (
          <ItemBox key={item.id} item={item} onRemove={removeItem} />
        ))}
      </div>
      <button className="fab" onClick={addItem}>
        +
      </button>
    </>
  );
};

export default App;
