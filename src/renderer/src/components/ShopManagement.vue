<template>
  <div class="overflow-x-auto w-full">
    <!-- هدر بخش فروشگاه -->
    <!-- <div class="flex justify-between items-center mb-8"> -->
    <h1 class="text-2xl font-semibold text-center mb-6">مدیریت فروشگاه</h1>

    <div class="bg-base-100 shadow-lg rounded-lg mb-6 p-4 border border-blue-100">
      <!-- <button
        :disabled="activeTab !== 'products'"
        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="activeTab = 'addProduct'"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 ml-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        افزودن محصول جدید
      </button> -->
      <!-- </div> -->

      <!-- تب‌های مدیریت فروشگاه -->
      <div class="mb-6 mt-6 border-b border-gray-200">
        <nav class="flex flex-row-reverse space-x-reverse space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm',
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
            @click="activeTab = tab.id"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- محتوای تب‌ها -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <!-- تب مدیریت محصولات -->
        <div v-if="activeTab === 'products'">
          <h2 class="text-lg font-medium text-gray-900 mb-6">مدیریت محصولات</h2>

          <div class="mb-6 flex justify-end">
            <button
              :disabled="activeTab !== 'products'"
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="activeTab = 'addProduct'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              افزودن محصول جدید
            </button>
          </div>

          <div
            class="flex flex-col md:flex-row-reverse md:items-center md:justify-between gap-4 mb-6"
          >
            <!-- دکمه‌ها: فیلتر + دسته‌بندی -->
            <div class="flex gap-3 w-full md:w-auto justify-end">
              <select
                v-model="selectedCategory"
                class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 text-right w-full md:w-auto"
              >
                <option>همه دسته‌بندی‌ها</option>
                <option>مکمل‌ها</option>
                <option>لباس</option>
                <option>تجهیزات</option>
              </select>
            </div>

            <!-- فیلد جستجو -->
            <div class="relative w-full">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="جستجوی محصول..."
                class="w-full pr-5 pl-2 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-right custom-rtl"
              />

              <div class="absolute left-3 top-2.5 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- لیست محصولات -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- محصول -->
            <div
              v-for="product in paginatedProducts"
              :key="product.id"
              class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <!-- هدر کارت با برچسب -->
              <div
                class="px-4 py-2 flex justify-between items-center"
                :class="{
                  'bg-blue-100': product.tag === 'ویژه',
                  'bg-orange-100': product.tag === 'پیشنهاد',
                  'bg-red-100': product.tag === 'پایان تخفیف'
                }"
              >
                <span
                  class="font-bold text-sm"
                  :class="{
                    'text-blue-800': product.tag === 'ویژه',
                    'text-orange-800': product.tag === 'پیشنهاد',
                    'text-red-800': product.tag === 'پایان تخفیف'
                  }"
                >
                  {{ product.tag }}
                </span>
                <span
                  class="text-xs font-semibold px-2 py-1 rounded text-white"
                  :class="{
                    'bg-blue-600': product.tag === 'ویژه',
                    'bg-orange-600': product.tag === 'پیشنهاد',
                    'bg-red-600': product.tag === 'پایان تخفیف'
                  }"
                >
                  {{ product.brand }}
                </span>
              </div>

              <!-- تصویر محصول -->
              <div class="w-full h-48 flex items-center justify-center p-4">
                <img
                  :src="product.image || 'https://via.placeholder.com/300'"
                  :alt="product.name"
                  class="h-full object-contain"
                />
              </div>

              <!-- محتوای کارت -->
              <div class="p-4">
                <!-- عنوان محصول -->
                <h3 class="text-lg font-semibold text-gray-800 mb-2 text-right">
                  {{ product.name }}
                </h3>

                <!-- توضیحات محصول -->
                <p class="text-sm text-gray-500 mb-3 text-right leading-6" dir="rtl">
                  {{ product.description }}
                </p>

                <!-- قیمت و وضعیت -->
                <div class="flex justify-between items-center mb-3">
                  <span
                    class="text-sm font-medium px-2 py-1 rounded"
                    :class="{
                      'bg-green-100 text-green-800': product.stock > 0,
                      'bg-red-100 text-red-800': product.stock <= 0
                    }"
                  >
                    {{ product.stock > 0 ? 'موجود' : 'ناموجود' }}
                  </span>

                  <span class="text-red-600 font-bold text-lg" dir="rtl">
                    {{ product.price.toLocaleString('fa-IR') }}&nbsp;&nbsp; تومان
                  </span>
                </div>

                <!-- دکمه‌های عملیات -->
                <div class="flex justify-between items-center border-t border-gray-100 pt-3">
                  <span class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded" dir="rtl">
                    {{ product.stock }}&nbsp;&nbsp; عدد
                  </span>

                  <div class="flex space-x-2 space-x-reverse">
                    <!-- دکمه ویرایش -->
                    <button
                      @click.stop="editProduct(product)"
                      class="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors duration-200 mr-1"
                      title="ویرایش"
                    >
                      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>

                    <!-- دکمه حذف -->
                    <button
                      @click.stop="confirmDeleteProd(product)"
                      class="text-white bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors duration-200"
                      title="حذف"
                    >
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- صفحه‌بندی -->
          <div class="flex flex-col items-center justify-center mt-6 gap-4">
            <div class="text-sm text-gray-500 text-center">
              نمایش نمایش
              <span class="font-medium">
                {{ (currentPage - 1) * itemsPerPage + 1 }}
              </span>
              تا
              <span class="font-medium">
                {{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }}
              </span>
              از
              <span class="font-medium">{{ filteredProducts.length }}</span>
              نتیجه
            </div>

            <nav class="flex flex-wrap justify-center gap-2">
              <button
                @click="changePage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                قبلی
              </button>

              <button
                v-for="page in totalPages"
                :key="page"
                @click="changePage(page)"
                :class="[
                  'px-3 py-1 border rounded-md text-sm',
                  page === currentPage
                    ? 'border-indigo-500 bg-indigo-100 text-indigo-700'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                ]"
              >
                {{ page }}
              </button>

              <button
                @click="changePage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                بعدی
              </button>
            </nav>
          </div>

          <!-- مدال تأیید حذف -->
          <div v-if="showDeleteModalProd" class="modal modal-open">
            <div class="modal-box">
              <div class="flex justify-end">
                <h3 class="font-bold text-lg mb-4 mr-3">حذف محصول</h3>
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  class="iconify iconify--twemoji"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    fill="#FFCC4D"
                    d="M2.653 35C.811 35-.001 33.662.847 32.027L16.456 1.972c.849-1.635 2.238-1.635 3.087 0l15.609 30.056c.85 1.634.037 2.972-1.805 2.972H2.653z"
                  ></path>
                  <path
                    fill="#231F20"
                    d="M15.583 28.953a2.421 2.421 0 0 1 2.419-2.418a2.421 2.421 0 0 1 2.418 2.418a2.422 2.422 0 0 1-2.418 2.419a2.422 2.422 0 0 1-2.419-2.419zm.186-18.293c0-1.302.961-2.108 2.232-2.108c1.241 0 2.233.837 2.233 2.108v11.938c0 1.271-.992 2.108-2.233 2.108c-1.271 0-2.232-.807-2.232-2.108V10.66z"
                  ></path>
                </svg>
              </div>

              <p>آیا از حذف این محصول مطمئن هستید؟</p>
              <div class="flex justify-center items-center modal-action mt-4">
                <button
                  type="button"
                  class="btn-wide text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-300/50 dark:shadow-lg dark:shadow-blue-300/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  @click="closeDeleteModal"
                >
                  انصراف
                </button>
                <button
                  type="button"
                  class="btn-wide text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-300/50 dark:shadow-lg dark:shadow-red-300/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  @click="deleteUserConfirmed"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- تب افزودن/ویرایش محصول -->
        <div v-if="activeTab === 'addProduct'">
          <h2 class="text-lg font-medium text-gray-900 mb-6">
            {{ editingProduct ? 'ویرایش محصول' : 'افزودن محصول جدید' }}
          </h2>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="product-name" class="block text-sm font-medium text-gray-700 text-right"
                >نام محصول</label
              >
              <input
                type="text"
                id="product-name"
                v-model="currentProduct.name"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-right"
              />
            </div>

            <div>
              <label for="product-code" class="block text-sm font-medium text-gray-700 text-right"
                >کد محصول</label
              >
              <input
                type="text"
                id="product-code"
                v-model="currentProduct.code"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-right"
              />
            </div>

            <div>
              <label
                for="product-category"
                class="block text-sm font-medium text-gray-700 text-right"
                >دسته‌بندی</label
              >
              <select
                id="product-category"
                v-model="currentProduct.category"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-right"
              >
                <option value="مکمل‌ها">مکمل‌ها</option>
                <option value="لباس">لباس</option>
                <option value="تجهیزات">تجهیزات</option>
              </select>
            </div>

            <div>
              <label for="product-price" class="block text-sm font-medium text-gray-700 text-right"
                >قیمت (تومان)</label
              >
              <input
                type="number"
                id="product-price"
                v-model="currentProduct.price"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-right"
              />
            </div>

            <div>
              <label for="product-stock" class="block text-sm font-medium text-gray-700 text-right"
                >موجودی</label
              >
              <input
                type="number"
                id="product-stock"
                v-model="currentProduct.stock"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-right"
              />
            </div>

            <div>
              <label for="product-status" class="block text-sm font-medium text-gray-700 text-right"
                >وضعیت</label
              >
              <select
                id="product-status"
                v-model="currentProduct.status"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-right"
              >
                <option value="موجود">موجود</option>
                <option value="ناموجود">ناموجود</option>
              </select>
            </div>

            <div class="sm:col-span-2">
              <label
                for="product-description"
                class="block text-sm font-medium text-gray-700 text-right"
                >توضیحات</label
              >
              <textarea
                id="product-description"
                v-model="currentProduct.description"
                rows="3"
                dir="rtl"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-right"
              ></textarea>
            </div>

            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700 text-right">
                تصویر محصول
              </label>
              <div
                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
              >
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="flex text-sm text-gray-600 justify-center">
                    <label
                      for="file-upload"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>آپلود تصویر</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        class="sr-only"
                        @change="handleImageUpload"
                      />
                    </label>
                    <p class="pr-1">یا کشیدن و رها کردن</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF تا 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-6 space-x-3 space-x-reverse">
            <button
              @click="cancelEdit"
              type="button"
              class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              انصراف
            </button>
            <button
              @click="saveProduct"
              type="button"
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              ذخیره
            </button>
          </div>
        </div>

        <!-- تب مدیریت فروش -->
        <div v-if="activeTab === 'sales'">
          <h2 class="text-lg font-medium text-gray-900 mb-6">مدیریت فروش</h2>

          <!-- دکمه افزودن فروش دستی -->
          <div class="mb-6 flex justify-end">
            <button
              @click="showAddSaleModal = true"
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              افزودن فاکتور فروش
            </button>
          </div>

          <!-- مودال افزودن فروش دستی -->
          <div v-if="showAddSaleModal" class="modal modal-open">
            <div class="modal-box w-11/12 max-w-4xl">
              <div
                class="bg-gradient-to-l from-blue-100 to-white rounded-md p-2 flex items-center space-x-4 w-full max-w justify-end"
              >
                <div class="flex items-center justify-end gap-2 rtl">
                  <h3 class="font-bold text-lg">افزودن فاکتور جدید</h3>
                  <!-- آیکون دلخواه (می‌توان حذف یا تغییر داد) -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
                    />
                  </svg>
                </div>
              </div>
              <div class="divider"></div>
              <div class="gap-4 flex flex-col flex-auto p-6">
                <form @submit.prevent="addManualSale">
                  <div class="grid md:grid-cols-2 gap-4">
                    <div class="form-control">
                      <label class="block mb-2 text-sm font-medium text-gray-900">محصول</label>
                      <select
                        dir="rtl"
                        v-model="newSale.product"
                        @change="onProductChange"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-11 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      >
                        <option disabled value="">انتخاب محصول</option>
                        <option
                          v-for="product in availableProducts"
                          :key="product.id"
                          :value="product.name"
                        >
                          {{ product.name }}
                        </option>
                      </select>
                    </div>
                    <div class="form-control">
                      <label class="block mb-2 text-sm font-medium text-gray-900">نام مشتری</label>
                      <input
                        dir="rtl"
                        type="text"
                        v-model="newSale.customer"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-11 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="نام مشتری"
                        required
                      />
                    </div>
                  </div>

                  <div class="grid md:grid-cols-2 gap-4 mt-4">
                    <div class="form-control">
                      <label class="block mb-2 text-sm font-medium text-gray-900"
                        >مبلغ (تومان)</label
                      >
                      <input
                        dir="rtl"
                        type="number"
                        v-model="newSale.amount"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-11 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="مبلغ"
                        required
                      />
                    </div>
                    <div class="form-control">
                      <label class="block mb-2 text-sm font-medium text-gray-900">وضعیت</label>
                      <select
                        dir="rtl"
                        v-model="newSale.status"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-11 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      >
                        <option value="تکمیل شده">تکمیل شده</option>
                        <option value="در حال پردازش">در حال پردازش</option>
                        <option value="لغو شده">لغو شده</option>
                      </select>
                    </div>
                  </div>

                  <div class="flex justify-center items-center modal-action mt-6">
                    <button
                      type="button"
                      @click="showAddSaleModal = false"
                      class="btn-wide text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      لغو
                    </button>
                    <button
                      type="submit"
                      class="btn-wide text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      ذخیره
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <!-- کارت آمار فروش -->
            <div class="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div class="flex items-center justify-between">
                <div class="flex flex-col items-start">
                  <div class="p-3 rounded-full bg-green-100 text-green-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <p class="mt-2 text-xs text-gray-500">
                    <span
                      :class="{
                        'text-green-600 font-medium': !salesChangePercent.startsWith('-'),
                        'text-red-600 font-medium': salesChangePercent.startsWith('-')
                      }"
                    >
                      {{ salesChangePercent }}</span
                    >
                    نسبت به دیروز
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-500">فروش امروز</p>
                  <p class="mt-1 text-2xl font-semibold text-gray-900" dir="rtl">
                    {{ salesToday.toLocaleString('fa-IR') }}&nbsp;&nbsp; تومان
                  </p>
                </div>
              </div>
            </div>

            <!-- کارت تعداد سفارشات -->
            <div class="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div class="flex items-center justify-between">
                <div class="flex flex-col items-start">
                  <div class="p-3 rounded-full bg-blue-100 text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <p class="mt-2 text-xs text-gray-500">
                    <span
                      :class="{
                        'text-green-600 font-medium': !ordersChangePercent.startsWith('-'),
                        'text-red-600 font-medium': ordersChangePercent.startsWith('-')
                      }"
                    >
                      {{ ordersChangePercent }}</span
                    >
                    نسبت به دیروز
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-500">سفارشات امروز</p>
                  <p class="mt-1 text-2xl font-semibold text-gray-900">{{ ordersToday }}</p>
                </div>
              </div>
            </div>

            <!-- کارت محصولات پرفروش -->
            <div class="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div class="flex items-center justify-between">
                <div class="flex flex-col items-start">
                  <div class="p-3 rounded-full bg-purple-100 text-purple-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-500">محصول پرفروش</p>
                  <p class="mt-1 text-xl font-semibold text-gray-900">
                    {{ bestSellingProduct.name }}
                  </p>
                  <p class="text-sm text-gray-500d" dir="rtl">فروش &nbsp;&nbsp;{{ bestSellingProduct.count }} &nbsp;&nbsp;عدد</p>
                </div>
              </div>
            </div>
          </div>

          <!-- جدول فروش اخیر -->
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">فروش اخیر</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200" dir="rtl">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ردیف
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      شماره فاکتور
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      مشتری
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      تاریخ
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      مبلغ
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      وضعیت
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">عملیات</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(sale, index) in paginatedSales" :key="sale.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ index + 1 + ( (currentPageRecentSales - 1) * itemsPerPageRecentSales ) }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ sale.invoice }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ sale.customer }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ sale.date }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900" dir="rtl">
                        {{ sale.amount.toLocaleString('fa-IR') }}&nbsp;&nbsp; تومان
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="[
                          'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                          sale.status === 'تکمیل شده'
                            ? 'bg-green-100 text-green-800'
                            : sale.status === 'در حال پردازش'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        ]"
                      >
                        {{ sale.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        @click="viewSale(sale)"
                        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        جزئیات
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
          </div>
                    <!-- صفحه‌بندی -->
                    <div class="flex flex-col items-center justify-center mt-6 gap-4">
            <div class="text-sm text-gray-500 text-center">
              نمایش نمایش
              <span class="font-medium">
                {{ (currentPageRecentSales - 1) * itemsPerPageRecentSales + 1 }}
              </span>
              تا
              <span class="font-medium">
                {{ Math.min(currentPageRecentSales * itemsPerPageRecentSales, sales.length) }}
              </span>
              از
              <span class="font-medium">{{ sales.length }}</span>
              نتیجه
            </div>

            <nav class="flex flex-wrap justify-center gap-2">
              <button
                @click="changePageSales(currentPageRecentSales - 1)"
                :disabled="currentPageRecentSales === 1"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                قبلی
              </button>

              <button
                v-for="page in totalPagesSale"
                :key="page"
                @click="changePageSales(page)"
                :class="[
                  'px-3 py-1 border rounded-md text-sm',
                  page === currentPageRecentSales
                    ? 'border-indigo-500 bg-indigo-100 text-indigo-700'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                ]"
              >
                {{ page }}
              </button>

              <button
                @click="changePageSales(currentPageRecentSales + 1)"
                :disabled="currentPageRecentSales === totalPagesSale"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                بعدی
              </button>
            </nav>
          </div>
        </div>

        <!-- تب گزارشات مالی -->
        <!-- <div v-if="activeTab === 'reports'" dir="rtl">
          <h2 class="text-lg font-medium text-gray-900 mb-6">گزارشات مالی</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-white rounded-lg shadow p-6 border border-gray-200">
              <h3 class="text-md font-medium text-gray-900 mb-4">فیلترها</h3>
              <div class="space-y-4">
                <div>
                  <label
                    for="report-type"
                    class="block text-sm font-medium text-gray-700 text-right"
                    >نوع گزارش</label
                  >
                  <select
                    id="report-type"
                    v-model="reportType"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-right"
                  >
                    <option value="daily">روزانه</option>
                    <option value="weekly">هفتگی</option>
                    <option value="monthly">ماهانه</option>
                    <option value="custom">سفارشی</option>
                  </select>
                </div>

                <div v-if="reportType === 'custom'">
                  <label for="date-range" class="block text-sm font-medium text-gray-700 text-right"
                    >بازه زمانی</label
                  >
                  <div class="mt-1 flex space-x-2 space-x-reverse">
                    <input
                      type="date"
                      id="start-date"
                      class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-right"
                    />
                    <input
                      type="date"
                      id="end-date"
                      class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-right"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="report-category"
                    class="block text-sm font-medium text-gray-700 text-right"
                    >دسته‌بندی</label
                  >
                  <select
                    id="report-category"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-right"
                  >
                    <option value="all">همه</option>
                    <option value="supplements">مکمل‌ها</option>
                    <option value="clothing">لباس</option>
                    <option value="equipment">تجهیزات</option>
                  </select>
                </div>

                <button
                  type="button"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
                >
                  اعمال فیلتر
                </button>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow p-6 border border-gray-200">
              <h3 class="text-md font-medium text-gray-900 mb-4">خلاصه گزارش</h3>
              <div class="space-y-4">
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-500">تعداد فروش:</span>
                  <span class="text-sm font-medium text-gray-900">{{ salesCount }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-500">درآمد کل:</span>
                  <span class="text-sm font-medium text-gray-900">
                    {{ totalRevenue.toLocaleString('fa-IR') }}&nbsp;&nbsp; تومان
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-500">میانگین فروش:</span>
                  <span class="text-sm font-medium text-gray-900">
                    {{ averageRevenue.toLocaleString('fa-IR') }}&nbsp;&nbsp; تومان
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-500">پرفروش‌ترین محصول:</span>
                  <span class="text-sm font-medium text-gray-900">
                    {{ bestSellingProduct.name }} ({{ bestSellingProduct.count }})&nbsp;&nbsp;عدد
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6 border border-gray-200 mb-6">
            <h3 class="text-md font-medium text-gray-900 mb-4">نمودار فروش ماهانه</h3>
            <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <canvas ref="chartContainer" v-if="salesReport.length > 0"></canvas>
              <p v-else class="text-gray-500">داده‌ای برای نمایش وجود ندارد</p>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">جزئیات فروش</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ردیف
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      تاریخ
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      تعداد فروش
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      درآمد
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(report, index) in salesReport" :key="report.date">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ index + 1 }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ report.date }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ report.total_sales }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ report.total_revenue.toLocaleString('fa-IR') }} تومان
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import ApexCharts from 'apexcharts'
export default {
  name: 'ShopManagement',
  data() {
    return {
      activeTab: 'products',
      currentPage: 1,
      itemsPerPage: 3, // هر صفحه چند محصول نشون بده
      searchQuery: '',
      selectedCategory: 'همه دسته‌بندی‌ها',
      showDeleteModalProd: false,
      prodToDelete: null,
      currentPageRecentSales:1,
      itemsPerPageRecentSales:5,
      tabs: [
        { id: 'products', name: 'مدیریت محصولات' },
        { id: 'sales', name: 'مدیریت فروش' },
        // { id: 'reports', name: 'گزارشات مالی' }
      ],
      products: [],
      sales: [], // لیست فروش‌ها از دیتابیس
      newSale: {
        invoice: '',
        customer: '',
        date: '',
        amount: 0,
        status: 'در حال پردازش',
        product: '',
        name: ''
      },
      showAddSaleModal: false,
      currentProduct: {
        name: '',
        code: '',
        category: 'مکمل‌ها',
        price: 0,
        stock: 0,
        status: 'موجود',
        description: '',
        tag: '',
        image: '',
        brand: ''
      },
      editingProduct: null,
      recentSales: [
        {
          id: 1,
          invoice: 'INV-2023-001',
          customer: 'علی محمدی',
          date: '1402/05/15',
          amount: 1850000,
          status: 'تکمیل شده'
        },
        {
          id: 2,
          invoice: 'INV-2023-002',
          customer: 'رضا احمدی',
          date: '1402/05/14',
          amount: 750000,
          status: 'تکمیل شده'
        },
        {
          id: 3,
          invoice: 'INV-2023-003',
          customer: 'سارا حسینی',
          date: '1402/05/14',
          amount: 1200000,
          status: 'در حال پردازش'
        }
      ],
      reportType: 'daily',
      salesReport: [],
      chart: null

      // salesReports: [
      //   {
      //     date: '1402/05/01',
      //     sales: 24,
      //     revenue: 12500000,
      //     discounts: 750000,
      //     netRevenue: 11750000
      //   },
      //   {
      //     date: '1402/05/02',
      //     sales: 18,
      //     revenue: 9800000,
      //     discounts: 450000,
      //     netRevenue: 9350000
      //   },
      //   {
      //     date: '1402/05/03',
      //     sales: 32,
      //     revenue: 17500000,
      //     discounts: 1200000,
      //     netRevenue: 16300000
      //   }
      // ]
    }
  },
  methods: {
    showSwal(title, text, icon) {
      return Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: 'متوجه شدم',
        confirmButtonColor: '#3085d6',
        timer: icon === 'success' ? 3000 : undefined
      })
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },
    changePageSales(page) {
      if (page >= 1 && page <= this.totalPagesSale) {
        this.currentPageRecentSales = page
      }
    },
    editProduct(product) {
      this.editingProduct = product
      this.currentProduct = { ...product }
      this.activeTab = 'addProduct'
    },
    deleteProduct(product) {
      if (confirm(`آیا از حذف محصول "${product.name}" مطمئن هستید؟`)) {
        this.products = this.products.filter((p) => p.id !== product.id)
      }
    },

    async saveProduct() {
      try {
        const productToSend = {
          name: this.currentProduct.name,
          code: this.currentProduct.code,
          category: this.currentProduct.category,
          price: this.currentProduct.price,
          stock: this.currentProduct.stock,
          // به‌روزرسانی status بر اساس stock
          status: this.currentProduct.stock > 0 ? 'موجود' : 'ناموجود',
          description: this.currentProduct.description,
          tag: this.currentProduct.tag,
          image: this.currentProduct.image,
          brand: this.currentProduct.brand
        }

        if (this.editingProduct) {
          const updatedProduct = { ...productToSend, id: this.editingProduct.id }
          const result = await window.api.updateProduct(updatedProduct)
          if (result.success) {
            const index = this.products.findIndex((p) => p.id === this.editingProduct.id)
            if (index !== -1) this.products.splice(index, 1, updatedProduct)
            await this.showSwal('موفقیت', 'محصول با موفقیت ویرایش شد', 'success')
          } else {
            alert('خطا در ویرایش محصول: ' + (result.error || ''))
          }
        } else {
          const addProdResult = await window.api.addProduct(productToSend)
          if (addProdResult.success) {
            this.products.push(addProdResult.data)
            await this.showSwal('موفقیت', 'محصول با موفقیت اضافه شد', 'success')
          } else {
            alert('خطا در افزودن محصول: ' + (addProdResult.error || ''))
          }
        }

        this.cancelEdit()
        this.activeTab = 'products'
      } catch (error) {
        console.error('Error in saveProduct:', error)
        await this.showSwal('خطا', 'خطا در اضافه کردن محصول', 'error')
      }
    },
    // cancelEdit و بقیه متدها ...
    cancelEdit() {
      this.editingProduct = null
      this.currentProduct = {
        name: '',
        code: '',
        category: 'مکمل‌ها',
        price: 0,
        stock: 0,
        status: 'موجود',
        description: '',
        image: ''
      }
      this.activeTab = 'products'
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.currentProduct.image = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    viewSale(sale) {
      Swal.fire({
        title: `${sale.invoice}جزئیات فاکتور  `,
        html: `
      <div class="text-right rtl font-vazir" dir="rtl">
        <!-- هدر فاکتور -->
        <div class="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 rounded-t-lg shadow-lg">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-2xl font-bold text-white">فاکتور فروش</h3>
              <p class="text-indigo-100 mt-1 text-sm">${sale.date}</p>
            </div>
            <span class="badge badge-lg ${sale.status === 'تکمیل شده' ? 'badge-success' : sale.status === 'در حال پردازش' ? 'badge-warning' : 'badge-error'} text-white">
              ${sale.status}
            </span>
          </div>
        </div>

        <!-- اطلاعات فاکتور -->
        <div class="bg-white p-6 shadow-lg">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-gray-500 text-sm">شماره فاکتور:</p>
              <p class="font-semibold text-gray-800">${sale.invoice}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-gray-500 text-sm">مشتری:</p>
              <p class="font-semibold text-gray-800">${sale.customer}</p>
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <p class="text-gray-500 text-sm">محصول:</p>
            <p class="font-semibold text-gray-800">${sale.name || 'نامشخص'}</p>
          </div>
        </div>

        <!-- خلاصه مالی -->
        <div class="bg-white px-6 pb-6 shadow-lg">
          <h4 class="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">خلاصه مالی</h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">مبلغ فاکتور:</span>
              <span class="font-medium">${sale.amount.toLocaleString('fa-IR')} تومان</span>
            </div>

            <div class="divider my-0"></div>
            <div class="flex justify-between text-lg font-bold pt-1">
              <span class="text-gray-800">مبلغ نهایی:</span>
              <span class="text-indigo-600">${sale.amount.toLocaleString('fa-IR')} تومان</span>
            </div>
          </div>
        </div>

        <!-- فوتر -->
        <div class="bg-indigo-50 p-4 text-center rounded-b-lg border-t border-indigo-100 shadow-lg mb-4">
          <p class="text-indigo-700 font-medium">با تشکر از خرید شما</p>
          <p class="text-sm text-indigo-600 mt-1">پشتیبانی: 09381936400</p>
        </div>
      </div>
    `,
        showCloseButton: true,
        showConfirmButton: false,
        width: '600px',
        padding: '0',
        customClass: {
          popup: 'rounded-xl shadow-xl border border-gray-200',
          closeButton: 'm-4 text-gray-500 hover:text-gray-700'
        }
      })
    },
    confirmDeleteProd(prod) {
      this.prodToDelete = prod
      this.showDeleteModalProd = true
    },
    closeDeleteModal() {
      this.showDeleteModalProd = false
      this.prodToDelete = null
    },
    async deleteUserConfirmed() {
      if (this.prodToDelete) {
        await window.api.deleteProduct(this.prodToDelete.id)
        this.products = this.products.filter((p) => p.id !== this.prodToDelete.id)
        this.closeDeleteModal()
        await this.showSwal('موفقیت', 'محصول با موفقیت حذف شد', 'success')
      }
    },
    //add & update & delete & fetch products
    async fetchProducts() {
      try {
        const products = await window.api.fetchProducts()
        console.log('Fetched products:', products)
        // مطمئن شو مقدار آرایه است
        if (!Array.isArray(products)) {
          console.error('Fetched data is not an array!')
          this.products = []
          return
        }
        this.products = products
      } catch (error) {
        alert('خطا در دریافت محصولات')
        console.error('fetchProducts error:', error)
      }
    },

    async addProduct() {
      try {
        const { name, code, category, price, stock, status, description, tag, image, brand } =
          this.currentProduct

        // منتظر پاسخ از main process بمانید
        const addProdResult = await window.api.addProduct({
          name,
          code,
          category,
          price,
          stock,
          status,
          description,
          tag,
          image,
          brand
        })

        if (addProdResult.success) {
          // اضافه کردن محصول جدید به آرایه products
          this.products.push(addProdResult.data)

          // ذخیره به localStorage (اختیاری)
          localStorage.setItem('products', JSON.stringify(this.products))

          // ریست فرم و بازگشت به تب محصولات
          this.cancelEdit()
          this.activeTab = 'products'
        } else {
          console.error('Error adding product:', addProdResult.error)
          alert('خطا در افزودن محصول: ' + addProdResult.error)
        }
      } catch (error) {
        console.error('Error in addProduct method:', error)
        alert('خطا در افزودن محصول')
      }
    },
    async addSale() {
      if (
        !this.newSale.invoice ||
        !this.newSale.customer ||
        !this.newSale.date ||
        !this.newSale.amount
      ) {
        alert('لطفا همه فیلدها را پر کنید.')
        return
      }
      try {
        const result = await window.api.addSale(this.newSale)
        if (result.success) {
          this.sales.unshift({ ...this.newSale, id: result.id })
          this.fetchSalesReport() // بروزرسانی داده‌های گزارش
          alert('فروش با موفقیت ثبت شد')
          // ریست فرم
          this.newSale = {
            invoice: '',
            customer: '',
            date: '',
            amount: 0,
            status: 'در حال پردازش',
            name: ''
          }
        } else {
          alert('خطا در ثبت فروش: ' + (result.error || ''))
        }
      } catch (error) {
        alert('خطا در ثبت فروش')
        console.error(error)
      }
    },

    async fetchSales() {
      try {
        const sales = await window.api.fetchSales()
        console.log('Fetched sales:', sales)
        if (Array.isArray(sales)) {
          this.sales = sales
        } else {
          this.sales = []
        }
      } catch (error) {
        console.error('fetchSales error:', error)
        this.sales = []
      }
    },
    onProductChange() {
      // وقتی محصول تغییر کرد، اسم محصول انتخاب شده رو توی newSale.name ذخیره کن
      this.newSale.name = this.newSale.product
    },
    async addManualSale() {
      // اعتبارسنجی ساده
      if (!this.newSale.customer || !this.newSale.product || !this.newSale.amount) {
        alert('لطفا همه فیلدها را پر کنید.')
        return
      }

      try {
        // پیدا کردن محصول در آرایه محصولات
        const productIndex = this.products.findIndex((p) => p.name === this.newSale.product)
        if (productIndex === -1) {
          alert('محصول انتخاب شده معتبر نیست.')
          return
        }

        const product = { ...this.products[productIndex] } // کپی محصول برای تغییر

        if (product.stock <= 0) {
          alert('موجودی محصول کافی نیست.')
          return
        }

        // کم کردن یک واحد از موجودی محصول
        product.stock = product.stock - 1
        product.status = product.stock > 0 ? 'موجود' : 'ناموجود'
        // به‌روزرسانی محصول در دیتابیس
        const updateResult = await window.api.updateProduct(product)
        if (!updateResult.success) {
          alert('خطا در به‌روزرسانی موجودی محصول.')
          return
        }

        // به‌روزرسانی آرایه محصولات در فرانت‌اند
        this.products.splice(productIndex, 1, product)

        // آماده‌سازی شیء فروش برای ثبت
        const saleToAdd = {
          invoice: 'INV-' + Math.floor(Math.random() * 10000), // شماره فاکتور تصادفی
          customer: this.newSale.customer,
          date: new Date().toLocaleDateString('fa-IR'),
          amount: parseInt(this.newSale.amount),
          status: this.newSale.status,
          product: this.newSale.product,
          name: this.newSale.name
        }

        // ثبت فروش در دیتابیس
        const result = await window.api.addSale(saleToAdd)

        if (result.success) {
          // اضافه کردن فروش جدید به آرایه sales برای نمایش در جدول
          this.sales.unshift({ ...saleToAdd, id: result.id })
          await this.fetchSalesReport() // اضافه کردن این خط

          await this.showSwal(
            'موفقیت',
            'فروش با موفقیت ثبت شد و موجودی محصول کاهش یافت.',
            'success'
          )

          // ریست فرم
          this.newSale = {
            invoice: '',
            customer: '',
            date: '',
            amount: 0,
            status: 'در حال پردازش',
            product: ''
          }

          this.showAddSaleModal = false
        } else {
          alert('خطا در ثبت فروش: ' + (result.error || ''))
        }
      } catch (error) {
        console.error(error)
        alert('خطا در ثبت فروش')
      }
    },
    initChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = this.$refs.salesChart;
      if (!ctx) return;

      // آماده‌سازی داده‌ها برای نمودار
      const labels = this.salesReport.map(item => item.date);
      const data = this.salesReport.map(item => item.total_revenue);

      this.chart = new ApexCharts(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'فروش ماهانه (تومان)',
            data: data,
            backgroundColor: 'rgba(79, 70, 229, 0.7)',
            borderColor: 'rgba(79, 70, 229, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return value.toLocaleString('fa-IR') + ' تومان';
                }
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.parsed.y.toLocaleString('fa-IR') + ' تومان';
                }
              }
            },
            legend: {
              rtl: true,
              labels: {
                font: {
                  family: 'Vazir, sans-serif'
                }
              }
            }
          }
        }
      });

    },
    async fetchSalesReport() {
      try {
        // فراخوانی IPC برای دریافت داده‌های فروش از Electron
        const salesData = await window.api.fetchSalesReport()
        this.salesReport = salesData // ذخیره داده‌ها در متغیر salesReport
        this.$nextTick(() => {
          this.initChart();
        });
        console.log('salesReport =======> ', this.salesReport)
      } catch (error) {
        console.error('Error fetching sales report:', error)
      }
    },



  },
  mounted() {
    ;(this.fetchProducts(), this.fetchSales(), this.fetchSalesReport(), this.initChart())
  },
  computed: {
    filteredProducts() {
      const keyword = this.searchQuery.trim().toLowerCase()

      return this.products.filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(keyword) ||
          product.code.toLowerCase().includes(keyword) ||
          product.category.toLowerCase().includes(keyword)

        const matchesCategory =
          this.selectedCategory === 'همه دسته‌بندی‌ها' || product.category === this.selectedCategory

        // const isAvailable = product.status === 'موجود'

        return matchesSearch && matchesCategory
      })
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredProducts.slice(start, start + this.itemsPerPage)
    },
    paginatedSales() {
      const start = (this.currentPageRecentSales - 1) * this.itemsPerPageRecentSales
      return this.sales.slice(start, start + this.itemsPerPageRecentSales)
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage)
    },
    totalPagesSale() {
      return Math.ceil(this.sales.length / this.itemsPerPageRecentSales)
    },
    // فروش امروز
    salesToday() {
      // جمع مبلغ فروش‌های امروز
      const today = new Date().toLocaleDateString('fa-IR')
      return this.sales
        .filter((sale) => sale.date === today)
        .reduce((sum, sale) => sum + sale.amount, 0)
    },

    // فروش دیروز
    salesYesterday() {
      const yesterdayDate = new Date()
      yesterdayDate.setDate(yesterdayDate.getDate() - 1)
      const yesterday = yesterdayDate.toLocaleDateString('fa-IR')

      return this.sales
        .filter((sale) => sale.date === yesterday)
        .reduce((sum, sale) => sum + sale.amount, 0)
    },

    // درصد تغییر فروش امروز نسبت به دیروز
    salesChangePercent() {
      const today = this.salesToday
      const yesterday = this.salesYesterday
      if (yesterday === 0) return today === 0 ? '0%' : '100%'
      const change = ((today - yesterday) / yesterday) * 100
      return change.toFixed(2) + '%'
    },

    // تعداد سفارشات دیروز
    ordersYesterday() {
      const yesterdayDate = new Date()
      yesterdayDate.setDate(yesterdayDate.getDate() - 1)
      const yesterday = yesterdayDate.toLocaleDateString('fa-IR')

      return this.sales.filter((sale) => sale.date === yesterday).length
    },

    // درصد تغییر تعداد سفارشات امروز نسبت به دیروز
    ordersChangePercent() {
      const today = this.ordersToday
      const yesterday = this.ordersYesterday
      if (yesterday === 0) return today === 0 ? '0%' : '100%'
      const change = ((today - yesterday) / yesterday) * 100
      return change.toFixed(2) + '%'
    },

    // تعداد سفارشات امروز
    ordersToday() {
      // تعداد سفارش‌های امروز
      const today = new Date().toLocaleDateString('fa-IR')
      return this.sales.filter((sale) => sale.date === today).length
    },

    bestSellingProduct() {
      console.log('sales =======> ', this.sales)

      // اگر داده‌ها هنوز نیومدن (مثلاً undefined یا null)
      if (!this.sales) {
        return { name: 'در حال بارگذاری...', count: 0 }
      }

      // اگر هیچ فروش ثبت نشده
      if (this.sales.length === 0) {
        return { name: 'هیچ محصولی', count: 0 }
      }

      const productCount = {}
      this.sales.forEach((sale) => {
        if (!sale.name) return
        productCount[sale.name] = (productCount[sale.name] || 0) + 1
      })

      if (Object.keys(productCount).length === 0) {
        return { name: 'هیچ محصولی', count: 0 }
      }

      let maxCount = 0
      let bestProduct = ''

      for (const [product, count] of Object.entries(productCount)) {
        if (count > maxCount) {
          maxCount = count
          bestProduct = product
        }
      }

      return { name: bestProduct, count: maxCount }
    },
    availableProducts() {
      return this.products.filter((product) => product.status === 'موجود')
    },
    salesCount() {
      return this.sales.length
    },
    // درآمد کل:
    totalRevenue() {
      return this.sales.reduce((sum, sale) => sum + sale.amount, 0)
    },
    // میانگین فروش:
    averageRevenue() {
      return this.totalRevenue / this.salesCount
    }
    // جزئیات فروش
    // شامل : تاریخ، تعداد فروش، درآمد
    // salesReports() {
    //   return this.sales.map((sale) => ({
    //     date: sale.date,
    //     amount: sale.amount,
    //     revenue: sale.amount * sale.price
    //   }))
    // }
  },
  watch: {
    searchQuery() {
      this.currentPage = 1
    },
    selectedCategory() {
      this.currentPage = 1
    },
    sales() {
      // زمانی که داده‌های فروش تغییر کنند، گزارشات را بروزرسانی می‌کنیم
      this.fetchSalesReport()
    }
  }
}
</script>

<style scoped>
/* استایل‌های سفارشی در صورت نیاز */
</style>
