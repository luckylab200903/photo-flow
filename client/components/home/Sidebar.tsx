import Connections from "./Connections";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import SearchBar from "../SearchBar";

const Sidebar = () => {
  return (
    <div className="bg-light px-8 w-[36rem] hidden md:block">
      <ScrollArea>
        <SearchBar />
        <Connections />
      </ScrollArea>
    </div>
  );
};
export default Sidebar;

