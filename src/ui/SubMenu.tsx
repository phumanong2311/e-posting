import { Divider } from "@mantine/core";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { SubMenuItem } from "../types/Menu";

interface SubMenuProps {
  subMenuItem: SubMenuItem[];
}

export const SubMenu = (subMenu: SubMenuProps) => {
  console.log('subMenu', subMenu);
  return (
    <div className="w-full flex mt-4 px-16">
      {subMenu.subMenuItem.map((link: SubMenuItem, index: number) => (
        <Fragment key={index}>
          <Link
            to={link.path ? link.path : ""}
            className={
              index === 0
                ? "mr-4"
                : index === subMenu.subMenuItem.length - 1
                ? "ml-4"
                : "mx-4"
            }
          >
            <p
              className={`text-lg ${
                link.isActive
                  ? "text-black font-bold"
                  : "text-purple-800 font-normal"
              }`}
            >
              {link.label}
            </p>
          </Link>
          {index !== subMenu.subMenuItem.length - 1 && <Divider orientation="vertical" />}
        </Fragment>
      ))}
    </div>
  );
};
