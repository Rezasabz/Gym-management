<template>

<form class="w-full">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="..." required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">جستجو</button>
    </div>
</form>

<div className="overflow-x-auto w-full">



  <div class="p-6">
    <!-- بخش جستجو و دکمه افزودن کاربر -->
    <div class="flex md:flex-row justify-between mb-4 gap-2">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="جستجو براساس نام یا شماره عضویت..."
        class="input input-bordered w-full md:max-w-xs"
      />
      <button class="btn btn-primary" @click="openAddModal">
        افزودن کاربر
      </button>
    </div>

    <!-- جدول کاربران -->
    <div class="overflow-x-auto">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>عکس پروفایل</th>
            <th>نام</th>
            <th>شماره عضویت</th>
            <th>وضعیت عضویت</th>
            <th>تاریخ ثبت‌نام</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>
              <img
                :src="user.profilePic"
                alt="Profile"
                class="w-10 h-10 rounded-full"
              />
            </td>
            <td>{{ user.fullName }}</td>
            <td>{{ user.memberId }}</td>
            <td>
              <span
                :class="{
                  'text-green-500': user.status === 'فعال',
                  'text-red-500': user.status !== 'فعال'
                }"
              >
                {{ user.status }}
              </span>
            </td>
            <td>{{ user.registrationDate }}</td>
            <td>
              <button class="btn btn-sm btn-info mr-2" @click="viewUser(user)">
                نمایش
              </button>
              <button class="btn btn-sm btn-warning mr-2" @click="openEditModal(user)">
                ویرایش
              </button>
              <button class="btn btn-sm btn-error" @click="deleteUser(user.id)">
                حذف
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- مدال افزودن/ویرایش کاربر -->
    <div v-if="showModal" class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">
          {{ isEditMode ? "ویرایش کاربر" : "افزودن کاربر جدید" }}
        </h3>
        <form @submit.prevent="submitForm">
          <div class="form-control">
            <label class="label">
              <span class="label-text">نام کامل</span>
            </label>
            <input
              type="text"
              v-model="newUser.fullName"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control mt-2">
            <label class="label">
              <span class="label-text">شماره عضویت</span>
            </label>
            <input
              type="text"
              v-model="newUser.memberId"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control mt-2">
            <label class="label">
              <span class="label-text">عکس پروفایل (URL)</span>
            </label>
            <input
              type="text"
              v-model="newUser.profilePic"
              class="input input-bordered"
              placeholder="https://..."
            />
          </div>
          <div class="form-control mt-2">
            <label class="label">
              <span class="label-text">وضعیت عضویت</span>
            </label>
            <select
              v-model="newUser.status"
              class="select select-bordered"
            >
              <option value="فعال">فعال</option>
              <option value="منقضی‌شده">منقضی‌شده</option>
            </select>
          </div>
          <div class="form-control mt-2">
            <label class="label">
              <span class="label-text">تاریخ ثبت‌نام</span>
            </label>
            <input
              type="date"
              v-model="newUser.registrationDate"
              class="input input-bordered"
              required
            />
          </div>
          <div class="modal-action mt-4">
            <button type="button" class="btn" @click="closeModal">
              بستن
            </button>
            <button type="submit" class="btn btn-primary">
              {{ isEditMode ? "ویرایش" : "افزودن" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>
<!-- <script>

import { ref, computed } from "vue";

export default {
  name: "UsersTableWithAddModal",
  setup() {
    // داده‌های اولیه کاربران
    const users = ref([
      {
        id: 1,
        profilePic: "https://via.placeholder.com/40",
        fullName: "علی رضایی",
        memberId: "M001",
        status: "فعال",
        registrationDate: "2023-01-01",
      },
      {
        id: 2,
        profilePic: "https://via.placeholder.com/40",
        fullName: "زهرا محمدی",
        memberId: "M002",
        status: "منقضی‌شده",
        registrationDate: "2022-12-15",
      },
    ]);

    // متغیر جستجو
    const searchQuery = ref("");

    // فیلتر کردن کاربران براساس جستجو
    const filteredUsers = computed(() => {
      if (!searchQuery.value) return users.value;
      return users.value.filter(
        (user) =>
          user.fullName.includes(searchQuery.value) ||
          user.memberId.includes(searchQuery.value)
      );
    });

    // مدیریت مدال
    const showModal = ref(false);
    const isEditMode = ref(false);
    const editedUserId = ref(null);
    const newUser = ref({
      fullName: "",
      memberId: "",
      profilePic: "",
      status: "فعال",
      registrationDate: "",
    });

    const resetNewUser = () => {
      newUser.value = {
        fullName: "",
        memberId: "",
        profilePic: "",
        status: "فعال",
        registrationDate: "",
      };
      editedUserId.value = null;
      isEditMode.value = false;
    };

    const openAddModal = () => {
      resetNewUser();
      isEditMode.value = false;
      showModal.value = true;
    };

    const openEditModal = (user) => {
      newUser.value = { ...user };
      editedUserId.value = user.id;
      isEditMode.value = true;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      resetNewUser();
    };

    // ارسال فرم (افزودن یا ویرایش)
    const submitForm = () => {
      if (isEditMode.value) {
        // به روز رسانی کاربر
        users.value = users.value.map((user) =>
          user.id === editedUserId.value ? { ...newUser.value, id: user.id } : user
        );
      } else {
        // افزودن کاربر جدید
        const newId =
          users.value.length > 0
            ? Math.max(...users.value.map((u) => u.id)) + 1
            : 1;
        users.value.push({ ...newUser.value, id: newId });
      }
      closeModal();
    };

    // توابع عملیات
    const viewUser = (user) => {
      alert(`نمایش اطلاعات کاربر: ${user.fullName}`);
    };

    const deleteUser = (id) => {
      if (confirm("آیا از حذف این کاربر مطمئن هستید؟")) {
        users.value = users.value.filter((user) => user.id !== id);
      }
    };

    return {
      users,
      searchQuery,
      filteredUsers,
      showModal,
      newUser,
      isEditMode,
      openAddModal,
      openEditModal,
      closeModal,
      submitForm,
      viewUser,
      deleteUser,
    };
  },
};
</script> -->

<!-- <script>
import { ref, computed, onMounted } from 'vue';

export default {
  name: "UsersTableWithAddModal",
  setup() {
    const users = ref([]);
    const searchQuery = ref("");
    const showModal = ref(false);
    const isEditMode = ref(false);
    const editedUserId = ref(null);
    const newUser = ref({
      fullName: "",
      memberId: "",
      profilePic: "",
      status: "فعال",
      registrationDate: "",
    });

    // دریافت کاربران از دیتابیس هنگام بارگذاری صفحه
    onMounted(async () => {
      users.value = await window.electron.getUsers();
    });

    // فیلتر کردن کاربران براساس جستجو
    const filteredUsers = computed(() => {
      if (!searchQuery.value) return users.value;
      return users.value.filter(
        (user) =>
          user.fullName.includes(searchQuery.value) ||
          user.memberId.includes(searchQuery.value)
      );
    });

    const resetNewUser = () => {
      newUser.value = {
        fullName: "",
        memberId: "",
        profilePic: "",
        status: "فعال",
        registrationDate: "",
      };
      editedUserId.value = null;
      isEditMode.value = false;
    };

    const openAddModal = () => {
      resetNewUser();
      isEditMode.value = false;
      showModal.value = true;
    };

    const openEditModal = (user) => {
      newUser.value = { ...user };
      editedUserId.value = user.id;
      isEditMode.value = true;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      resetNewUser();
    };

    // ارسال فرم (افزودن یا ویرایش)
    const submitForm = async () => {
      if (isEditMode.value) {
        // ویرایش کاربر
        await window.electron.updateUser({ ...newUser.value, id: editedUserId.value });
      } else {
        // افزودن کاربر جدید
        await window.electron.addUser(newUser.value);
      }
      users.value = await window.electron.getUsers();  // به‌روزرسانی لیست کاربران
      closeModal();
    };

    // توابع عملیات
    const viewUser = (user) => {
      alert(`نمایش اطلاعات کاربر: ${user.fullName}`);
    };

    const deleteUser = async (id) => {
      if (confirm("آیا از حذف این کاربر مطمئن هستید؟")) {
        await window.electron.deleteUser(id);
        users.value = await window.electron.getUsers();  // به‌روزرسانی لیست کاربران
      }
    };

    return {
      users,
      searchQuery,
      filteredUsers,
      showModal,
      newUser,
      isEditMode,
      openAddModal,
      openEditModal,
      closeModal,
      submitForm,
      viewUser,
      deleteUser,
    };
  },
};

</script> -->

<script>
export default {
  data() {
    return {
      users: [],
      newUser: {
        fullName: '',
        memberId: '',
        profilePic: '',
        status: 'فعال',
        registrationDate: new Date().toISOString().split('T')[0]
      },
      showModal: false,
      isEditMode: false,
      searchQuery: '',
      selectedUser: null
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => 
        user.fullName.includes(this.searchQuery) || 
        user.memberId.includes(this.searchQuery)
      );
    }
  },
  methods: {
    async fetchUsers() {
      try {
        this.users = await window.api.getUsers();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    openAddModal() {
      this.newUser = {
        fullName: '',
        memberId: '',
        profilePic: '',
        status: 'فعال',
        registrationDate: new Date().toISOString().split('T')[0]
      };
      this.isEditMode = false;
      this.showModal = true;
    },
    openEditModal(user) {
      this.selectedUser = { ...user };
      this.newUser = { ...user };
      this.isEditMode = true;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async submitForm() {
      if (this.isEditMode) {
        await this.updateUser();
      } else {
        await this.addUser();
      }
      await this.fetchUsers();
      this.closeModal();
    },
    async addUser() {
      try {
        console.log("New User Data:", this.newUser); // بررسی مقدار قبل از ارسال
        const addedUser = await window.api.addUser({ ...this.newUser }); // ارسال نسخه‌ای از شیء
        if (addedUser) {
          this.users.push(addedUser);
        }
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
    async updateUser() {
      try {
        await window.api.updateUser({ ...this.newUser });
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    async deleteUser(userId) {
      try {
        await window.api.deleteUser({ ...this.newUser });
        this.users = this.users.filter(user => user.id !== userId);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  },
  async mounted() {
    await this.fetchUsers();
  }
};

</script>