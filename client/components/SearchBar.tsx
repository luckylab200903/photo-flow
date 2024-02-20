import { Input } from "./ui/input";
import { Button } from './ui/button';
import { Icons } from './ui/icons';

const SearchBar = (
) => {
  return (
    <div className="flex items-center justify-between relative mt-2 w-full pb-4 md:py-2">
      <Input
      className="text-surface placeholder-muted pr-12"
      placeholder="Search for people, groups, and messages"
      />
      <Button variant="ghost" className="absolute -right-1">
        <Icons.search className="w-7 stroke-surface"/>
      </Button>
    </div>
  );
};
export default SearchBar;
