import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Secure your application secrets with&nbsp;
          <code className="font-mono font-bold">pangea-cli</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <svg width="114" height="24" viewBox="0 0 114 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.72567 0.356201V3.84647C8.72567 4.18698 8.58096 4.50196 8.35962 4.67222L3.53283 8.21356C3.3796 8.32423 3.3796 8.5711 3.53283 8.69028L8.36813 12.2316C8.58947 12.3934 8.72567 12.7084 8.72567 13.0404V16.3774C8.72567 16.9563 8.24895 16.8796 7.86588 16.5987L0.289437 11.0483C0.110667 10.9207 0 10.6738 0 10.4014V6.48545C0 6.22156 0.110667 5.97468 0.280924 5.84699L8.06167 0.151892C8.35962 -0.0694421 8.72567 -0.0864672 8.72567 0.356201Z" fill="#29ADEB"></path><path d="M32.7667 17.5034H31.9495C30.1447 17.5034 28.8848 17.0267 28.1612 16.0647C27.4377 15.1113 27.3185 13.7322 27.7952 11.9275L29.4807 5.63647C29.966 3.83174 30.8258 2.45266 32.0601 1.49922C33.2945 0.537266 34.8183 0.0605469 36.6145 0.0605469H44.5144C45.0167 0.0605469 45.204 0.298907 45.0763 0.775627L40.7858 16.7798C40.6581 17.2565 40.3431 17.4949 39.8409 17.4949H36.972C36.4953 17.4949 36.3166 17.2565 36.4443 16.7798L36.7507 15.6476H36.6145C36.1974 16.2605 35.627 16.7287 34.9119 17.0352C34.1883 17.3502 33.4733 17.5034 32.7667 17.5034ZM37.9595 11.1358L39.8239 4.18928C39.892 3.94241 39.7898 3.81472 39.5174 3.81472H36.2995C35.5674 3.81472 35.0141 3.96795 34.6395 4.27441C34.2565 4.58087 33.9755 5.10016 33.7797 5.83226L32.2049 11.7146C32.0091 12.4468 32.0176 12.966 32.2304 13.2725C32.4432 13.579 32.9199 13.7322 33.6435 13.7322H34.9119C36.4783 13.7407 37.4913 12.8724 37.9595 11.1358Z" fill="currentColor"></path><path d="M47.6477 17.5046H44.7363C44.2596 17.5046 44.0808 17.2663 44.2085 16.7896L48.499 0.785392C48.6267 0.308673 48.9331 0.0703125 49.4099 0.0703125H52.3212C52.798 0.0703125 52.9767 0.308673 52.849 0.785392L52.5426 1.9176H52.6788C53.5131 0.683238 54.79 0.0703125 56.5266 0.0703125H57.6248C61.2002 0.0703125 62.4941 1.92611 61.4981 5.64623L58.5101 16.7981C58.3824 17.2748 58.0674 17.5132 57.5652 17.5132H54.6963C54.2196 17.5132 54.0408 17.2748 54.1685 16.7981L57.1055 5.85054C57.3013 5.11843 57.2842 4.59915 57.0629 4.29269C56.8416 3.98623 56.3563 3.83299 55.6327 3.83299H54.3984C52.8235 3.83299 51.802 4.7013 51.3423 6.42941L48.5671 16.7896C48.4309 17.2663 48.1244 17.5046 47.6477 17.5046Z" fill="currentColor"></path><path d="M67.9326 16.7124H66.8004C65.0468 16.7124 63.8465 16.2357 63.1995 15.2737C62.5525 14.3118 62.4759 12.9327 62.9611 11.1365L64.4339 5.62865C64.9191 3.82393 65.7789 2.44485 67.0133 1.49141C68.2476 0.529455 69.7714 0.0527344 71.5676 0.0527344H79.4676C79.9698 0.0527344 80.1571 0.291094 80.0294 0.767814L75.5176 17.6403C75.0409 19.4195 74.1811 20.79 72.9297 21.7435C71.6783 22.7054 70.1715 23.1822 68.3923 23.1822H61.8289C61.5565 23.1822 61.3777 23.1311 61.3096 23.0289C61.233 22.9268 61.233 22.748 61.3011 22.5011L61.9311 20.1431C62.0588 19.6663 62.3652 19.428 62.842 19.428H68.6903C69.4224 19.428 69.9757 19.2748 70.3673 18.9683C70.7589 18.6618 71.0483 18.1511 71.2356 17.4445L71.9337 14.8481H71.7975C71.3803 15.461 70.81 15.9292 70.0864 16.2527C69.3543 16.5592 68.6392 16.7124 67.9326 16.7124ZM73.1255 10.3533L74.777 4.19849C74.8451 3.95162 74.7429 3.82393 74.4705 3.82393H71.2527C70.5206 3.82393 69.9672 3.97716 69.5926 4.28362C69.2096 4.59009 68.9286 5.10937 68.7329 5.84148L67.3708 10.9407C67.175 11.6728 67.1835 12.1836 67.4048 12.4815C67.6177 12.7795 68.0944 12.9242 68.8265 12.9242H70.0949C71.6528 12.9157 72.6658 12.0644 73.1255 10.3533Z" fill="currentColor"></path><path d="M91.8382 17.5034H84.2787C82.474 17.5034 81.2141 17.0267 80.4905 16.0647C79.7669 15.1113 79.6478 13.7322 80.1245 11.9275L81.81 5.63647C82.2953 3.83174 83.1551 2.45266 84.3894 1.49922C85.6238 0.537266 87.1476 0.0605469 88.9438 0.0605469H91.6424C93.4471 0.0605469 94.707 0.537266 95.4306 1.49922C96.1542 2.46117 96.2734 3.84025 95.7881 5.63647L94.6219 9.97802C94.4942 10.4547 94.1877 10.6931 93.711 10.6931H85.13C84.8576 10.6931 84.6874 10.8208 84.6193 11.0677L84.415 11.8168C84.2277 12.5234 84.2447 13.0341 84.466 13.3406C84.6874 13.6471 85.1641 13.8003 85.8962 13.8003H92.8086C93.2854 13.8003 93.4556 14.0472 93.3279 14.5494L92.7235 16.8053C92.6554 17.0607 92.5618 17.231 92.4255 17.3331C92.3149 17.4523 92.1106 17.5034 91.8382 17.5034ZM85.9217 7.79022H90.5697C90.8166 7.79022 90.9784 7.66253 91.0465 7.41565L91.4891 5.77267C91.6849 5.04057 91.6764 4.5298 91.4551 4.23185C91.2338 3.9339 90.7655 3.78918 90.0334 3.78918H88.5948C87.8627 3.78918 87.3093 3.94241 86.9348 4.23185C86.5602 4.5298 86.2708 5.04057 86.075 5.77267L85.6323 7.41565C85.5812 7.66253 85.6749 7.79022 85.9217 7.79022Z" fill="currentColor"></path><path d="M101.652 17.5034H100.834C99.0296 17.5034 97.7697 17.0267 97.0461 16.0647C96.3225 15.1113 96.2033 13.7322 96.68 11.9275L98.3656 5.63647C98.8508 3.83174 99.7106 2.45266 100.945 1.49922C102.179 0.537266 103.703 0.0605469 105.499 0.0605469H113.399C113.902 0.0605469 114.089 0.298907 113.961 0.775627L109.671 16.7798C109.543 17.2565 109.228 17.4949 108.726 17.4949H105.857C105.38 17.4949 105.201 17.2565 105.329 16.7798L105.636 15.6476H105.499C105.082 16.2605 104.512 16.7287 103.797 17.0352C103.073 17.3502 102.358 17.5034 101.652 17.5034ZM106.844 11.1358L108.709 4.18928C108.777 3.94241 108.675 3.81472 108.402 3.81472H105.184C104.452 3.81472 103.899 3.96795 103.524 4.27441C103.141 4.58087 102.86 5.10016 102.665 5.83226L101.09 11.7146C100.894 12.4468 100.902 12.966 101.115 13.2725C101.328 13.579 101.805 13.7322 102.528 13.7322H103.797C105.363 13.7407 106.376 12.8724 106.844 11.1358Z" fill="currentColor"></path><path d="M25.8285 5.84929L18.0478 0.154188C17.9541 0.0860851 17.8945 0.0605469 17.7668 0.0605469H15.6046C15.1193 0.0605469 14.6171 0.452138 14.4809 0.945884L8.74321 22.3557C8.62403 22.8154 8.89645 23.1815 9.34763 23.1815H12.0292C12.4889 23.1815 12.9571 22.8069 13.0848 22.3557L13.4168 21.1214L14.8214 15.8774L15.9281 11.7572L17.7158 5.0661C17.7583 4.89585 17.9626 4.82775 18.0988 4.9299L22.5766 8.20735C22.7383 8.32653 22.7383 8.56489 22.5766 8.68407L17.7413 12.2254C17.52 12.3872 17.3838 12.6936 17.3838 13.0341V16.3712C17.3838 16.9501 17.8605 16.8734 18.2436 16.5925L25.82 11.0421C25.9988 10.9144 26.1094 10.6676 26.1094 10.3952V6.48775C26.1094 6.22385 25.9988 5.97698 25.8285 5.84929Z" fill="currentColor"></path></svg>
          </a>
        </div>
      </div>

      <div className="container flex flex-col place-items-center my-auto before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full  before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <h1 className='text-6xl font-bold  text-center py-2'>Secret Keys Loaded into Your Runtime {process.env.NEXT_PUBLIC_EMOJI}</h1>
        <p className='text-lg font-light shrink  text-center py-8'>The secrets-cli tool pulls your secrets from the super-secure Pangea vault and loads it into the runtime environment.<br />No need to worry the headache of managing env files or integrate any other SDKs</p>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
          <div>
              <label htmlFor="secret_name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Secret Name
              </label>
              <div className="mt-2">
                <input
                  id="secret_name"
                  name="secret_name"
                  type="text"
                  disabled
                  value="NEXT_PUBLIC_SUPER_SECRET_KEY"
                  className="block w-96 rounded-md border-0 py-1.5 px-1.5 text-gray-900 dark:text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
          </div>

          <div>
              <div className="flex items-center justify-between">
                <label htmlFor="secret_value" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Secret Value
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="secret_value"
                  name="password"
                  type="secret_value"
                  value={process.env.NEXT_PUBLIC_SUPER_SECRET_KEY}
                  disabled
                  className="block w-96 rounded-md border-0 py-1.5 px-1.5 text-gray-900 dark:text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
        </div>
      </div>
    </main>
  )
}
