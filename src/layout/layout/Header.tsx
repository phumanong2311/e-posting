import { Fragment, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Divider } from "@mantine/core";
import { paths } from "../../types";
export const Header = ({ containerClass = "" }) => {
  const location = useLocation();
  const headerLinks = useMemo(() => {
    return [
      {
        label: "Home",
        path: `/${paths.ROOT}/${paths.DASHBOARD}/${paths.PROFILE}`,
        isActive: location.pathname.includes(paths.DASHBOARD),
      },
      {
        label: "Search",
        path: `/${paths.ROOT}/${paths.SEARCH}`,
        isActive: location.pathname.includes(paths.SEARCH),
      },
      {
        label: "Reporting",
        path: `/${paths.ROOT}/${paths.REPORTING}`,
        isActive: location.pathname.includes(paths.REPORTING),
      },
      {
        label: "Logout",
        path: `/${paths.LOGOUT}`,
        isActive: false,
      },
    ];
  }, [location]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = `/${paths.LOGIN}`;
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
