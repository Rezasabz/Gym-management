import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
// import { addUser, updateUser, deleteUser, getUsers } from './database/database.js';

let db;

function initDatabase() {
    // مسیر ذخیره دیتابیس در پوشه database در دایرکتوری پروژه
    const dbPath = path.join(process.cwd(), 'database', 'database.sqlite');
    console.log('Database Path:', dbPath); // مسیر را در کنسول چاپ کنید

    // بررسی و ایجاد پوشه database در صورت نیاز
    const dbDir = path.dirname(dbPath);
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
        console.log('Created database directory:', dbDir);
    }

    // اتصال به دیتابیس
    db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database', err);
        } else {
            console.log('Connected to SQLite database at:', dbPath);

            db.run(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    profilePic TEXT,
                    fullName TEXT,
                    memberId TEXT,
                    status TEXT,
                    registrationDate TEXT
                )
            `, (err) => {
                if (err) {
                    console.error('Error creating table', err);
                } else {
                    console.log('Users table is ready.');
                }
            });
        }
    });
}

module.exports = { initDatabase, db };

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false
        }
    })

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    // IPC test
    ipcMain.on('ping', () => console.log('pong'))
    initDatabase();

    createWindow()

    app.on('activate', function() {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('before-quit', () => {
    db.close();
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
// مدیریت پیام‌های ارتباطی بین Renderer و Main

// ipcMain.on('insert-user', (event, user) => {
//     addUser(user.profilePic, user.fullName, user.memberId, user.status, user.registrationDate, (err, newUser) => {
//         event.reply('user-inserted', err ? { error: err.message } : newUser);
//     });
// });

// ipcMain.on('update-user', (event, user) => {
//     updateUser(user.id, user.profilePic, user.fullName, user.memberId, user.status, user.registrationDate, (err, updatedUser) => {
//         event.reply('user-updated', err ? { error: err.message } : updatedUser);
//     });
// });

// ipcMain.on('delete-user', (event, userId) => {
//     deleteUser(userId, (err) => {
//         event.reply('user-deleted', err ? { error: err.message } : { id: userId });
//     });
// });

// ipcMain.on('fetch-users', (event) => {
//     getUsers((err, users) => {
//         event.reply('users-fetched', err ? { error: err.message } : users);
//     });
// });
// هنگام باز شدن پنجره، کاربران را از دیتابیس بخوانید
// ipcMain.handle('get-users', async() => {
//     return await getUsers();
// });

// // افزودن کاربر جدید
// ipcMain.handle('add-user', async(event, newUser) => {
//     await addUser(newUser);
//     return await getUsers(); // بازگشت به‌روزرسانی شده کاربران
// });

// // ویرایش کاربر
// ipcMain.handle('update-user', async(event, updatedUser) => {
//     await updateUser(updatedUser);
//     return await getUsers();
// });

// // حذف کاربر
// ipcMain.handle('delete-user', async(event, userId) => {
//     await deleteUser(userId);
//     return await getUsers();
// });