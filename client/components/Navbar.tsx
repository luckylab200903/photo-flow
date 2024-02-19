import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = ({ className }: { className: string }) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex px-5 py-3 drop-shadow-[-0_-5px_35px_rgba(0,0,0,0.15)] w-screen justify-around bg-light md:flex-col md:w-20 md:h-screen md:items-center md:justify-center md:gap-12",
        className,
      )}
    >
      {pathname === "/" ? (
        <div className={activeTabStyle}>
          <Icons.home
            className={cn(
              tabStyle,
              "fill-surface md:fill-none md:text-overlay",
            )}
          />
          <p className={activeTabText}>Home</p>
        </div>
      ) : (
        <Link className={linkStyle} href="/">
          <Icons.home
            className={cn(
              tabStyle,
              "fill-surface md:fill-none md:text-overlay",
            )}
          />
        </Link>
      )}
      {pathname === "/search" ? (
        <div className={activeTabStyle}>
          <Icons.search
            className={cn(
              tabStyle,
              "fill-surface md:fill-none md:text-overlay",
            )}
          />
          Home
        </div>
      ) : (
        <Link className={linkStyle} href="/search">
          <Icons.search className={cn(tabStyle)} />
        </Link>
      )}
      {pathname === "/addpost" ? (
        <div className={activeTabStyle}>
          <Icons.add
            className={cn(
              tabStyle,
              "fill-surface md:fill-none md:text-overlay",
            )}
          />
          Home
        </div>
      ) : (
        <Link className={linkStyle} href="/addpost">
          <Icons.add className={cn(tabStyle)} />
        </Link>
      )}
      {pathname === "/chat" ? (
        <div className={activeTabStyle}>
          <Icons.home
            className={cn(
              tabStyle,
              "fill-surface md:fill-none md:text-overlay",
            )}
          />
          Home
        </div>
      ) : (
        <Link className={linkStyle} href="/chat">
          <Icons.chat className={cn(tabStyle)} />
        </Link>
      )}
      {pathname === "/user" ? (
        <div className={activeTabStyle}>
          <Icons.home
            className={cn(
              tabStyle,
              "fill-surface md:fill-none md:text-overlay",
            )}
          />
          Home
        </div>
      ) : (
        <Link className={linkStyle} href="/user">
          <Icons.user className={cn(tabStyle, "pl-1")} />
        </Link>
      )}
    </div>
  );
};
export default Navbar;

const tabStyle = "w-7 fill-none";
const activeTabStyle =
  "flex gap-2 items-center fill-surface bg-overlay rounded-full px-4 text-surface font-bold md:bg-surface md:p-3 md:border-4 md:border-overlay";
const activeTabText = "md:hidden";
const linkStyle = "md:bg-overlay md:rounded-full md:p-3 p-1";
