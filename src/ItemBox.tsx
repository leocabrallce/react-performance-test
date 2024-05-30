import { IoIosClose } from "react-icons/io";
import { Item } from "./getRandomItem";
import { memo } from "react";

interface ItemBoxProps {
  item: Item;
  onRemove: (item: Item) => void;
}

export const ItemBox = memo(({ item, onRemove }: ItemBoxProps) => {
  console.log("item", item.word);
  return (
    <div style={{ background: item.background }}>
      <h3>{item.word}</h3>
      <button onClick={() => onRemove(item)}>
        <IoIosClose
          onClick={() => onRemove(item)}
          className="icon-remove"
          size="2.5em"
        />
      </button>
    </div>
  );
});
