export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export async function getData(): Promise<IProduct[] | undefined> {
  const url = "https://fakestoreapi.com/products";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json: IProduct[] = await response.json();
    return json;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
}
