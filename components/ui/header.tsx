import Image from "next/image";
import placeHolderImage from "../../public/assets/images/avatar.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import SignOutBtn from "./sign-out-btn";

export default function Header() {
  return (
    <div className="w-full px-2 lg:px-4 py-4 flex justify-between items-center">
      <h2 className="font-semibold text-xl lg:text-2xl">POS Model</h2>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              src={placeHolderImage}
              alt="logo"
              height={40}
              width={40}
              className="rounded-full aspect-square object-contain"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Niraj</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOutBtn />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
