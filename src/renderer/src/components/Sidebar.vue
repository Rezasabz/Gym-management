<!-- انیمیشن ترنزیشن -->
<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: all 0.15s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
</style>

<template>
  <nav
    class="fixed top-0 z-50 w-full bg-gradient-to-r from-indigo-600 to-purple-600 border-b border-indigo-500 shadow-lg"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <svg
            width="40"
            height="40"
            viewBox="0 -20 256 256"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="xMidYMid"
          >
            <g>
              <path
                d="M55.5774312,0.518934349 C69.9640298,-1.34690438 84.9125622,1.8555732 97.2260067,9.53169919 C104.176529,13.6289064 109.735855,19.5592184 115.437029,25.1731016 C119.572426,29.2212078 123.664178,33.3184151 127.810486,37.35561 L127.963245,37.7756965 C124.865978,40.8249722 121.351577,46.9222616 117.420043,56.0675647 C109.17447,58.9683238 103.546988,61.8965291 100.537598,64.8521807 C93.8216694,58.3872132 87.3239678,51.6931076 80.6353179,45.1954061 C74.2740081,39.2378157 64.6611197,36.8373215 56.3303135,39.5706115 C46.8429054,42.2384336 39.603233,51.3112108 39.1013114,61.1586929 C38.7739713,66.2815659 40.1106102,71.4862739 42.8820899,75.8071636 C44.6060812,78.5895547 47.1266002,80.7118099 49.3852471,83.0359248 C54.8136375,88.4915936 60.372964,93.821782 65.7195194,99.3538301 C62.8643828,102.159652 59.4836867,107.591131 55.5774312,115.648267 C47.2683739,119.586376 41.5035506,123.167662 38.2829611,126.392125 C31.0651113,119.605273 24.1636903,112.452891 17.0113085,105.58966 C8.49500953,96.7296534 2.79929132,85.2345593 0.835250554,73.1066076 C-1.32519429,60.0948375 0.726137178,46.3956532 6.74919552,34.6495983 C11.8066005,24.8021161 19.4609038,16.2476275 28.7737304,10.2409361 C36.8699429,5.15079715 46.0409221,1.58278976 55.5774312,0.518934349 Z"
                fill="#EA4335"
              ></path>
              <polygon
                fill="#34A853"
                points="128.083269 160.779205 190.490665 99.2719951 207.36413 109.294059 217.921767 126.452137 128.083269 215.330437 65.7631648 153.675924 77.7221592 136.846613 93.3633932 126.430314"
              ></polygon>
              <polygon
                fill="#FBBC05"
                points="100.592154 64.9121931 116.289402 73.4031101 128.083269 92.1687143 65.7631648 153.675924 38.2829611 126.392125"
              ></polygon>
              <path
                d="M203.333309,0.895375496 C221.620711,3.99419537 238.440538,15.4129101 247.660618,31.5671454 C258.16278,49.314436 258.735625,72.3428139 249.417343,90.7065951 C245.55473,98.5954921 239.657152,105.251408 233.377677,111.301745 C228.167513,116.28277 223.219222,121.596592 217.921767,126.452137 C208.756244,117.417549 199.579809,108.388418 190.490665,99.2719951 C196.966543,92.7306482 203.54608,86.2984147 210.043782,79.7788905 C214.233735,75.5452915 216.857912,69.7404599 217.070683,63.7665026 C217.359833,56.9851063 214.6811,50.105508 209.765542,45.4027215 C204.757239,40.6617453 197.741248,37.9666449 190.834372,38.5394901 C184.893148,38.8231849 179.159241,41.5182853 174.969287,45.7191503 C159.33334,61.1914269 143.735583,76.707349 128.083269,92.1687143 C118.879556,83.1232155 109.664932,74.088628 100.592154,64.9121931 C100.581243,64.895826 100.553965,64.8685477 100.537598,64.8521807 C109.703121,55.8503272 118.808632,46.7884613 127.963245,37.7756965 C134.597338,31.2398053 141.209608,24.6766357 147.849157,18.1352889 C156.447291,9.49896517 167.784171,3.84143664 179.628428,1.2445383 C187.43549,-0.223036606 195.488057,-0.38670667 203.333309,0.895375496 Z"
                fill="#4285F4"
              ></path>
            </g>
          </svg>
          <a href="" class="flex ms-2 md:me-24">
            <span class="self-center text-xl sm:text-2xl whitespace-nowrap text-white font-bold"
              >Sohrabi Gym</span
            >
          </a>
        </div>
      </div>
    </div>
  </nav>

  <aside
    id="logo-sidebar"
    class="fixed top-0 right-0 z-40 w-64 h-screen pt-20 transition-transform translate-x-full bg-gradient-to-b from-indigo-50 to-white border-l border-indigo-100 sm:translate-x-0 shadow-xl"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto">
      <ul class="space-y-2 font-medium">
        <li v-for="item in menuItems" :key="item.path">
          <router-link
            :to="item.path"
            :class="[
              'flex items-center p-3 rounded-xl group transition-all duration-200 flex-row-reverse',
              $route.path === item.path
                ? 'bg-indigo-100 text-indigo-700 shadow-md'
                : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
            ]"
          >
            <span v-html="item.icon" class="w-6 h-6 text-current"></span>
            <span class="ms-1 text-right mr-3 font-medium">{{ item.label }}</span>
            <span
              v-if="$route.path === item.path"
              class="absolute left-3 w-1 h-6 bg-indigo-600 rounded-full"
            ></span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- پروفایل کاربر در پایین سایدبار -->
    <div
      class="absolute bottom-0 w-full p-4 border-t border-indigo-100/50 bg-white/70 backdrop-blur-xl"
    >
      <div class="relative">
        <button
          @click.stop="toggleUserMenu"
          class="w-full flex items-center justify-between rounded-xl border border-indigo-100/60 bg-white/60 hover:bg-white/80 transition-all shadow-sm hover:shadow-md p-3 rtl flex-row-reverse focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <div class="flex items-center justify-end">
            <div class="text-right mr-3">
              <p class="text-sm font-medium text-gray-800 cursor-pointer">{{ userName }}</p>
              <p class="text-xs text-gray-500">{{ userRole }}</p>
            </div>
            <div
              class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-indigo-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
          <svg
            :class="['h-4 w-4 transition-transform', isUserMenuOpen ? 'rotate-180' : 'rotate-0']"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <!-- منوی کاربری -->
        <transition name="menu">
          <div
            v-if="isUserMenuOpen"
            v-click-outside="() => (isUserMenuOpen = false)"
            class="absolute right-0 bottom-16 w-60 bg-white/95 backdrop-blur-xl border border-indigo-100/70 rounded-2xl shadow-2xl overflow-hidden z-50 rtl"
          >
            <!-- هدر منو -->
            <div
              class="px-4 py-3 bg-gradient-to-l from-indigo-50 to-white border-b border-gray-100 flex items-center justify-between flex-row-reverse"
            >
              <div class="text-right">
                <p class="text-sm font-semibold text-gray-800 truncate">{{ userName }}</p>
                <p class="text-[11px] text-gray-500">{{ userRole }}</p>
              </div>
              <!-- <div class="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          </div> -->
            </div>

            <!-- آیتم‌ها -->
            <ul class="py-1">
              <!-- <li>
            <button
              @click="goToProfile"
              class="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50/70
                     transition-colors flex-row-reverse"
            >
              <span>پروفایل</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12a5 5 0 1 0-5-5 5.006 5.006 0 0 0 5 5Zm0 2c-3.33 0-10 1.667-10 5v1h20v-1c0-3.333-6.67-5-10-5Z"/>
              </svg>
            </button>
          </li>
          <li>
            <button
              @click="goToSettings"
              class="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50/70
                     transition-colors flex-row-reverse"
            >
              <span>تنظیمات</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14,12.94a7.43,7.43,0,0,0,.05-.94,7.43,7.43,0,0,0-.05-.94l2.11-1.65a.5.5,0,0,0,.12-.64l-2-3.46a.5.5,0,0,0-.6-.22l-2.49,1a7.12,7.12,0,0,0-1.63-.94l-.38-2.65A.5.5,0,0,0,13.71,1H10.29a.5.5,0,0,0-.49.41L9.42,4.06a7.12,7.12,0,0,0-1.63.94l-2.49-1a.5.5,0,0,0-.6.22l-2,3.46a.5.5,0,0,0,.12.64L4.94,11.06a7.43,7.43,0,0,0-.05.94,7.43,7.43,0,0,0,.05.94L2.83,14.59a.5.5,0,0,0-.12.64l2,3.46a.5.5,0,0,0,.6.22l2.49-1a7.12,7.12,0,0,0,1.63.94l.38,2.65a.5.5,0,0,0,.49.41h3.42a.5.5,0,0,0,.49-.41l.38-2.65a7.12,7.12,0,0,0,1.63-.94l2.49,1a.5.5,0,0,0,.6-.22l2-3.46a.5.5,0,0,0-.12-.64Zm-7.14,2.56A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
              </svg>
            </button>
          </li> -->

              <li><div class="h-px bg-gray-100 my-1"></div></li>

              <li>
                <button
                  @click="handleLogout"
                  class="w-full flex items-center justify-between px-4 py-2.5 text-sm text-red-600 hover:bg-red-50/80 transition-colors flex-row-reverse"
                >
                  <span>خروج</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M16 13v-2H7V8l-5 4 5 4v-3h9zm3-11H9c-1.1 0-2 .9-2 2v4h2V4h10v16H9v-4H7v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </aside>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const clickOutside = {
  mounted(el, binding) {
    el.__clickOutside__ = (e) => {
      if (!el.contains(e.target)) binding.value(e)
    }
    document.addEventListener('click', el.__clickOutside__)
  },
  unmounted(el) {
    document.removeEventListener('click', el.__clickOutside__)
    delete el.__clickOutside__
  }
}

export default {
  name: 'Sidebar',

  directives: { clickOutside },

  setup() {
    const router = useRouter()
    const isUserMenuOpen = ref(false)
    const isSidebarOpen = ref(false)
    const userName = ref('مدیر سیستم')
    const userRole = ref('مدیر کل')

    const menuItems = [
      {
        path: '/',
        label: 'داشبورد',
        icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z" fill="currentColor"/></svg>`
      },
      {
        path: '/users',
        label: 'اعضا',
        icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="9.00098" cy="6" r="4" fill="currentColor"/><ellipse cx="9.00098" cy="17.001" rx="7" ry="4" fill="currentColor"/><path d="M20.9996 17.0005C20.9996 18.6573 18.9641 20.0004 16.4788 20.0004C17.211 19.2001 17.7145 18.1955 17.7145 17.0018C17.7145 15.8068 17.2098 14.8013 16.4762 14.0005C18.9615 14.0005 20.9996 15.3436 20.9996 17.0005Z" fill="currentColor"/><path d="M17.9996 6.00073C17.9996 7.65759 16.6565 9.00073 14.9996 9.00073C14.6383 9.00073 14.292 8.93687 13.9712 8.81981C14.4443 7.98772 14.7145 7.02522 14.7145 5.99962C14.7145 4.97477 14.4447 4.01294 13.9722 3.18127C14.2927 3.06446 14.6387 3.00073 14.9996 3.00073C16.6565 3.00073 17.9996 4.34388 17.9996 6.00073Z" fill="currentColor"/></svg>`
      },
      {
        path: '/payments',
        label: 'پرداخت‌ها',
        icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.052 1.25H11.948C11.0495 1.24997 10.3003 1.24995 9.70552 1.32991C9.07773 1.41432 8.51093 1.59999 8.05546 2.05546C7.59999 2.51093 7.41432 3.07773 7.32991 3.70552C7.27259 4.13189 7.25637 5.15147 7.25179 6.02566C5.22954 6.09171 4.01536 6.32778 3.17157 7.17157C2 8.34315 2 10.2288 2 14C2 17.7712 2 19.6569 3.17157 20.8284C4.34314 22 6.22876 22 9.99998 22H14C17.7712 22 19.6569 22 20.8284 20.8284C22 19.6569 22 17.7712 22 14C22 10.2288 22 8.34315 20.8284 7.17157C19.9846 6.32778 18.7705 6.09171 16.7482 6.02566C16.7436 5.15147 16.7274 4.13189 16.6701 3.70552C16.5857 3.07773 16.4 2.51093 15.9445 2.05546C15.4891 1.59999 14.9223 1.41432 14.2945 1.32991C13.6997 1.24995 12.9505 1.24997 12.052 1.25ZM15.2479 6.00188C15.2434 5.15523 15.229 4.24407 15.1835 3.9054C15.1214 3.44393 15.0142 3.24644 14.8839 3.11612C14.7536 2.9858 14.5561 2.87858 14.0946 2.81654C13.6116 2.7516 12.964 2.75 12 2.75C11.036 2.75 10.3884 2.7516 9.90539 2.81654C9.44393 2.87858 9.24644 2.9858 9.11612 3.11612C8.9858 3.24644 8.87858 3.44393 8.81654 3.9054C8.771 4.24407 8.75661 5.15523 8.75208 6.00188C9.1435 6 9.55885 6 10 6H14C14.4412 6 14.8565 6 15.2479 6.00188ZM12 9.25C12.4142 9.25 12.75 9.58579 12.75 10V10.0102C13.8388 10.2845 14.75 11.143 14.75 12.3333C14.75 12.7475 14.4142 13.0833 14 13.0833C13.5858 13.0833 13.25 12.7475 13.25 12.3333C13.25 11.9493 12.8242 11.4167 12 11.4167C11.1758 11.4167 10.75 11.9493 10.75 12.3333C10.75 12.7174 11.1758 13.25 12 13.25C13.3849 13.25 14.75 14.2098 14.75 15.6667C14.75 16.857 13.8388 17.7155 12.75 17.9898V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V17.9898C10.1612 17.7155 9.25 16.857 9.25 15.6667C9.25 15.2525 9.58579 14.9167 10 14.9167C10.4142 14.9167 10.75 15.2525 10.75 15.6667C10.75 16.0507 11.1758 16.5833 12 16.5833C12.8242 16.5833 13.25 16.0507 13.25 15.6667C13.25 15.2826 12.8242 14.75 12 14.75C10.6151 14.75 9.25 13.7903 9.25 12.3333C9.25 11.143 10.1612 10.2845 11.25 10.0102V10C11.25 9.58579 11.5858 9.25 12 9.25Z" fill="currentColor"/></svg>`
      },
      {
        path: '/reports',
        label: 'گزارشات',
        icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9.5 2C8.67157 2 8 2.67157 8 3.5V4.5C8 5.32843 8.67157 6 9.5 6H14.5C15.3284 6 16 5.32843 16 4.5V3.5C16 2.67157 15.3284 2 14.5 2H9.5Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 4.03662C5.24209 4.10719 4.44798 4.30764 3.87868 4.87694C3 5.75562 3 7.16983 3 9.99826V15.9983C3 18.8267 3 20.2409 3.87868 21.1196C4.75736 21.9983 6.17157 21.9983 9 21.9983H15C17.8284 21.9983 19.2426 21.9983 20.1213 21.1196C21 20.2409 21 18.8267 21 15.9983V9.99826C21 7.16983 21 5.75562 20.1213 4.87694C19.552 4.30764 18.7579 4.10719 17.5 4.03662V4.5C17.5 6.15685 16.1569 7.5 14.5 7.5H9.5C7.84315 7.5 6.5 6.15685 6.5 4.5V4.03662ZM7 9.75C6.58579 9.75 6.25 10.0858 6.25 10.5C6.25 10.9142 6.58579 11.25 7 11.25H7.5C7.91421 11.25 8.25 10.9142 8.25 10.5C8.25 10.0858 7.91421 9.75 7.5 9.75H7ZM10.5 9.75C10.0858 9.75 9.75 10.0858 9.75 10.5C9.75 10.9142 10.0858 11.25 10.5 11.25H17C17.4142 11.25 17.75 10.9142 17.75 10.5C17.75 10.0858 17.4142 9.75 17 9.75H10.5ZM7 13.25C6.58579 13.25 6.25 13.5858 6.25 14C6.25 14.4142 7 14.75 7 14.75H7.5C7.91421 14.75 8.25 14.4142 8.25 14C8.25 13.5858 7.91421 13.25 7.5 13.25H7ZM10.5 13.25C10.0858 13.25 9.75 13.5858 9.75 14C9.75 14.4142 10.0858 14.75 10.5 14.75H17C17.4142 14.75 17.75 14.4142 17.75 14C17.75 13.5858 17.4142 13.25 17 13.25H10.5ZM7 16.75C6.58579 16.75 6.25 17.0858 6.25 17.5C6.25 17.9142 6.58579 18.25 7 18.25H7.5C7.91421 18.25 8.25 17.9142 8.25 17.5C8.25 17.0858 7.91421 16.75 7.5 16.75H7ZM10.5 16.75C10.0858 16.75 9.75 17.0858 9.75 17.5C9.75 17.9142 10.0858 18.25 10.5 18.25H17C17.4142 18.25 17.75 17.9142 17.75 17.5C17.75 17.0858 17.4142 16.75 17 16.75H10.5Z" fill="currentColor"/></svg>`
      },
      {
        path: '/messages',
        label: 'ارسال پیامک',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 2H7C4.24 2 2 4.23 2 6.98V12.96V13.96C2 16.71 4.24 18.94 7 18.94H8.5C8.77 18.94 9.13 19.12 9.3 19.34L10.8 21.33C11.46 22.21 12.54 22.21 13.2 21.33L14.7 19.34C14.89 19.09 15.19 18.94 15.5 18.94H17C19.76 18.94 22 16.71 22 13.96V6.98C22 4.23 19.76 2 17 2ZM8 12C7.44 12 7 11.55 7 11C7 10.45 7.45 10 8 10C8.55 10 9 10.45 9 11C9 11.55 8.56 12 8 12ZM12 12C11.44 12 11 11.55 11 11C11 10.45 11.45 10 12 10C12.55 10 13 10.45 13 11C13 11.55 12.56 12 12 12ZM16 12C15.44 12 15 11.55 15 11C15 10.45 15.45 10 16 10C16.55 10 17 10.45 17 11C17 11.55 16.56 12 16 12Z" fill="currentColor"/></svg>`
      },
      {
        path: '/shop',
        label: 'مدیریت فروشگاه',
        icon: `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M5.535 7.677c.313-.98.687-2.023.926-2.677H17.46c.253.63.646 1.64.977 2.61.166.487.312.953.416 1.347.11.42.148.675.148.779 0 .18-.032.355-.09.515-.06.161-.144.3-.243.412-.1.111-.21.192-.324.245a.809.809 0 0 1-.686 0 1.004 1.004 0 0 1-.324-.245c-.1-.112-.183-.25-.242-.412a1.473 1.473 0 0 1-.091-.515 1 1 0 1 0-2 0 1.4 1.4 0 0 1-.333.927.896.896 0 0 1-.667.323.896.896 0 0 1-.667-.323A1.401 1.401 0 0 1 13 9.736a1 1 0 1 0-2 0 1.4 1.4 0 0 1-.333.927.896.896 0 0 1-.667.323.896.896 0 0 1-.667-.323A1.4 1.4 0 0 1 9 9.74v-.008a1 1 0 0 0-2 .003v.008a1.504 1.504 0 0 1-.18.712 1.22 1.22 0 0 1-.146.209l-.007.007a1.01 1.01 0 0 1-.325.248.82.82 0 0 1-.316.08.973.973 0 0 1-.563-.256 1.224 1.224 0 0 1-.102-.103A1.518 1.518 0 0 1 5 9.724v-.006a2.543 2.543 0 0 1 .029-.207c.024-.132.06-.296.11-.49.098-.385.237-.85.395-1.344ZM4 12.112a3.521 3.521 0 0 1-1-2.376c0-.349.098-.8.202-1.208.112-.441.264-.95.428-1.46.327-1.024.715-2.104.958-2.767A1.985 1.985 0 0 1 6.456 3h11.01c.803 0 1.539.481 1.844 1.243.258.641.67 1.697 1.019 2.72a22.3 22.3 0 0 1 .457 1.487c.114.433.214.903.214 1.286 0 .412-.072.821-.214 1.207A3.288 3.288 0 0 1 20 12.16V19a2 2 0 0 1-2 2h-6a1 1 0 0 1-1-1v-4H8v4a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2v-6.888ZM13 15a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2Z" clip-rule="evenodd"/></svg>`
      }
    ]

    const toggleUserMenu = () => {
      isUserMenuOpen.value = !isUserMenuOpen.value
    }

    const handleOutsideClick = (e) => {
      const aside = document.getElementById('logo-sidebar')
      if (isUserMenuOpen.value && aside && !aside.contains(e.target)) {
        isUserMenuOpen.value = false
      }
    }

    const handleLogout = () => {
      if (window?.api?.logout) {
        window.api.logout()
      }
      isUserMenuOpen.value = false
      router.push('/login')
    }

    const goToProfile = () => {
      isUserMenuOpen.value = false
      // this.router.push('/profile')
    }

    const goToSettings = () => {
      isUserMenuOpen.value = false
      // this.router.push('/settings')
    }

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value
    }

    onMounted(() => {
      const userData = window?.api?.getUserData ? window.api.getUserData() : null
      if (userData) {
        userName.value = userData.full_name || 'مدیر سیستم'
        userRole.value =
          userData.role === 'superadmin'
            ? 'سوپر ادمین'
            : userData.role === 'admin'
              ? 'ادمین'
              : 'عضو'
      }

      document.addEventListener('click', handleOutsideClick)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleOutsideClick)
    })

    return {
      isUserMenuOpen,
      isSidebarOpen,
      userName,
      userRole,
      menuItems,
      toggleUserMenu,
      handleLogout,
      goToProfile,
      goToSettings,
      toggleSidebar
    }
  }
}
</script>
