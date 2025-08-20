<template>
  <div
    dir="rtl"
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden"
  >
    <!-- Fitness Background Elements -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-20 left-20 w-32 h-32 border-4 border-orange-400 rounded-full"></div>
      <div
        class="absolute bottom-20 right-20 w-24 h-24 border-4 border-cyan-400 rounded-full"
      ></div>
      <div
        class="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"
      ></div>
      <div
        class="absolute bottom-1/3 left-1/3 w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-50"
      ></div>
    </div>

    <!-- Animated Fitness Icons -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 right-1/4 animate-bounce delay-1000">
        <svg class="w-8 h-8 text-orange-400 opacity-30" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"
          />
        </svg>
      </div>
      <div class="absolute bottom-1/4 left-1/4 animate-pulse delay-500">
        <svg class="w-6 h-6 text-cyan-400 opacity-30" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
          />
        </svg>
      </div>
    </div>

    <div class="w-full max-w-md">
      <!-- برند -->
      <div class="text-center mb-8">
        <h1
          class="text-4xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2"
        >
          SOHRABY GYM
        </h1>
      </div>

      <!-- کارت شیشه‌ای -->
      <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
        <!-- حالت ورود -->
        <div v-if="isLoginMode" class="space-y-6">
          <div
            v-if="flash.type && flash.place === 'modal'"
            class="mx-6 mt-3 rounded-lg border p-3 text-sm text-right"
            :class="
              flash.type === 'error'
                ? 'border-red-200 bg-red-50/90 text-red-700'
                : 'border-green-200 bg-green-50/90 text-green-700'
            "
          >
            {{ flash.message }}
          </div>

          <div class="text-center">
            <h2 class="text-2xl font-bold text-white mb-2">ورود به پنل مدیریت</h2>
            <!-- <p class="text-gray-300">باشگاه بدنسازی SOHRABY</p> -->
          </div>

          <form @submit.prevent="handleLogin" novalidate class="space-y-5">
            <!-- نام کاربری -->
            <div class="space-y-2">
              <label
                class="block text-sm font-semibold text-gray-200 uppercase tracking-wide text-right"
              >
                نام کاربری
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fill-rule="evenodd"
                      d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  v-model="loginForm.username"
                  type="text"
                  placeholder="نام کاربری خود را وارد کنید"
                  required
                  class="w-full pr-10 pl-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-right"
                />
              </div>
            </div>

            <!-- رمز عبور -->
            <div class="space-y-2">
              <label
                class="block text-sm font-semibold text-gray-200 uppercase tracking-wide text-right"
              >
                رمز عبور
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  v-model="loginForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="رمز عبور خود را وارد کنید"
                  required
                  class="w-full pr-10 pl-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-right"
                />
                <!-- نمایش/مخفی‌سازی -->
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  <svg
                    v-if="showPassword"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    />
                  </svg>
                </button>
              </div>

              <div class="flex justify-start">
                <a
                  href="#"
                  @click.prevent="openForgotModal"
                  class="text-sm text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-200 mt-3"
                >
                  فراموشی رمز عبور
                </a>
              </div>
            </div>

            <!-- دکمه ورود -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              <span v-if="!isLoading" class="flex items-center justify-center">
                <svg
                  class="w-5 h-5 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                  />
                </svg>
                ورود
              </span>
              <span v-else class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Powering Up...
              </span>
            </button>
          </form>

          <!-- دیوایدر محوشونده -->
          <div class="my-6">
            <div class="flex items-center gap-3">
              <div
                class="h-px flex-1 bg-gradient-to-l from-transparent via-white/30 to-white/60"
              ></div>
              <span class="px-3 text-xs text-white/85 font-medium whitespace-nowrap"
                >ایجاد کاربر جدید</span
              >
              <div
                class="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-white/60"
              ></div>
            </div>
          </div>

          <div class="text-center">
            <p class="text-sm text-gray-300">حساب کاربری ندارید؟</p>
            <button
              class="mt-2 text-cyan-400 hover:text-cyan-300 font-semibold"
              @click="toggleMode"
            >
              ثبت نام کنید
            </button>
          </div>
        </div>

        <!-- حالت ثبت‌نام -->
        <div v-else class="space-y-6">
          <div
            v-if="flash.type && flash.place === 'register'"
            class="mb-2 rounded-lg border p-3 text-sm text-right"
            :class="
              flash.type === 'error'
                ? 'border-red-200 bg-red-50/90 text-red-700'
                : 'border-green-200 bg-green-50/90 text-green-700'
            "
          >
            {{ flash.message }}
          </div>

          <div class="text-center">
            <h2 class="text-2xl font-bold text-white mb-2">ایجاد حساب کاربری</h2>
            <!-- <p class="text-gray-300">باشگاه بدنسازی SOHRABY</p> -->
          </div>

          <form @submit.prevent="handleRegister" novalidate class="space-y-5">
            <!-- نام کامل -->
            <div class="space-y-2">
              <label
                class="block text-sm font-semibold text-gray-200 uppercase tracking-wide text-right"
              >
                نام کامل
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    class="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  v-model="registerForm.fullName"
                  type="text"
                  placeholder="نام و نام خانوادگی"
                  required
                  class="w-full pr-10 pl-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-right"
                />
              </div>
            </div>

            <!-- نام کاربری -->
            <div class="space-y-2">
              <label
                class="block text-sm font-semibold text-gray-200 uppercase tracking-wide text-right"
              >
                نام کاربری
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 12a5 5 0 1 0-5-5 5.006 5.006 0 0 0 5 5Zm0 2c-3.33 0-10 1.667-10 5v1h20v-1c0-3.333-6.67-5-10-5Z"
                    />
                  </svg>
                </div>
                <input
                  v-model="registerForm.username"
                  type="text"
                  placeholder="نام کاربری مورد نظر"
                  required
                  class="w-full pr-10 pl-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-right"
                />
              </div>
            </div>

            <!-- ایمیل -->
            <div class="space-y-2">
              <label
                class="block text-sm font-semibold text-gray-200 uppercase tracking-wide text-right"
              >
                ایمیل
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  v-model="registerForm.email"
                  type="email"
                  placeholder="آدرس ایمیل"
                  required
                  class="w-full pr-10 pl-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-right"
                />
              </div>
            </div>

            <!-- تلفن -->
            <div class="space-y-2">
              <label
                class="block text-sm font-semibold text-gray-200 uppercase tracking-wide text-right"
              >
                شماره تلفن
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.85 21 3 13.15 3 3a1 1 0 011-1h2.49a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"
                    />
                  </svg>
                </div>
                <input
                  v-model="registerForm.phone"
                  type="tel"
                  placeholder="شماره تلفن"
                  required
                  class="w-full pr-10 pl-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-right"
                />
              </div>
            </div>

            <!-- رمز عبور -->
            <div class="space-y-2">
              <label
                class="block text-sm font-semibold text-gray-200 uppercase tracking-wide text-right"
              >
                رمز عبور
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  v-model="registerForm.password"
                  type="password"
                  placeholder="رمز عبور قوی انتخاب کنید"
                  required
                  class="w-full pr-10 pl-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-right"
                />
              </div>
            </div>

            <!-- تکرار رمز -->
            <div class="space-y-2">
              <label
                class="block text-sm font-semibold text-gray-200 uppercase tracking-wide text-right"
              >
                تکرار رمز عبور
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    class="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  v-model="registerForm.confirmPassword"
                  type="password"
                  placeholder="رمز عبور را تکرار کنید"
                  required
                  class="w-full pr-10 pl-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-right"
                />
              </div>
            </div>

            <!-- دکمه ثبت‌نام -->
            <button
              class="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              :disabled="isLoading"
            >
              <span v-if="!isLoading" class="flex items-center justify-center">
                <svg
                  class="w-5 h-5 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
                    clip-rule="evenodd"
                  />
                </svg>
                ثبت نام
              </span>
              <span v-else class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Powering Up...
              </span>
            </button>

            <div class="text-center">
              <p class="text-sm text-gray-300">قبلاً حساب دارید؟</p>
              <button
                class="mt-2 text-cyan-400 hover:text-cyan-300 font-semibold"
                @click="toggleMode"
              >
                وارد شوید
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- فوتر انگیزشی -->
      <div class="text-center mt-6">
        <div class="flex items-center justify-center mt-2">
          <div class="flex items-center text-orange-400 text-xs font-semibold">
            <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
            قدرت
          </div>
          <div class="flex items-center text-cyan-400 text-xs font-semibold mx-4">
            <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
            استقامت
          </div>
          <div class="flex items-center text-yellow-400 text-xs font-semibold">
            <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
            موفقیت
          </div>
        </div>
      </div>
      <!-- Overlay اسپینر ورود -->
      <div
        v-if="isLoggingIn"
        class="fixed inset-0 z-50 grid place-items-center bg-slate-900/70 backdrop-blur-sm"
      >
        <div class="flex flex-col items-center gap-4">
          <div class="relative">
            <!-- رینگ چرخان -->
            <div
              class="w-16 h-16 rounded-full border-4 border-white/20 border-t-cyan-400 animate-spin"
            ></div>
            <!-- آیکن داخل رینگ -->
            <div class="absolute inset-0 flex items-center justify-center">
              <svg
                class="w-6 h-6 text-white/90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                />
              </svg>
            </div>
          </div>
          <p class="text-white/90 font-semibold">در حال ورود به داشبورد…</p>
        </div>
      </div>
    </div>
  </div>

  <div
    dir="rtl"
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden"
  >
    <!-- Modal: Forgot Password -->
    <div
      v-if="showForgotModal"
      class="fixed inset-0 z-50 grid place-items-center bg-slate-900/70 backdrop-blur-sm"
    >
      <div
        class="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
      >
        <div class="text-center mb-8">
          <h3
            class="text-2xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2"
          >
            بازیابی رمز عبور
          </h3>
        </div>

        <!-- نمایش پیغام خطا یا موفقیت در داخل مودال -->
        <div
          v-if="flash.type && flash.place === 'modal'"
          class="mx-6 mt-3 rounded-lg border p-3 text-sm text-right"
          :class="
            flash.type === 'error'
              ? 'border-red-200 bg-red-50/90 text-red-700'
              : 'border-green-200 bg-green-50/90 text-green-700'
          "
        >
          {{ flash.message }}
        </div>

        <form @submit.prevent="submitForgot" novalidate class="space-y-5">
          <!-- نام کاربری -->
          <div class="space-y-2">
            <label
              class="block text-sm font-semibold text-gray-200 uppercase tracking-wide text-right"
              >نام کاربری</label
            >
            <div class="relative">
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fill-rule="evenodd"
                    d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <input
                v-model="fp.username"
                type="text"
                placeholder="نام کاربری خود را وارد کنید"
                required
                class="w-full pr-10 pl-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-right"
              />
            </div>
          </div>

          <!-- کلید بازیابی -->
          <div class="space-y-2">
            <label
              class="block text-sm font-semibold text-gray-200 uppercase tracking-wide text-right"
              >کلید بازیابی (Recovery Key)</label
            >
            <div class="relative">
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                  />
                </svg>
              </div>
              <input
                v-model="fp.recoveryKey"
                type="text"
                placeholder="مثلاً  5496"
                class="w-full pr-10 pl-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-right"
              />
            </div>
            <p class="text-xs text-slate-500 mt-1">
              این کلید هنگام ثبت‌نام به شما نمایش داده شده است.
            </p>
          </div>

          <!-- رمز جدید -->
          <div class="space-y-2">
            <label
              class="block text-sm font-semibold text-gray-200 uppercase tracking-wide text-right"
              >رمز جدید</label
            >
            <div class="relative">
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                v-model="fp.newPass"
                type="password"
                placeholder="رمز عبور جدید خود را وارد کنید"
                required
                class="w-full pr-10 pl-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-right"
              />
            </div>
          </div>

          <!-- تکرار رمز -->
          <div class="space-y-2">
            <label
              class="block text-sm font-semibold text-gray-200 uppercase tracking-wide text-right"
              >تکرار رمز عبور</label
            >
            <div class="relative">
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                v-model="fp.confirm"
                type="password"
                placeholder="رمز عبور را تکرار کنید"
                required
                class="w-full pr-10 pl-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-right"
              />
            </div>
          </div>

          <!-- دکمه تایید -->
          <button
            type="submit"
            :disabled="fpLoading"
            class="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <span v-if="!fpLoading" class="flex items-center justify-center">
              تایید و تغییر رمز
            </span>
            <span v-else class="inline-flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              در حال پردازش...
            </span>
          </button>
                <!-- دکمه بستن -->
      <button
        @click="showForgotModal = false"
        class="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        بستن
      </button>
        </form>
      </div>
    </div>
<!-- Modal: Show Recovery Key after register -->
<div
  v-if="registerSuccessKey"
  class="fixed inset-0 z-50 grid place-items-center bg-slate-900/70 backdrop-blur-sm"
>
  <div class="w-full max-w-md bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
    <!-- Header with gradient -->
    <div class="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600">
      <h3 class="font-bold text-2xl text-white text-center">🔐 کلید بازیابی شما</h3>
    </div>
    
    <!-- Content -->
    <div class="p-6 space-y-5 text-center">
      <!-- Animated icon -->
      <div class="flex justify-center">
        <div class="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
          </svg>
        </div>
      </div>
      
      <p class="text-slate-200 text-sm leading-relaxed">
        این کلید را در جای امن نگه دارید. فقط همین یک‌بار نمایش داده می‌شود و برای بازیابی حساب ضروری است.
      </p>
      
      <!-- Key container with copy functionality -->
      <div class="relative group">
        <div class="font-mono text-lg bg-slate-800/50 rounded-xl px-5 py-4 select-all text-cyan-100 border border-cyan-500/30 shadow-lg">
          {{ registerSuccessKey }}
        </div>
        
        <!-- Copy button with state -->
        <button 
          @click="copyKeyToClipboard"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-all duration-300 flex items-center justify-center"
          :class="copyButtonState === 'default' ? 
                 'bg-slate-700/80 hover:bg-slate-600 opacity-0 group-hover:opacity-100' : 
                 copyButtonState === 'copying' ? 
                 'bg-cyan-500/90 opacity-100 w-24' : 
                 'bg-green-500/90 opacity-100'"
          :title="copyButtonState === 'default' ? 'کپی کلید' : ''"
          :disabled="copyButtonState !== 'default'"
        >
          <span v-if="copyButtonState === 'default'">
            <svg class="w-4 h-4 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </span>
          <span v-else-if="copyButtonState === 'copying'" class="text-xs text-white font-medium animate-pulse">
            در حال کپی...
          </span>
          <span v-else class="text-xs text-white font-medium flex items-center">
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            کپی شد!
          </span>
        </button>
      </div>
      
      <!-- Warning message -->
      <div class="flex items-start p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
        <svg class="w-5 h-5 text-amber-400 mt-0.5 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <span class="text-xs text-amber-300 text-right">در صورت از دست دادن این کلید، دسترسی به حساب خود را از دست خواهید داد.</span>
      </div>
    </div>
    
    <!-- Footer with action button -->
    <div class="px-6 py-4 bg-slate-800/30 border-t border-white/10 flex justify-center">
      <button
        @click="registerSuccessKey = null"
        class="relative w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center group"
      >
        <span class="transition-transform duration-300 group-hover:translate-x-1">✓ متوجه شدم</span>
      </button>
    </div>
  </div>
</div>
  </div>
</template>

<script>
export default {
  name: 'AuthPage',
  data() {
    return {
      isLoginMode: true,
      isLoading: false,
      showPassword: false,
      showForgotModal: false,
      flash: { type: null, message: '', place: null },
      fpLoading: false,
      fp: { username: '', recoveryKey: '', newPass: '', confirm: '' },
      registerSuccessKey: null, // برای نمایش Recovery Key بعد از ثبت‌نام
      loginForm: { username: '', password: '' },
      registerForm: {
        fullName: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      },
      copyButtonState: 'default' // حالت دکمه: 'default', 'copying', 'success'
    }
  },
  methods: {
    async copyKeyToClipboard() {
    // تغییر حالت به "در حال کپی"
    this.copyButtonState = 'copying';
    
    try {
      // کپی کردن کلید به کلیپ‌بورد
      await navigator.clipboard.writeText(this.registerSuccessKey);
      
      // تغییر حالت به "موفقیت‌آمیز"
      this.copyButtonState = 'success';
      
      // بعد از 2 ثانیه بازگشت به حالت پیش‌فرض
      setTimeout(() => {
        this.copyButtonState = 'default';
      }, 2000);
      
    } catch (err) {
      console.error('خطا در کپی کردن:', err);
      // در صورت خطا، بازگشت به حالت پیش‌فرض
      this.copyButtonState = 'default';
    }
  },
    async handleLogin() {
      try {
        this.isLoading = true
        const payload = JSON.parse(JSON.stringify(this.loginForm))
        const result = await window.api?.loginUser?.(payload)

        if (result?.success) {
          const user = JSON.parse(JSON.stringify(result.user || {}))
          window.api?.setUserData?.(user)

          // پیام کوتاه + اسپینر تمام‌صفحه
          this.notify('success', 'ورود با موفقیت انجام شد', 'login')
          this.isLoggingIn = true
          this.isLoading = false // دکمه از حالت لودینگ خارج شود

          // مکث کوتاه و سپس رفتن به داشبورد
          await new Promise((r) => setTimeout(r, 1200))
          this.$router.push('/')
        } else {
          this.notify('error', result?.error || 'نام کاربری یا رمز عبور نادرست است', 'login')
        }
      } catch (e) {
        console.error('Login error:', e)
        this.notify('error', 'خطا در ورود به سیستم', 'login')
      } finally {
        // اگر لاگین موفق باشد overlay روشن می‌ماند تا ریدایرکت؛ در غیر اینصورت خاموش
        if (!this._isBeingDestroyed && !this._isDestroyed && !this._isUnmounted) {
          if (!this.isLoggingIn) this.isLoading = false
        }
      }
    },
    async handleRegister() {
      if (!this.registerForm.fullName?.trim() || !this.registerForm.username?.trim()) {
        this.notify('error', 'نام کامل و نام کاربری الزامی است', 'register')
        return
      }
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.notify('error', 'رمزهای عبور مطابقت ندارند', 'register')
        return
      }

      try {
        this.isLoading = true
        const payload = {
          full_name: this.registerForm.fullName?.trim() || '',
          username: this.registerForm.username?.trim() || '',
          email: this.registerForm.email?.trim() || '',
          phone: this.registerForm.phone?.trim() || '',
          password: this.registerForm.password
        }

        const result = await window.api?.registerMember?.(payload)

        if (result?.success) {
          // ذخیره کد بازیابی پس از ثبت‌نام موفق
          this.registerSuccessKey = result.recoveryKey || null

          // پیام موفقیت
          this.notify(
            'success',
            'ثبت‌نام با موفقیت انجام شد. تا لحظاتی دیگر به صفحه ورود منتقل می‌شوید…',
            'register'
          )

          // پاک‌سازی فرم و توقف لودینگ
          this.registerForm = {
            fullName: '',
            username: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
          }
          this.isLoading = false

          // نمایش مودال کد بازیابی
          if (this.registerSuccessKey) {
            this.showRecoveryKeyModal = true
          }

          // مکث کوتاه و سپس سوییچ به فرم ورود
          await new Promise((r) => setTimeout(r, 1600))
          this.isLoginMode = true

          // پیام کوتاه روی فرم ورود
          this.notify('success', 'حساب شما ایجاد شد. اکنون وارد شوید.', 'login')
        } else {
          this.notify('error', result?.error || 'ثبت‌نام ناموفق', 'register')
        }
      } catch (e) {
        console.error('Registration error:', e)
        this.notify('error', 'خطا در ثبت‌نام', 'register')
      } finally {
        this.isLoading = false
      }
    },
    openForgotModal() {
      this.fp = {
        username: this.loginForm.username || '',
        recoveryKey: '',
        newPass: '',
        confirm: ''
      }
      this.showForgotModal = true
    },

    async submitForgot() {
      if (!this.fp.username?.trim() || !this.fp.recoveryKey?.trim()) {
        this.notify('error', 'نام کاربری و کلید بازیابی الزامی است', 'modal')
        return
      }
      if (this.fp.newPass.length < 6) {
        this.notify('error', 'حداقل طول رمز عبور ۶ کاراکتر است', 'modal')
        return
      }
      if (this.fp.newPass !== this.fp.confirm) {
        this.notify('error', 'رمز جدید و تکرار آن مطابقت ندارند', 'modal')
        return
      }

      try {
        this.fpLoading = true
        const res = await window.api?.resetPasswordWithRecoveryKey?.({
          username: this.fp.username.trim(),
          recoveryKey: this.fp.recoveryKey.trim(),
          newPassword: this.fp.newPass
        })

        if (res?.success) {
          this.notify('success', 'رمز عبور با موفقیت تغییر کرد', 'modal')

          if (res.newRecoveryKey) this.registerSuccessKey = res.newRecoveryKey

          // یک مکث کوتاه و سپس بستن مودال و بازگشت به فرم لاگین
          await new Promise((r) => setTimeout(r, 900))
          this.showForgotModal = false
          this.isLoginMode = true
          this.notify('success', 'اکنون با رمز جدید وارد شوید', 'login')
        } else {
          this.notify('error', res?.error || 'فرایند بازیابی انجام نشد', 'modal')
        }
      } catch (e) {
        console.error(e)
        this.notify('error', 'خطا در بازیابی رمز عبور', 'modal')
      } finally {
        this.fpLoading = false
      }
    },
    toggleMode() {
      this.isLoginMode = !this.isLoginMode
      // پاک‌سازی پیام‌های قبلی
      this.flash = { type: null, message: '', place: null }
    },

    notify(type, message, place) {
      this.flash = { type, message, place }
      clearTimeout(this._flashTimer)
      this._flashTimer = setTimeout(() => {
        this.flash = { type: null, message: '', place: null }
      }, 4000)
    }
  }
}
</script>
