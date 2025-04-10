import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'


// Custom APIs for renderer
// const api = {}
// توابع سفارشی برای پردازش رندر
const api = {
    invoke: (channel, data) => ipcRenderer.invoke(channel, data),
    getUsers: () => ipcRenderer.invoke('fetch-users'),
    getUserStatus: (userId) => ipcRenderer.invoke('get-user-status', userId),
    addUser: (newUser) => ipcRenderer.invoke('add-user', newUser),
    updateUser: (updatedUser) => ipcRenderer.invoke('update-user', updatedUser),
    deleteUser: (userId) => ipcRenderer.invoke('delete-user', userId),
    addPayment: (paymentData) => ipcRenderer.invoke('add-payment', paymentData),
    getPayments: () => ipcRenderer.invoke('fetch-payments'),
    editPayments: (editPayments) => ipcRenderer.invoke('edit-payment', editPayments),
    // افزودن کاربر همراه با اطلاعات پرداخت
    addUserWithPayment: (userData) => ipcRenderer.invoke('add-user-with-payment', userData),
    // ویرایش کاربر همراه با اطلاعات پرداخت
    updateUserWithPayment: (userData) => ipcRenderer.invoke('update-user-with-payment', userData),
    // دریافت جدیدترین اعضا
    getLatestUsers: () => ipcRenderer.invoke('fetch-new-users'),
    fetchActiveMembersCount: () => ipcRenderer.invoke('fetch-active-members-count'),
    fetchDebtors: () => ipcRenderer.invoke('fetch-debtors'),
    fetchCurrentMonthRevenue: () => ipcRenderer.invoke('fetch-current-month-revenue'),
    fetchNewMembersCount: () => ipcRenderer.invoke('fetch-new-members-count'),
    addRenewals: (renewal) => ipcRenderer.invoke('add-renewals', renewal),
    updateUserStatus: (userId, status) => ipcRenderer.invoke('update-user-status', userId, status),
    checkUserStatus: (userId) => ipcRenderer.invoke('check-user-status', userId),
    fetchRenewals: () => ipcRenderer.invoke('fetch-renewals'),
    // اضافه کردن لیسنر برای آپدیت وضعیت کاربر
    onUserStatusUpdated: (callback) => {
        ipcRenderer.on("user-status-updated", (event, data) => callback(data));
    },

    removeUserStatusListener: () => {
        ipcRenderer.removeAllListeners("user-status-updated");
    }

}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI)
        contextBridge.exposeInMainWorld('api', api)
    } catch (error) {
        console.error(error)
    }
} else {
    window.electron = electronAPI
    window.api = api
}

// contextBridge.exposeInMainWorld('electron', {
//     invoke: (channel, data) => ipcRenderer.invoke(channel, data)
// });
// در دسترس قرار دادن توابع از پردازش اصلی به پردازش رندر
// contextBridge.exposeInMainWorld('electron', {
//     getUsers: () => ipcRenderer.invoke('get-users'),
//     addUser: (newUser) => ipcRenderer.invoke('add-user', newUser),
//     updateUser: (updatedUser) => ipcRenderer.invoke('update-user', updatedUser),
//     deleteUser: (userId) => ipcRenderer.invoke('delete-user', userId),
// });