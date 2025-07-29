import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { Link } from "react-router-dom";

export const Menu = ({ navigation }) => {
  return (
    <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
      <div className="flex h-full space-x-8">
        {navigation &&
          navigation.pages.map((page) => (
            <Link
              key={page.name}
              to={page.href}
              className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              {page.name}
            </Link>
          ))}
      </div>
    </PopoverGroup>
  );
};
