import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const path = require('path');
const sqlite3 = require('better-sqlite3')
const fs = require('fs');
import moment from 'jalali-moment';
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
    // db = new sqlite3.Database(dbPath, (err) => {
    //     if (err) {
    //         console.error('Error opening database', err);
    //     } else {
    //         console.log('Connected to SQLite database at:', dbPath);

    //         db.run(`
    //             CREATE TABLE IF NOT EXISTS users (
    //                 id INTEGER PRIMARY KEY AUTOINCREMENT,
    //                 firstName TEXT,
    //                 lastName TEXT,
    //                 memberId TEXT,
    //                 phone TEXT,
    //                 status TEXT,
    //                 emergencyPhone TEXT,
    //                 address TEXT,
    //                 registrationDate TEXT
    //             )
    //         `, (err) => {
    //             if (err) {
    //                 console.error('Error creating table', err);
    //             } else {
    //                 console.log('Users table is ready.');
    //             }
    //         });
    //         // ایجاد جدول payments
    //         db.run(`
    //         CREATE TABLE IF NOT EXISTS payments (
    //             paymentId INTEGER PRIMARY KEY AUTOINCREMENT,
    //             userId INTEGER,
    //             firstName TEXT,
    //             lastName TEXT,
    //             amount REAL NOT NULL,
    //             paymentDate TEXT DEFAULT CURRENT_TIMESTAMP,
    //             paymentMethod TEXT NOT NULL,
    //             status TEXT DEFAULT 'pending',
    //             FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    //         )
    //       `, (err) => {
    //             if (err) {
    //                 console.error('Error creating payments table', err);
    //             } else {
    //                 console.log('Payments table is ready.');
    //             }
    //         });
    //     }
    // });

        // اتصال به دیتابیس
        try {
            db = new sqlite3(dbPath);  // اتصال به دیتابیس بدون نیاز به callback
            console.log('Connected to SQLite database at:', dbPath);
    
            // ایجاد جدول اگر وجود نداشت
            const stmt = db.prepare(`
                CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstName TEXT,
                lastName TEXT,
                memberId TEXT,
                phone TEXT,
                status TEXT,
                emergencyPhone TEXT,
                address TEXT,
                registrationDate TEXT
                )
            `);
            stmt.run();
            console.log('Users table is ready.');
        } catch (err) {
            console.error('Error opening database', err);
        }

        // ایجاد جدول payments
        try {
            const stmt = db.prepare(`
                CREATE TABLE IF NOT EXISTS payments (
                paymentId INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER,
                firstName TEXT,
                lastName TEXT,
                amount REAL NOT NULL,
                paymentDate TEXT DEFAULT CURRENT_TIMESTAMP,
                paymentMethod TEXT NOT NULL,
                status TEXT DEFAULT 'pending',
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
                )
            `);
            stmt.run();
            console.log('Payments table is ready.');
        } catch (err) {
            console.error('Error creating payments table', err);
        }

        
}

module.exports = { initDatabase, db };

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        show: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false,
            nodeIntegration: true,
        }
    })

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    // close window
    // mainWindow.on('close', (event) => {
    //     const choice = dialog.showMessageBoxSync({
    //         type: 'question',
    //         buttons: ['Yes', 'No'],
    //         defaultId: 0,
    //         message: 'Are you sure you want to quit?'
    //     })

    //     if (choice === 1) {
    //         event.preventDefault()
    //     }
    // })

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

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

    // دریافت کاربران
    ipcMain.handle('fetch-users', async() => {
        return new Promise((resolve, reject) => {
            // db.all("SELECT * FROM users", [], (err, rows) => {
            //     if (err) {
            //         console.error('Error fetching users', err);
            //         reject(err);
            //     } else {
            //         resolve(rows);
            //     }
            // });
            try {
                const stmt = db.prepare("SELECT * FROM users");
                const rows = stmt.all(); // استفاده از all برای دریافت تمامی ردیف‌ها
                resolve(rows);
            } catch (err) {
                console.error('Error fetching users', err);
                reject(err);
            }
        });
    });

    // // دریافت وضعیت کاربر
    // ipcMain.handle('get-user-status', async(_, userId) => {
    //     return new Promise((resolve, reject) => {
    //         db.get('SELECT registrationDate, status FROM users WHERE id = ?', [userId], (err, row) => {
    //             if (err) {
    //                 console.error('Error fetching user status', err);
    //                 reject(err);
    //             } else {
    //                 // تبدیل تاریخ شمسی به میلادی
    //                 // تبدیل تاریخ شمسی به میلادی
    //                 const [year, month, day] = row.registrationDate.split('-').map(Number); // فرض می‌کنیم تاریخ شمسی به فرمت YYYY-MM-DD ذخیره شده
    //                 const gregorianDate = moment(moment.from(row.registrationDate, "fa", "jYYYY/jMM/jDD").locale("en").format("YYYY-MM-DD")); // تبدیل تاریخ شمسی به میلادی

    //                 // تاریخ شمسی به میلادی تبدیل شده
    //                 const registrationDate = new Date(gregorianDate.year(), gregorianDate.month(), gregorianDate.date());

    //                 // محاسبه تاریخ انقضا (یک ماه بعد از تاریخ ثبت‌نام)
    //                 const expirationDate = moment(gregorianDate).add(30, "days");

    //                 const currentTime = new Date();
    //                 // // تاریخ ثبت‌نام کاربر را دریافت کنید
    //                 // const registrationDate = new Date(row.registrationDate);

    //                 // // محاسبه تاریخ انقضا (یک ماه بعد از تاریخ ثبت‌نام)
    //                 // const expirationDate = new Date(registrationDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 روز

    //                 // const currentTime = new Date();

    //                 // اگر تاریخ انقضا گذشته باشد، وضعیت را "منقضی شده" تغییر دهید
    //                 if (currentTime > expirationDate) {
    //                     db.run('UPDATE users SET status = ? WHERE id = ?', ['منقضی شده', userId], function(err) {
    //                         if (err) {
    //                             console.error('Error updating user status', err);
    //                             reject(err);
    //                         } else {
    //                             console.log('User status updated to expired');
    //                         }
    //                     });
    //                 } else {
    //                     // اگر هنوز اعتبار دارند، وضعیت را "فعال" نگه دارید
    //                     db.run('UPDATE users SET status = ? WHERE id = ?', ['فعال', userId], function(err) {
    //                         if (err) {
    //                             console.error('Error updating user status', err);
    //                             reject(err);
    //                         } else {
    //                             console.log('User status updated to enable');
    //                         }
    //                     });
    //                 }

    //                 resolve(row); // بازگرداندن اطلاعات کاربر
    //             }
    //         });
    //     });
    // });

    ipcMain.handle('get-user-status', async (_, userId) => {
        try {
            // دریافت اطلاعات کاربر
            const row = db.prepare('SELECT registrationDate, status FROM users WHERE id = ?').get(userId);
            
            if (!row) {
                throw new Error('User not found');
            }
    
            // تبدیل تاریخ شمسی به میلادی
            const gregorianDate = moment(moment.from(row.registrationDate, "fa", "jYYYY/jMM/jDD").locale("en").format("YYYY-MM-DD"));
    
            // محاسبه تاریخ انقضا (یک ماه بعد از تاریخ ثبت‌نام)
            const expirationDate = moment(gregorianDate).add(30, "days");
            const currentTime = moment();
    
            // بروزرسانی وضعیت کاربر
            let newStatus = 'فعال'; // پیش‌فرض وضعیت فعال است
            if (currentTime.isAfter(expirationDate)) {
                newStatus = 'منقضی شده'; // اگر تاریخ انقضا گذشته باشد، وضعیت به منقضی شده تغییر می‌کند
            }
    
            if (newStatus !== row.status) {
                // فقط در صورتی که وضعیت تغییر کند، آن را به‌روزرسانی می‌کنیم
                db.prepare('UPDATE users SET status = ? WHERE id = ?').run(newStatus, userId);
                console.log(`User status updated to ${newStatus}`);
            }
    
            // بازگرداندن اطلاعات کاربر
            return row;
    
        } catch (err) {
            console.error('Error fetching or updating user status', err);
            throw err;
        }
    });
    

    // افزودن کاربر جدید
    ipcMain.handle('add-user-with-payment', async(_, user) => {
        return new Promise((resolve, reject) => {
            const { firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate, paymentAmount, paymentMethod, paymentStatus } = user;

            db.run(`
                INSERT INTO users (firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `, [firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate], function(err) {
                if (err) {
                    console.error('Error adding user', err);
                    reject(err);
                } else {
                    const userId = this.lastID; // دریافت شناسه کاربر اضافه شده

                    db.run(`
                        INSERT INTO payments (userId, amount, paymentDate, paymentMethod, status)
                        VALUES (?, ?, datetime('now'), ?, ?)
                    `, [userId, paymentAmount, paymentMethod, paymentStatus], function(err) {
                        if (err) {
                            console.error('Error inserting payment', err);
                            reject(err);
                        } else {
                            console.log('User and payment added successfully');
                            resolve({ userId, paymentId: this.lastID });
                        }
                    });
                }
            });
        });
    });

    ipcMain.handle('add-user', async(_, user) => {
    //     return new Promise((resolve, reject) => {
    //         const { firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate } = user;
    //         db.run(`
    //       INSERT INTO users (firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate)
    //       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    //   `, [firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate], function(err) {
    //             if (err) {
    //                 console.error('Error adding user', err);
    //                 reject(err);
    //             } else {
    //                 resolve({ id: this.lastID });
    //             }
    //         });
    //     });
    return new Promise((resolve, reject) => {
        const { firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate } = user;
        db.prepare(`
            INSERT INTO users (firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate);
        resolve({ id: db.prepare("SELECT last_insert_rowid()").get().last_insert_rowid });
    });
    });

    // به‌روزرسانی کاربر
    ipcMain.handle('update-user', async(_, user) => {
    //     return new Promise((resolve, reject) => {
    //         const { id, firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate } = user;
    //         db.run(`
    //       UPDATE users 
    //       SET firstName = ?, lastName = ?, memberId = ?, phone = ?, status = ?, emergencyPhone = ?, address = ?, registrationDate = ?
    //       WHERE id = ?
    //   `, [firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate, id], function(err) {
    //             if (err) {
    //                 console.error('Error updating user', err);
    //                 reject(err);
    //             } else {
    //                 console.log('User Udated successfully');
    //                 resolve({ changes: this.changes });
    //             }
    //         });
    //     });
    return new Promise((resolve, reject) => {
        const { id, firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate } = user;
        db.prepare(`
            UPDATE users 
            SET firstName = ?, lastName = ?, memberId = ?, phone = ?, status = ?, emergencyPhone = ?, address = ?, registrationDate = ?
            WHERE id = ?
        `).run(firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate, id);
        resolve({ changes: db.prepare("SELECT changes()").get().changes });
    });
    });

    // حذف کاربر
    ipcMain.handle('delete-user', async(_, userId) => {
        // return new Promise((resolve, reject) => {
        //     db.run("DELETE FROM users WHERE id = ?", [userId], function(err) {
        //         if (err) {
        //             console.error('Error deleting user', err);
        //             reject(err);
        //         } else {
        //             console.log("ID =>", userId);
        //             console.log('Deleted rows:', this.changes);
        //             resolve({ changes: this.changes });
        //         }
        //     });
        // });
        return new Promise((resolve, reject) => {
            db.prepare("DELETE FROM users WHERE id = ?").run(userId);
            resolve({ changes: db.prepare("SELECT changes()").get().changes });
        });
    });

    // افزودن پرداختی جدید
    ipcMain.handle('add-payment', async(_, payment) => {
        // return new Promise((resolve, reject) => {
        //     const { userId, firstName, lastName, amount, paymentDate, paymentMethod, status } = payment;
        //     db.run(`
        //         INSERT INTO payments (userId, firstName, lastName, amount, paymentDate, paymentMethod, status)
        //         VALUES (?, ?, ?, ?, ?, ?, ?)
        // `, [userId, firstName, lastName, amount, paymentDate, paymentMethod, status], function(err) {
        //         if (err) {
        //             console.error('Error inserting payment', err);
        //             reject(err); // ارسال خطا به renderer
        //         } else {
        //             console.log('Payment added successfully with paymentId:', this.lastID);
        //             resolve({ success: true, paymentId: this.lastID }); // ارسال نتیجه موفقیت
        //         }
        //     });
        // });
        return new Promise((resolve, reject) => {
            const { userId, firstName, lastName, amount, paymentDate, paymentMethod, status } = payment;
            db.prepare(`
                INSERT INTO payments (userId, firstName, lastName, amount, paymentDate, paymentMethod, status)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `).run(userId, firstName, lastName, amount, paymentDate, paymentMethod, status);
            resolve({ success: true, paymentId: db.prepare("SELECT last_insert_rowid()").get().last_insert_rowid });
        });
    });

    // ویرایش پرداختی موجود
    ipcMain.handle('edit-payment', async(_, payment) => {
        // return new Promise((resolve, reject) => {
        //     const { paymentId, userId, firstName, lastName, amount, paymentDate, paymentMethod, status } = payment;
        //     db.run(`
        //     UPDATE payments
        //     SET userId = ?, firstName = ?, lastName = ?, amount = ?, paymentDate = ?, paymentMethod = ?, status = ?
        //     WHERE paymentId = ?
        // `, [userId, firstName, lastName, amount, paymentDate, paymentMethod, status, paymentId], function(err) {
        //         if (err) {
        //             console.error('Error updating payment', err);
        //             reject(err); // ارسال خطا به renderer
        //         } else {
        //             console.log('Payment updated successfully with paymentId:', paymentId);
        //             resolve({ success: true, paymentId: paymentId }); // ارسال نتیجه موفقیت
        //         }
        //     });
        // });
        return new Promise((resolve, reject) => {
            const { paymentId, userId, firstName, lastName, amount, paymentDate, paymentMethod, status } = payment;
            db.prepare(`
                UPDATE payments
                SET userId = ?, firstName = ?, lastName = ?, amount = ?, paymentDate = ?, paymentMethod = ?, status = ?
                WHERE paymentId = ?
            `).run(userId, firstName, lastName, amount, paymentDate, paymentMethod, status, paymentId);
            resolve({ success: true, paymentId: paymentId });
        });
    });

    // دریافت پرداخت ها
    ipcMain.handle('fetch-payments', async() => {
        // return new Promise((resolve, reject) => {
        //     db.all("SELECT * FROM payments", [], (err, rows) => {
        //         if (err) {
        //             console.error('Error fetching payment', err);
        //             reject(err);
        //         } else {
        //             resolve(rows);
        //         }
        //     });
        // });
        return new Promise((resolve, reject) => {
            const rows = db.prepare("SELECT * FROM payments").all();
            resolve(rows);
        });
    });

// 📌 هندل کردن درخواست برای دریافت لیست کاربران جدید
ipcMain.handle("fetch-new-users", async () => {
    return new Promise((resolve, reject) => {
        try {
            const stmt = db.prepare(
                `SELECT 
                  registrationDate,
                  phone,
                  memberId,
                  lastName,
                  firstName
                FROM users
                ORDER BY registrationDate DESC
                LIMIT 5`
            );
            const rows = stmt.all(); // استفاده از all برای دریافت تمامی ردیف‌ها
            resolve(rows);
        } catch (err) {
            console.error('Error fetching users', err);
            reject(err);
        }
    });
});

  

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
//     addUser(user.profilePic, user.firstName, user.memberId, user.status, user.registrationDate, (err, newUser) => {
//         event.reply('user-inserted', err ? { error: err.message } : newUser);
//     });
// });

// ipcMain.on('update-user', (event, user) => {
//     updateUser(user.id, user.profilePic, user.firstName, user.memberId, user.status, user.registrationDate, (err, updatedUser) => {
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