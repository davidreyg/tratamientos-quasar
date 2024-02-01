export function flatArrayByID<T extends { id: string }>(data: T[]) {
  return data.map((x) => x.id);
}

export function flatArrayByKey<T>(data: T[], key: string): string[] {
  return data
    .map((el) => {
      const valorRowKey = (el as Record<string, unknown>)[key];

      if (valorRowKey !== undefined) {
        return valorRowKey;
      } else {
        return null;
      }
    })
    .filter((element) => {
      return element !== null;
    }) as string[];
}
