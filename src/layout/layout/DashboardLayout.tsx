import { useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { paths } from '../../types'
import { SubMenu } from '../../ui'

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
        path: `/${paths.ROOT}/${paths.DASHBOARD}/${paths.MY_JOB_REQUEST}`,
        isActive: location.pathname.includes(paths.MY_JOB_REQUEST),
      },
      {
        label: 'Job Postings',
        isActive: location.pathname.includes(paths.JOB_POSTING),
      },
      {
        label: 'Requests',
        isActive: location.pathname.includes(paths.REQUEST_DETAIL),
      },
    ]
  }, [location])

  return (
    <>
      <SubMenu subMenuItem={dashboardLinks}/>
      <Outlet />
    </>
  )
}
