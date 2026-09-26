import CatExplorer from "./cat-explorer";
import { getCats } from "./get-cats";

export default async function Home() {
  const catList = await getCats();

  return <CatExplorer catList={catList} />;
}
