import { useCallback, useState, useRef, useEffect } from "react";
import { ItemBox } from "./ItemBox";
import { getRandomItem, Item } from "./getRandomItem";
import { useVirtualizer } from '@tanstack/react-virtual';
import { useInfiniteQuery } from "react-query";


async function fetchItems(limit: number, offset: number = 0,): Promise<{ rows: Item[]; nextOffset: number; }> {
  const rows: Item[] = Array.from({ length: limit }, () => getRandomItem());

  await new Promise((r) => setTimeout(r, 500));

  return { rows, nextOffset: offset + 1 };
}

export const App = () => {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('projects', (ctx) => fetchItems(10, ctx.pageParam),
    {
      getNextPageParam: (_lastGroup, groups) => groups.length,
    },
  );

  const parentRef = useRef<HTMLDivElement>(null);

  const loadedItems = data ? data.pages.flatMap((d) => d.rows) : [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? loadedItems.length + 1 : loadedItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= loadedItems.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    loadedItems.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

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

  if (status === 'loading' && !data) {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <span>Error: {(error as Error).message}</span>;
  }

  return (
    <>
      <div ref={parentRef} className="content">
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const isLoaderRow = virtualItem.index > loadedItems.length - 1;
          const item = loadedItems[virtualItem.index];

          if (isLoaderRow && hasNextPage) {
            return 'Loading more...';
          }

          if (isLoaderRow && !hasNextPage) {
            return 'Nothing more to load';
          }

          return (
            <ItemBox key={virtualItem.key} item={item} onRemove={removeItem} />
          );
        })}
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
