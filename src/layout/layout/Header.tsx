import { Fragment, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Divider } from "@mantine/core";
export const Header = ({ containerClass = "" }) => {
  const location = useLocation();
  const headerLinks = useMemo(() => {
    return [
      {
        label: "Home",
        path: "/admin/dashboard/profile",
        isActive: location.pathname.includes("/dashboard"),
      },
      {
        label: "Search",
        path: "/admin/search",
        isActive: location.pathname.includes("/search"),
      },
      {
        label: "Reporting",
        path: "/admin/reporting",
        isActive: location.pathname.includes("/reporting"),
      },
      {
        label: "Logout",
        path: "/logout",
        isActive: false,
      },
    ];
  }, [location]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };
  return (
    <header className={containerClass + " w-full h-12 bg-white"}>
      <div className="w-full flex">
        {headerLinks.map((link, index) => (
          <Fragment key={index}>
            {index !== headerLinks.length - 1 ? (
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
            ) : (
              <p
                className={
                  "text-lg text-black ml-4 cursor-pointer " +
                  (link.isActive ? "font-bold" : "text-purple-800")
                }
                onClick={() => {
                  logout();
                }}
              >
                {link.label}
              </p>
            )}
            {index !== headerLinks.length - 1 && (
              <Divider orientation="vertical" />
            )}
          </Fragment>
        ))}
      </div>
      <Divider my="md" />
    </header>
  );
};
