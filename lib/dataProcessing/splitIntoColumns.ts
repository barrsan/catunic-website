type Columns<T> = Array<T[]>;

export function splitIntoColumns<ItemType>(
  data: ItemType[],
  columnsNumber: number,
) {
  const columns: Columns<ItemType> = new Array(columnsNumber)
    .fill(null)
    .map(() => []);

  data.forEach((item, index) => {
    const column = index % columnsNumber;
    columns[column].push(item);
  });

  return columns;
}
