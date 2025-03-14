<template>
        <!-- Sidebar -->
        <!-- <Sidebar /> -->
   
<div className="grid grid-cols-5 grid-rows gap-4 mb-4 shadow-lg">
    <div className="col-span-5">
      <figure>
            <img
               src="../assets/img/header-2.png"
               alt="Shoes" />
         </figure>
    </div>
</div>
    <br>


      <div class="grid grid-cols-3 gap-4 mb-4">
         <div class="bg-white shadow-lg rounded-xl p-4 flex items-center space-x-4 w-full max-w-md">
        <!-- آیکون -->
        <div class="flex items-center justify-center w-16 h-16 bg-purple-50 rounded-full">
            <span class="text-green-600 text-3xl">
               <svg class="w-6 h-6 text-purple-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
               <path fill-rule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
               </svg>

            </span>
        </div>
        <!-- متن و نوار پیشرفت -->
        <div class="flex-1">
            <h3 class="text-gray-600 text-sm">اعضا جدید در ماه جاری</h3>
            <p class="custom-rtl text-2xl font-bold text-gray-900">10 نفر</p>
        </div>
    </div>
    <div class="bg-white shadow-lg rounded-xl p-4 flex items-center space-x-4 w-full max-w-md">
        <!-- آیکون -->
        <div class="flex items-center justify-center w-16 h-16 bg-green-50 rounded-full">
            <span class="text-green-600 text-3xl">
               <svg class="w-6 h-6 text-green-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M7 6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2v-4a3 3 0 0 0-3-3H7V6Z" clip-rule="evenodd"/>
            <path fill-rule="evenodd" d="M2 11a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7Zm7.5 1a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" clip-rule="evenodd"/>
            <path d="M10.5 14.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
            </svg>

            </span>
        </div>
        <!-- متن و نوار پیشرفت -->
        <div class="flex-1">
            <h3 class="text-gray-600 text-sm">درآمد ماه جاری</h3>
            <p class="custom-rtl text-2xl font-bold text-gray-900">100,000,000 تومان</p>
        </div>
    </div>
    <div class="bg-white shadow-lg rounded-xl p-4 flex items-center space-x-4 w-full max-w-md">
        <!-- آیکون -->
        <div class="flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full">
            <span class="text-green-600 text-3xl">
               <svg class="w-6 h-6 text-blue-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
               <path fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z" clip-rule="evenodd"/>
               </svg>

            </span>
        </div>
        <!-- متن و نوار پیشرفت -->
        <div class="flex-1">
            <h3 class="text-gray-600 text-sm">تعداد اعضا فعال</h3>
            <p class="custom-rtl text-2xl font-bold text-gray-900">120 نفر</p>
            <!-- <div class="relative w-full h-2 bg-gray-200 rounded-full mt-2">
                <div class="absolute top-0 left-0 h-2 bg-green-500 rounded-full" style="width: 42%;"></div>
            </div> -->
        </div>
    </div>
      </div>


      
<div class="grid grid-cols-3 gap-4">
    <!-- اعضای جدید -->
    <div class="col-span-2 p-4 bg-white shadow-lg rounded-xl">
      <div class="bg-white rounded-xl flex items-center space-x-4 w-full max-w">
        <!-- آیکون -->
        <div class="flex items-center justify-center w-16 h-16 bg-green-50 rounded-full">
            <span class="text-green-600 text-3xl">
               <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="12" cy="6" r="4" fill="#16C47F"/>
               <path opacity="0.5" d="M18.0947 15.0312C17.6699 15 17.1487 15 16.5 15C14.8501 15 14.0251 15 13.5126 15.5126C13 16.0251 13 16.8501 13 18.5C13 19.6663 13 20.4204 13.1811 20.9433C12.7971 20.9806 12.4025 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C14.6134 13 16.8924 13.8184 18.0947 15.0312Z" fill="#16C47F"/>
               <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 22C14.8501 22 14.0251 22 13.5126 21.4874C13 20.9749 13 20.1499 13 18.5C13 16.8501 13 16.0251 13.5126 15.5126C14.0251 15 14.8501 15 16.5 15C18.1499 15 18.9749 15 19.4874 15.5126C20 16.0251 20 16.8501 20 18.5C20 20.1499 20 20.9749 19.4874 21.4874C18.9749 22 18.1499 22 16.5 22ZM17.0833 16.9444C17.0833 16.6223 16.8222 16.3611 16.5 16.3611C16.1778 16.3611 15.9167 16.6223 15.9167 16.9444V17.9167H14.9444C14.6223 17.9167 14.3611 18.1778 14.3611 18.5C14.3611 18.8222 14.6223 19.0833 14.9444 19.0833H15.9167V20.0556C15.9167 20.3777 16.1778 20.6389 16.5 20.6389C16.8222 20.6389 17.0833 20.3777 17.0833 20.0556V19.0833H18.0556C18.3777 19.0833 18.6389 18.8222 18.6389 18.5C18.6389 18.1778 18.3777 17.9167 18.0556 17.9167H17.0833V16.9444Z" fill="#16C47F"/>
               </svg>

            </span>
        </div>
        <!-- متن و نوار پیشرفت -->
        <div class="flex-1">
            <h3 class="text-lg font-semibold">جدیدترین اعضا ثبت نام شده</h3>
        </div>
    </div>
    <!-- divider -->
    <div className="dahsed-border"></div>

    <table class="table w-full">
                <thead class="bgl-success">
                    <tr>
                       <th class="text-right">تاریخ ثبت‌نام</th>
                       <th class="text-right">شماره موبایل</th>
                       <th class="text-right">شماره عضویت</th>
                       <th class="text-right">نام خانوادگی</th>
                       <th class="text-right">نام</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in filteredUsers" :key="user.id">
                       <td class="font-semibold">{{ user.registrationDate }}</td>
                       <td class="font-bold">{{ user.phone }}</td>
                       <td class="font-bold">{{ user.memberId }}</td>
                       <td class="font-semibold">{{ user.lastName }}</td>
                       <td class="font-semibold">{{ user.firstName }}</td>
                    </tr>
                </tbody>
            </table>
    </div>

    <!-- لیست بدهکاران -->
    <div class="p-4 bg-white shadow-lg rounded-xl">
      <div class="bg-white rounded-xl flex items-center space-x-4 w-full max-w-md">
        <!-- آیکون -->
        <div class="flex items-center justify-center w-16 h-16 bg-red-50 rounded-full">
            <span class="text-green-600 text-3xl">
               <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <circle cx="12" cy="6" r="4" fill="#E52020"/>
                     <path fill-rule="evenodd" clip-rule="evenodd" d="M18 15.75C16.7574 15.75 15.75 16.7574 15.75 18C15.75 18.3473 15.8287 18.6763 15.9693 18.97L18.9701 15.9693C18.6763 15.8287 18.3474 15.75 18 15.75ZM20.0307 17.0299L17.0299 20.0307C17.3236 20.1713 17.6526 20.25 18 20.25C19.2426 20.25 20.25 19.2426 20.25 18C20.25 17.6526 20.1713 17.3237 20.0307 17.0299ZM14.25 18C14.25 15.9289 15.9289 14.25 18 14.25C20.0711 14.25 21.75 15.9289 21.75 18C21.75 20.0711 20.0711 21.75 18 21.75C15.9289 21.75 14.25 20.0711 14.25 18Z" fill="#E52020"/>
                     <path opacity="0.5" d="M17.2157 14.3321C15.5211 14.6927 14.25 16.1979 14.25 18C14.25 18.9823 14.6277 19.8764 15.2457 20.5449C14.2756 20.8356 13.1714 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C14.0722 13 15.934 13.5145 17.2157 14.3321Z" fill="#E52020"/>
                     </svg>

            </span>
        </div>
        <!-- متن و نوار پیشرفت -->
        <div class="flex-1">
            <h3 class="text-lg font-semibold">لیست بدهکاران</h3>
        </div>
    </div>
    <div className="dahsed-border"></div>
    <table class="table w-full mt-2">
                <!-- head -->
                <thead class="bgl-success">
                    <tr>
                       <th class="text-right">نام خانوادگی</th>
                       <th class="text-right">نام</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in filteredUsers" :key="user.id">
                       <td class="font-semibold">{{ user.lastName }}</td>
                       <td class="font-semibold">{{ user.firstName }}</td>
                    </tr>
                </tbody>
            </table>
    </div>
    </div>

    
<br>



</template>
<script setup>
import Sidebar from './Sidebar.vue'
</script>