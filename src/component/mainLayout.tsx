import {
  Flex,
  PanelHeader,
  PanelLayout,
  PanelSidebar,
  Sidebar,
  SidebarItem,
  Typography,
  ThemeChanger,
} from 'djuno-design'
import { ReactComponent as Logo } from './../assets/icons/logo2.svg'
import { ReactComponent as LogoTextIcon } from './../assets/icons/logo-text.svg'
import { ReactComponent as Wallet } from './../assets/icons/wallet.svg'

import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useMemo } from 'react'

const icons = { Wallet }

const MainLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // const theme = useTheme()

  // console.log('theme', theme)

  const handleSidebarNavigation = useCallback(
    (item: SidebarItem | undefined) => {
      const route = `${item?.link}`
      navigate(route)
    },
    [navigate],
  )

  const sidebarItems = useMemo(() => {
    return [
      {
        id: 'wallet',
        label: 'Wallet',
        icon: icons.Wallet,
        activeConditions: [
          {
            index: 0,
            value: undefined,
          },
        ],
        link: '/wallet',
        onClick: handleSidebarNavigation,
      },
      // {
      //     id: '',
      //     label: '',
      //     icon: ,
      //     activeConditions: [
      //         {
      //             index: 0,
      //             value: ''
      //         }
      //     ],
      //     link: '/',
      //     onClick: handleSidebarNavigation
      // },
    ]
  }, [handleSidebarNavigation])

  return (
    <div
      className=' bg-white dark:bg-[#1D2125]'
      style={{
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* <PanelLayout
        type='normal'
        pathname={location.pathname}
        // className=""
        renderSidebar={({ segments, ...sidebarProps }) => {
          // console.log(segments);
          return (
            <PanelSidebar
              {...sidebarProps}
              sidebarHeader={
                <Link to='/' className='flex items-center gap-1 px-5'>
                  <LogoTextIcon className='!h-9 ' />
                </Link>
              }
            >
              <Sidebar type='normal' items={sidebarItems} segments={segments} navItemHeight={38}>
                <Flex justify='center'></Flex>
              </Sidebar>
            </PanelSidebar>
          )
        }}
        renderHeader={(headerProps) => (
          <PanelHeader
            {...headerProps}
            mobileIcon={
              <Logo className='!w-[10px] !h-[10px] text-[#0074E4]' style={{ width: '25px', height: '25px' }} />
            }
          >
         
          </PanelHeader>
        )}
        enableGoToTopAfterScroll={true}
        enableGoToTopAfterChangeRoute={true}
      > */}
      <div
        className='!max-w-7xl !mx-auto !p-4 md:!p-5 lg:!p-8 !bg-white dark:!bg-[#1D2125]'
        id='main-container'
        style={{ margin: '20px' }}
      >
        <Outlet />
      </div>
      {/* </PanelLayout> */}
    </div>
  )
}

export default MainLayout
