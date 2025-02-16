import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'


// Custom APIs for renderer
const api = {}

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

// در دسترس قرار دادن توابع از پردازش اصلی به پردازش رندر
// contextBridge.exposeInMainWorld('electron', {
//     getUsers: () => ipcRenderer.invoke('get-users'),
//     addUser: (newUser) => ipcRenderer.invoke('add-user', newUser),
//     updateUser: (updatedUser) => ipcRenderer.invoke('update-user', updatedUser),
//     deleteUser: (userId) => ipcRenderer.invoke('delete-user', userId),
// });