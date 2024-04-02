import { Divider } from '@mantine/core'
import { Fragment, useMemo } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { paths } from '../../types'

export const DashboardLayout = () => {
  const location = useLocation()
  const dashboardLinks = useMemo(() => {
    return [
      {
        label: 'My Profile',
        path: `/${paths.ROOT}/${paths.DASHBOARD}/${paths.PROFILE}`,
        isActive: location.pathname.includes(paths.PROFILE),
      },
      {
        label: 'My Job Postings',
        path: `/${paths.ROOT}/${paths.DASHBOARD}/${paths.MY_JOB_POSTING}`,
        isActive: location.pathname.includes(paths.MY_JOB_POSTING),
      },
      {
        label: 'My Job Requests',
        path: `/${paths.ROOT}/${paths.DASHBOARD}/${paths.JOB_REQUEST}`,
        isActive: location.pathname.includes(paths.JOB_REQUEST),
      },
      {
        label: 'Job Postings',
        isActive: location.pathname.includes(paths.JOB_POSTING),
      },
    ]
  }, [location])

  return (
    <>
      <div className="w-full flex mt-4 px-16">
        {dashboardLinks.map((link, index) => (
          <Fragment key={index}>
            <Link
              to={link.path}
              className={
                index === 0
                  ? 'mr-4'
                  : index === dashboardLinks.length - 1
                  ? 'ml-4'
                  : 'mx-4'
              }
            >
              <p
                className={`text-lg ${
                  link.isActive
                    ? 'text-black font-bold'
                    : 'text-purple-800 font-normal'
                }`}
              >
                {link.label}
              </p>
            </Link>
            {index !== dashboardLinks.length - 1 && (
              <Divider orientation="vertical" />
            )}
          </Fragment>
        ))}
      </div>
      <Outlet />
    </>
  )
}
