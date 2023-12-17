import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Divider } from "@mantine/core";
const Header = ({ containerClass = "" }) => {
  const location = useLocation();
  const headerLinks = useMemo(() => {
    return [
      {
        label: "Home",
        path: "/dashboard/profile",
        isActive: location.pathname.includes("/dashboard"),
      },
      {
        label: "Search",
        path: "/search",
        isActive: location.pathname.includes("/search"),
      },
      {
        label: "Reporting",
        path: "/reporting",
        isActive: location.pathname.includes("/reporting"),
      },
      {
        label: "Logout",
        path: "/logout",
        isActive: false,
      },
    ];
  }, [location]);
  return (
    <header className={containerClass + " w-full h-12 bg-white"}>
      <div className="w-full flex">
        {headerLinks.map((link, index) => (
          <>
            <Link
              to={link.path}
              className={
                index === 0
                  ? "mr-4"
                  : index === headerLinks.length - 1
                  ? "ml-4"
                  : "mx-4"
              }
            >
              <p
                className={
                  "text-lg text-black " +
                  (link.isActive ? "font-bold" : "text-purple-800")
                }
              >
                {link.label}
              </p>
            </Link>
            {index !== headerLinks.length - 1 && (
              <Divider orientation="vertical" />
            )}
          </>
        ))}
      </div>
      <Divider my="md" />
    </header>
  );
};

export default Header;
