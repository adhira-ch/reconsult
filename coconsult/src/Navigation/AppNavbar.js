import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logo_text from '../art_assets/logo_text.png'
import avatar from '../art_assets/avatar_1.png'
import coconsult from '../art_assets/coconsult.png'
import partner from '../art_assets/partner_2.png'

const navigation = [
  { name: 'Login', href: '#', current: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavbarDefault() {
  return (
    <Disclosure as="nav" className="bg-one rounded-2xl h-25 shadow-white/[0.1] shadow-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-8 lg:px-12" style={{ fontSize: '1.5vw' }}>
            <div className="relative flex h-28 items-center justify-between">
              <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start h-20 w-auto p-3">
                <div className="flex flex-shrink-0 items-center">
                  <img
                  className='w-1/3'
                  src={partner}
                  ></img>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-one text-lg focus:outline-none focus:ring-2 focus:ring-one">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">User Menu</span>
                      <img
                        className="h-16 w-16 rounded-full bg-three"
                        src={avatar}
                        alt="Profile"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-3xl bg-three py-1 shadow-2xl ring-1 ring-white ring-opacity-5 focus:outline-none font-vango p-3">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/journal"
                            className={classNames(active ? 'bg-two rounded-full hover:text-white' : '', 'block px-5 py-5 text-lg text-one font-vango hover:text-white rounded-full')}
                          >
                           My Clients
                          </a>
                          
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/"
                            className={classNames(active ? 'bg-two rounded-full hover:text-white' : '', 'block px-5 py-5 text-lg text-one font-vango hover:text-white rounded-full')}
                          >
                           Login
                          </a>
                          
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden bg-teal-400 w-full rounded-lg">
  <div className="space-y-1 px-4 py-2 rounded-full">
    {navigation.map((item) => (
      <Disclosure.Button
        key={item.name}
        as="a"
        href={item.href}
        className={classNames(
          item.current ? 'bg-two text-white font-vango hover:text-white' : 'text-white hover:bg-one font-vango hover:text-white',
          'block rounded-full px-5 py-2 text-lg font-vango w-full text-center hover:text-white'
        )}
        aria-current={item.current ? 'page' : undefined}
      >
        {item.name}
      </Disclosure.Button>
    ))}
  </div>
</Disclosure.Panel>

        </>
      )}
    </Disclosure>
  )
}
