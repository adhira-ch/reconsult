import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import memories from '../art_assets/memories.png'
import logo from '../art_assets/logo_sprite.png'
import cam from '../art_assets/scrapbook_1.png'
import palette from '../art_assets/palette.png'
import app_title from '../art_assets/app_title.png'

const navigation = [
  { name: 'Login', href: '#', current: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MainAppNavbar() {
  return (
    <Disclosure as="nav" className="bg-transparent rounded-3xl h-25">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-8 lg:px-12" style={{ fontSize: '1.5vw' }}>
            <div className="relative flex h-28 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start h-20 w-auto">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-32 mr-3"
                    src={palette}
                    alt="van.Go"
                  />
                  <img
                    className="h-auto w-full"
                    src={app_title}
                    alt="van.Go"
                    style={{ maxWidth: '18vw' }}
                  />
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className='text-white pl-12 pr-3'>abhipi</div>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-teal-600 text-lg focus:outline-none focus:ring-2 focus:ring-pink-600">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">User Menu</span>
                      <img
                        className="h-20 w-20 rounded-full"
                        src={logo}
                        alt="Profile"
                        style={{ maxWidth: '15vw' }}
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-3xl bg-pink-600 py-1 shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none font-vango">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/journal"
                            className={classNames(active ? 'bg-pink-400 rounded-full hover:text-white' : '', 'block px-5 py-5 text-lg text-white font-vango hover:text-white rounded-full')}
                          >
                           My Memories
                          </a>
                          
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/"
                            className={classNames(active ? 'bg-pink-400 rounded-full hover:text-white' : '', 'block px-5 py-5 text-lg text-white font-vango hover:text-white rounded-full')}
                          >
                           Logout
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
          item.current ? 'bg-teal-600 text-white font-vango hover:text-white' : 'text-white hover:bg-pink-600 font-vango hover:text-white',
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
