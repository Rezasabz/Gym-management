import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const path = require('path')
const sqlite3 = require('better-sqlite3')
const fs = require('fs')
import moment from 'jalali-moment'
const crypto = require('crypto')
const https = require('https');
// import { addUser, updateUser, deleteUser, getUsers } from './database/database.js';

let db
let isExiting = false
let mainWindow
let exitDialog
function initDatabase() {
  // مسیر ذخیره دیتابیس در پوشه database در دایرکتوری پروژه
  const dbPath = path.join(process.cwd(), 'database', 'database.sqlite')
  console.log('Database Path:', dbPath) // مسیر را در کنسول چاپ کنید

  // بررسی و ایجاد پوشه database در صورت نیاز
  const dbDir = path.dirname(dbPath)
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true })
    console.log('Created database directory:', dbDir)
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
    db = new sqlite3(dbPath) // اتصال به دیتابیس بدون نیاز به callback
    console.log('Connected to SQLite database at:', dbPath)

    // ایجاد جدول اگر وجود نداشت
    const stmt = db.prepare(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    firstName TEXT,
                    lastName TEXT,
                    memberId TEXT,
                    phone TEXT,
                    status TEXT, -- active, expired
                    emergencyPhone TEXT,
                    address TEXT,
                    registrationDate TEXT, -- تاریخ ثبت‌نام اولیه
                    renewal_duration INTEGER, -- مدت‌زمان دوره اولیه (مثلاً 1 ماه)
                    expirationDate TEXT, -- تاریخ انقضای عضویت فعلی
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `)
    stmt.run()
    console.log('Users table is ready.')
  } catch (err) {
    console.error('Error opening database', err)
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
            `)
    stmt.run()
    console.log('Payments table is ready.')
  } catch (err) {
    console.error('Error creating payments table', err)
  }

  // ایجاد جدول renewal
  try {
    const stmt = db.prepare(`
                    CREATE TABLE IF NOT EXISTS renewals (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        user_id INTEGER,
                        renewal_date TEXT, -- تاریخ تمدید
                        duration INTEGER, -- مدت‌زمان تمدید (مثلاً 3 ماه)
                        new_expiration_date TEXT, -- تاریخ جدید انقضا
                        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                    )
                `)
    stmt.run()
    console.log('Renewals table is ready.')
  } catch (err) {
    console.error('Error creating Renewals table', err)
  }

  // ایجاد جدول محصولات اگر وجود ندارد
  try {
    const stmt = db.prepare(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        code TEXT,
        category TEXT,
        price INTEGER,
        stock INTEGER,
        status TEXT,
        description TEXT,
        tag TEXT,
        image TEXT,
        brand TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    stmt.run()
    console.log('products table is ready.')
  } catch (err) {
    console.error('Error creating Renewals table', err)
  }

  // add sales table
  // ایجاد جدول فروش (sales) اگر وجود ندارد
  try {
    const stmt = db.prepare(`
      CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        invoice TEXT,
        customer TEXT,
        date TEXT,
        amount INTEGER,
        status TEXT,
        name TEXT
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    stmt.run()
    console.log('sales table is ready.')
  } catch (err) {
    console.error('Error creating sales table', err)
  }

  // try {
  //   db.prepare('ALTER TABLE members ADD COLUMN recovery_key_hash TEXT').run()
  // } catch (e) { /* ستون از قبل وجود دارد */ }
}

module.exports = { initDatabase, db }
// function createExitDialog(parentWindow) {
//   // استفاده از دیالوگ استاندارد اما با ظاهر بهتر
//   dialog
//     .showMessageBox(parentWindow, {
//       type: 'question',
//       buttons: ['لغو', 'خروج'],
//       defaultId: 0,
//       cancelId: 0,
//       title: 'تأیید خروج',
//       message: 'آیا مطمئن هستید که می‌خواهید از برنامه خارج شوید؟',
//       detail: 'تغییرات ذخیره نشده ممکن است از بین بروند.',
//       icon: join(__dirname, '../../resources/icon.png'), // آیکون برنامه
//       noLink: true
//     })
//     .then((result) => {
//       if (result.response === 1) {
//         isExiting = true
//         if (mainWindow) {
//           mainWindow.destroy()
//         }
//       }
//     })
// }

async function createExitDialog(parentWindow) {
  const result = await dialog.showMessageBox(parentWindow, {
    type: 'question',
    buttons: ['خروج', 'لغو'],
    defaultId: 1,
    cancelId: 1,
    title: 'تأیید خروج',
    message: 'آیا مطمئن هستید که می‌خواهید از برنامه خارج شوید؟',
    detail: '.تغییرات ذخیره نشده ممکن است از بین بروند',
    noLink: true,
    icon: join(__dirname, '../../resources/icon.png')
  })

  if (result.response === 0) {
    // اگر کاربر "خروج" را انتخاب کرد
    isExiting = true
    mainWindow.destroy()
  }
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      devTools: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // غیرفعال کردن منوی راست کلیک
  mainWindow.webContents.on('context-menu', (e) => {
    e.preventDefault()
  })

  // غیرفعال کردن کلیدهای میانبر DevTools
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (
      input.key === 'F12' ||
      (input.control && input.key === 'Shift+I') ||
      (input.control && input.key === 'Shift+C') ||
      (input.control && input.key === 'U') ||
      input.key === 'F5'
    ) {
      event.preventDefault()
    }
  })

  // و در رویداد close اصلی:
  mainWindow.on('close', async (event) => {
    if (!isExiting) {
      event.preventDefault()

      // اگر دیالوگ قبلاً باز است، آن را جلو بیاور
      if (exitDialog && !exitDialog.isDestroyed()) {
        exitDialog.focus()
        return
      }

      // ایجاد دیالوگ زیبا
      createExitDialog(mainWindow)
    }
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
  initDatabase()

  // دریافت کاربران
  ipcMain.handle('fetch-users', async () => {
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
        const stmt = db.prepare('SELECT * FROM users')
        const rows = stmt.all() // استفاده از all برای دریافت تمامی ردیف‌ها
        resolve(rows)
      } catch (err) {
        console.error('Error fetching users', err)
        reject(err)
      }
    })
  })

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
      const row = db.prepare('SELECT registrationDate, status FROM users WHERE id = ?').get(userId)

      if (!row) {
        throw new Error('User not found')
      }

      // تبدیل تاریخ شمسی به میلادی
      const gregorianDate = moment(
        moment.from(row.registrationDate, 'fa', 'jYYYY/jMM/jDD').locale('en').format('YYYY-MM-DD')
      )

      // محاسبه تاریخ انقضا (یک ماه بعد از تاریخ ثبت‌نام)
      const expirationDate = moment(gregorianDate).add(30, 'days')
      const currentTime = moment()

      // بروزرسانی وضعیت کاربر
      let newStatus = 'فعال' // پیش‌فرض وضعیت فعال است
      if (currentTime.isAfter(expirationDate)) {
        newStatus = 'منقضی شده' // اگر تاریخ انقضا گذشته باشد، وضعیت به منقضی شده تغییر می‌کند
      }

      if (newStatus !== row.status) {
        // فقط در صورتی که وضعیت تغییر کند، آن را به‌روزرسانی می‌کنیم
        db.prepare('UPDATE users SET status = ? WHERE id = ?').run(newStatus, userId)
        console.log(`User status updated to ${newStatus}`)
      }

      // بازگرداندن اطلاعات کاربر
      return row
    } catch (err) {
      console.error('Error fetching or updating user status', err)
      throw err
    }
  })

  // افزودن کاربر جدید
  ipcMain.handle('add-user-with-payment', async (_, user) => {
    return new Promise((resolve, reject) => {
      const {
        firstName,
        lastName,
        memberId,
        phone,
        status,
        emergencyPhone,
        address,
        registrationDate,
        paymentAmount,
        paymentMethod,
        paymentStatus
      } = user

      db.run(
        `
                INSERT INTO users (firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `,
        [firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate],
        function (err) {
          if (err) {
            console.error('Error adding user', err)
            reject(err)
          } else {
            const userId = this.lastID // دریافت شناسه کاربر اضافه شده

            db.run(
              `
                        INSERT INTO payments (userId, amount, paymentDate, paymentMethod, status)
                        VALUES (?, ?, datetime('now'), ?, ?)
                    `,
              [userId, paymentAmount, paymentMethod, paymentStatus],
              function (err) {
                if (err) {
                  console.error('Error inserting payment', err)
                  reject(err)
                } else {
                  console.log('User and payment added successfully')
                  resolve({ userId, paymentId: this.lastID })
                }
              }
            )
          }
        }
      )
    })
  })

  ipcMain.handle('add-user', async (_, user) => {
    // return new Promise((resolve, reject) => {
    //     const { firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate } = user;
    //     db.run(`
    //       INSERT INTO users (firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate)
    //       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    //   `, [firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate], function(err) {
    //         if (err) {
    //             console.error('Error adding user', err);
    //             reject(err);
    //         } else {
    //             resolve({ id: this.lastID });
    //         }
    //     });
    // });
    // return new Promise((resolve, reject) => {
    //     const { firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate } = user;
    //     db.prepare(`
    //     INSERT INTO users (firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate)
    //     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    // `).run(firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate);
    //     // resolve({ id: db.prepare("SELECT last_insert_rowid()").get().last_insert_rowid });
    //     resolve({ id: this.lastID });
    // });

    // return new Promise((resolve, reject) => {
    //     db.run(`
    //         INSERT INTO users (firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate)
    //         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    //     `, [firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate], function(err) {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve({ id: this.lastID });
    //         }
    //     });
    // });

    try {
      const stmt = db.prepare(`
                INSERT INTO users (firstName, lastName, memberId, phone, status, emergencyPhone, address, registrationDate, renewal_duration, expirationDate)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `)

      const result = stmt.run(
        user.firstName ?? null,
        user.lastName ?? null,
        user.memberId ?? null,
        user.phone ?? null,
        user.status ?? null,
        user.emergencyPhone ?? null,
        user.address ?? null,
        user.registrationDate ?? null,
        user.renewal_duration ?? null,
        user.expirationDate ?? null
      )

      return { id: result.lastInsertRowid }
    } catch (err) {
      console.error('Error adding user:', err)
      throw err
    }
  })

  // به‌روزرسانی کاربر
  ipcMain.handle('update-user', async (_, user) => {
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
      const {
        id,
        firstName,
        lastName,
        memberId,
        phone,
        status,
        emergencyPhone,
        address,
        registrationDate,
        renewal_duration,
        expirationDate
      } = user
      db.prepare(
        `
            UPDATE users 
            SET firstName = ?, lastName = ?, memberId = ?, phone = ?, status = ?, emergencyPhone = ?, address = ?, registrationDate = ?, renewal_duration = ?, expirationDate = ?
            WHERE id = ?
        `
      ).run(
        firstName,
        lastName,
        memberId,
        phone,
        status,
        emergencyPhone,
        address,
        registrationDate,
        renewal_duration,
        expirationDate,
        id
      )
      resolve({ changes: db.prepare('SELECT changes()').get().changes })
      // resolve({ changes: this.changes });
    })
  })

  ipcMain.handle('update-user-expiration', async (_, { id, expirationDate }) => {
    db.prepare('UPDATE users SET expirationDate = ? WHERE id = ?').run(expirationDate, id)
    return { success: true }
  })

  // حذف کاربر
  ipcMain.handle('delete-user', async (_, userId) => {
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
      db.prepare('DELETE FROM users WHERE id = ?').run(userId)
      resolve({ changes: db.prepare('SELECT changes()').get().changes })
    })
  })

  // افزودن پرداختی جدید
  ipcMain.handle('add-payment', async (_, payment) => {
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
      const { userId, firstName, lastName, amount, paymentDate, paymentMethod, status } = payment
      db.prepare(
        `
                INSERT INTO payments (userId, firstName, lastName, amount, paymentDate, paymentMethod, status)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `
      ).run(userId, firstName, lastName, amount, paymentDate, paymentMethod, status)
      resolve({
        success: true,
        paymentId: db.prepare('SELECT last_insert_rowid()').get().last_insert_rowid
      })
    })
  })

  // ویرایش پرداختی موجود
  ipcMain.handle('edit-payment', async (_, payment) => {
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
      const { paymentId, userId, firstName, lastName, amount, paymentDate, paymentMethod, status } =
        payment
      db.prepare(
        `
                UPDATE payments
                SET userId = ?, firstName = ?, lastName = ?, amount = ?, paymentDate = ?, paymentMethod = ?, status = ?
                WHERE paymentId = ?
            `
      ).run(userId, firstName, lastName, amount, paymentDate, paymentMethod, status, paymentId)
      resolve({ success: true, paymentId: paymentId })
    })
  })

  // دریافت پرداخت ها
  ipcMain.handle('fetch-payments', async () => {
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
      const rows = db.prepare('SELECT * FROM payments').all()
      resolve(rows)
    })
  })

  ipcMain.handle('fetch-debtors', async () => {
    try {
      const stmt = db.prepare(`
                SELECT 
                    userId, 
                    firstName, 
                    lastName, 
                    amount, 
                    paymentDate, 
                    paymentMethod
                FROM payments
                WHERE status = 'پرداخت نشده'
                ORDER BY paymentDate DESC
            `)
      return stmt.all() // دریافت لیست بدهکاران
    } catch (err) {
      console.error('Error fetching debtors:', err)
      throw err
    }
  })

  // 📌 درآمد ماه جاری
  ipcMain.handle('fetch-current-month-revenue', async () => {
    try {
      // دریافت سال و ماه جاری شمسی
      const currentJalaliYearMonth = moment().format('jYYYY/jMM')

      const stmt = db.prepare(`
            SELECT SUM(amount) AS totalRevenue
            FROM payments
            WHERE status = 'پرداخت شده'
            AND substr(paymentDate, 1, 7) = ?
        `)
      const result = stmt.get(currentJalaliYearMonth)

      return result.totalRevenue || 0 // اگر مقدار null بود، 0 برگردان
    } catch (err) {
      console.error('Error fetching current month revenue:', err)
      throw err
    }
  })

  // 📌 تعداد افراد جدید در ماه جاری
  ipcMain.handle('fetch-new-members-count', async () => {
    try {
      // دریافت سال و ماه جاری شمسی با فرمت صحیح
      const currentJalaliYearMonth = moment().format('jYYYY/jMM')

      const stmt = db.prepare(`
            SELECT COUNT(*) AS newMembers
            FROM users
            WHERE substr(registrationDate, 1, 7) = ?
        `)
      const result = stmt.get(currentJalaliYearMonth)

      return result?.newMembers || 0 // اگر مقدار null بود، 0 برگردان
    } catch (err) {
      console.error('Error fetching new members count:', err)
      return 0 // مقدار پیش‌فرض برای جلوگیری از خطا
    }
  })

  // 📌 هندل کردن درخواست برای دریافت لیست کاربران جدید
  ipcMain.handle('fetch-new-users', async () => {
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
                ORDER BY created_at DESC
                LIMIT 5`
        )
        const rows = stmt.all() // استفاده از all برای دریافت تمامی ردیف‌ها
        resolve(rows)
      } catch (err) {
        console.error('Error fetching users', err)
        reject(err)
      }
    })
  })

  ipcMain.handle('fetch-active-members-count', async () => {
    try {
      const stmt = db.prepare(`
                SELECT COUNT(*) AS count FROM users WHERE status = 'فعال'
            `)
      const result = stmt.get() // مقدار را دریافت می‌کنیم
      return result.count // فقط عدد تعداد را برمی‌گردانیم
    } catch (err) {
      console.error('Error fetching active members count:', err)
      throw err
    }
  })

  // افزودن تمدید
  ipcMain.handle('add-renewals', async (_, renewal) => {
    try {
      const { user_id, renewal_date, duration, new_expiration_date } = renewal

      console.log('🟡 دریافت تمدید جدید:', renewal)

      const insert = db.prepare(`
      INSERT INTO renewals (user_id, renewal_date, duration, new_expiration_date)
      VALUES (?, ?, ?, ?)
    `)

      insert.run(user_id, renewal_date, duration, new_expiration_date)

      const result = db.prepare('SELECT last_insert_rowid() AS id').get()

      console.log('🟢 تمدید ثبت شد با ID:', result.id)

      return {
        success: true,
        renewalId: result.last_insert_rowid
      }
    } catch (err) {
      console.error('🔴 خطا در ثبت تمدید:', err.message)
      return { success: false, error: err.message }
    }
  })

  // دبروزرسانی وضعیت کاربر
  ipcMain.handle('update-user-status', async (_, { userId, status }) => {
    return new Promise((resolve, reject) => {
      try {
        // آپدیت وضعیت کاربر در جدول users
        db.prepare(
          `
                UPDATE users
                SET status = ?
                WHERE id = ?
            `
        ).run(status, userId)

        resolve({ success: true })
      } catch (error) {
        reject({ success: false, error: error.message })
      }
    })
  })

  ipcMain.handle('check-user-status', async (_, userId) => {
    const user = db.prepare('SELECT expirationDate FROM users WHERE id = ?').get(userId)

    if (!user) return { success: false }

    const now = moment().locale('fa')
    const exp = moment(user.expirationDate, 'jYYYY/jMM/jDD')

    const isExpired = now.isAfter(exp)

    return {
      success: true,
      status: isExpired ? 'منقضی‌شده' : 'فعال'
    }
  })

  // دریافت پرداخت ها
  ipcMain.handle('fetch-renewals', async () => {
    return new Promise((resolve, reject) => {
      const rows = db.prepare('SELECT * FROM renewals').all()
      resolve(rows)
    })
  })

  // add product
  ipcMain.handle('add-product', async (_, productData) => {
    try {
      const { name, code, category, price, stock, status, description, tag, image, brand } =
        productData

      const stmt = db.prepare(`
        INSERT INTO products (
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
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)

      const result = stmt.run(
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
      )

      // Return the inserted product with its new id
      return {
        success: true,
        data: {
          id: result.lastInsertRowid,
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
        }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  })

  // fetch products
  ipcMain.handle('fetch-products', async () => {
    return new Promise((resolve, reject) => {
      const row = db.prepare('SELECT * FROM products').all()
      resolve(row)
    })
  })

  // update product
  ipcMain.handle('update-product', async (_, productData) => {
    try {
      const { id, name, code, category, price, stock, status, description, tag, image, brand } =
        productData

      const stmt = db.prepare(`
        UPDATE products
        SET
          name = ?,
          code = ?,
          category = ?,
          price = ?,
          stock = ?,
          status = ?,
          description = ?,
          tag = ?,
          image = ?,
          brand = ?
        WHERE id = ?
      `)

      stmt.run(name, code, category, price, stock, status, description, tag, image, brand, id)

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  })

  // delete product
  ipcMain.handle('delete-product', async (event, productId) => {
    try {
      const stmt = db.prepare('DELETE FROM products WHERE id = ?')
      const result = stmt.run(productId)
      if (result.changes > 0) {
        return { success: true }
      } else {
        return { success: false, error: 'Product not found' }
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  })

  // add sale
  ipcMain.handle('add-sale', async (_, saleData) => {
    try {
      const stmt = db.prepare(`
      INSERT INTO sales (invoice, customer, date, amount, status, name)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
      const result = stmt.run(
        saleData.invoice,
        saleData.customer,
        saleData.date,
        saleData.amount,
        saleData.status,
        saleData.name
      )
      return { success: true, id: result.lastInsertRowid }
    } catch (error) {
      return { success: false, error: error.message }
    }
  })

  // fetch sale
  ipcMain.handle('fetch-sales', async () => {
    try {
      const sales = db.prepare('SELECT * FROM sales ORDER BY date DESC').all()
      return sales
    } catch (error) {
      return []
    }
  })

  // fetch sales reports
  ipcMain.handle('fetch-sales-report', async () => {
    try {
      const stmt = db.prepare(`
      SELECT
        date,
        COUNT(*) AS total_sales,
        SUM(amount) AS total_revenue
      FROM sales
      GROUP BY date
      ORDER BY date DESC
    `)
      const salesReport = stmt.all()
      return salesReport
    } catch (err) {
      console.error('Error fetching sales report:', err)
      return []
    }
  })

  // ایجاد جدول admins برای مدیریت کاربران مدیر
  try {
    const stmt = db.prepare(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT,
      role TEXT DEFAULT 'admin',
      is_active INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP
    )
  `)
    stmt.run()
    console.log('Admins table is ready.')

    // ایجاد کاربر ادمین پیش‌فرض در صورت عدم وجود
    const adminCount = db.prepare('SELECT COUNT(*) as count FROM admins').get().count
    if (adminCount === 0) {
      const defaultPassword = 'admin123' // پسورد پیش‌فرض
      const hashedPassword = require('crypto')
        .createHash('sha256')
        .update(defaultPassword)
        .digest('hex')

      db.prepare(
        `
      INSERT INTO admins (username, password_hash, full_name, email, role)
      VALUES (?, ?, ?, ?, ?)
    `
      ).run('admin', hashedPassword, 'مدیر سیستم', 'admin@sohrabi.com', 'superadmin')

      console.log('Default admin user created with username: admin, password: admin123')
    }
  } catch (err) {
    console.error('Error creating admins table', err)
  }

  // ثبت‌نام کاربر جدید (اعضا)
  ipcMain.handle('register-member', async (_, memberData) => {
    try {
      const { username, password, full_name, email, phone } = memberData

      const existingUser = db.prepare('SELECT id FROM members WHERE username = ?').get(username)
      if (existingUser) {
        return { success: false, error: 'نام کاربری تکراری است' }
      }

      const crypto = require('crypto')
      const passwordHash = crypto.createHash('sha256').update(password).digest('hex')

      // ساخت Recovery Key ۴ رقمی تصادفی
      const recoveryKeyPlain = Math.floor(1000 + Math.random() * 9000).toString() // تولید عدد ۴ رقمی
      const recoveryKeyHash = crypto.createHash('sha256').update(recoveryKeyPlain).digest('hex')

      const stmt = db.prepare(`
      INSERT INTO members (username, password_hash, full_name, email, phone, role, recovery_key_hash)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
      const result = stmt.run(
        username,
        passwordHash,
        full_name,
        email,
        phone,
        'member',
        recoveryKeyHash
      )

      return {
        success: true,
        message: 'ثبت‌نام موفقیت‌آمیز بود',
        userId: result.lastInsertRowid,
        recoveryKey: recoveryKeyPlain // فقط همين يک بار به فرانت برگردون
      }
    } catch (err) {
      console.error('Error registering member:', err)
      return { success: false, error: err.message }
    }
  })

  ipcMain.handle(
    'reset-password-with-recovery-key',
    async (_, { username, recoveryKey, newPassword }) => {
      try {
        const user = db
          .prepare('SELECT id, recovery_key_hash FROM members WHERE username = ?')
          .get(username)
        if (!user) return { success: false, error: 'کاربر یافت نشد' }

        const crypto = require('crypto')
        const providedHash = crypto.createHash('sha256').update(recoveryKey).digest('hex')
        if (providedHash !== user.recovery_key_hash) {
          return { success: false, error: 'کلید بازیابی نادرست است' }
        }

        const newHash = crypto.createHash('sha256').update(newPassword).digest('hex')
        db.prepare('UPDATE members SET password_hash = ? WHERE id = ?').run(newHash, user.id)

        // (اختیاری) کلید بازیابی را با کلید جدید جایگزین کن تا یک‌بار مصرف شود:
        const newRecKey = Math.floor(1000 + Math.random() * 9000).toString() // تولید یک کد ۴ رقمی
        const newRecHash = crypto.createHash('sha256').update(newRecKey).digest('hex')
        db.prepare('UPDATE members SET recovery_key_hash = ? WHERE id = ?').run(newRecHash, user.id)

        return { success: true, message: 'رمز عبور با موفقیت تغییر کرد', newRecoveryKey: newRecKey }
      } catch (e) {
        console.error('reset-password-with-recovery-key error:', e)
        return { success: false, error: 'خطا در بازیابی رمز عبور' }
      }
    }
  )

  // ورود کاربر (ادمین یا عضو)
  ipcMain.handle('login-user', async (_, { username, password }) => {
    try {
      if (!username || !password) {
        return { success: false, error: 'نام کاربری و رمز عبور الزامی است.' }
      }

      const hashed = crypto.createHash('sha256').update(password).digest('hex')

      // 1) تلاش برای پیدا کردن ادمین (اگر جدول admins داری)
      let user = null
      try {
        user = db
          .prepare(
            `SELECT id, full_name, username, role 
           FROM admins 
          WHERE username = ? AND password_hash = ?`
          )
          .get(username, hashed)
      } catch (_) {
        /* اگر جدول/ستون وجود نداشت، از این بخش رد شو */
      }

      // 2) اگر ادمین نبود، بین اعضا بگرد
      if (!user) {
        user = db
          .prepare(
            `SELECT id, full_name, username, role 
           FROM members 
          WHERE username = ? AND password_hash = ?`
          )
          .get(username, hashed)
      }

      if (!user) {
        return { success: false, error: 'نام کاربری یا رمز عبور نادرست است.' }
      }

      // role پیش‌فرض برای اعضا
      if (!user.role) user.role = 'member'

      return { success: true, user }
    } catch (e) {
      console.error('login-user error:', e)
      return { success: false, error: 'خطا در ورود' }
    }
  })

  // ایجاد جدول members برای کاربران عادی
  try {
    const stmt = db.prepare(`
    CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      role TEXT DEFAULT 'member',
      is_active INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP
    )
  `)
    stmt.run()
    console.log('Members table is ready.')
  } catch (err) {
    console.error('Error creating members table', err)
  }

  // مدیریت ادمین‌ها - دریافت لیست
  ipcMain.handle('fetch-admins', async () => {
    try {
      const stmt = db.prepare(
        'SELECT id, username, full_name, email, role, is_active, last_login FROM admins'
      )
      return stmt.all()
    } catch (err) {
      console.error('Error fetching admins:', err)
      throw err
    }
  })

  // افزودن ادمین جدید
  ipcMain.handle('add-admin', async (_, adminData) => {
    try {
      const { username, password, full_name, email, role } = adminData

      // بررسی وجود کاربر با همین نام کاربری
      const existingAdmin = db.prepare('SELECT id FROM admins WHERE username = ?').get(username)
      if (existingAdmin) {
        return { success: false, error: 'نام کاربری already exists' }
      }

      // هش کردن رمز عبور
      const hashedPassword = require('crypto').createHash('sha256').update(password).digest('hex')

      const stmt = db.prepare(`
      INSERT INTO admins (username, password_hash, full_name, email, role)
      VALUES (?, ?, ?, ?, ?)
    `)
      const result = stmt.run(username, hashedPassword, full_name, email, role)

      return {
        success: true,
        message: 'ادمین با موفقیت اضافه شد',
        adminId: result.lastInsertRowid
      }
    } catch (err) {
      console.error('Error adding admin:', err)
      return { success: false, error: err.message }
    }
  })

  // به‌روزرسانی ادمین
  ipcMain.handle('update-admin', async (_, adminData) => {
    try {
      const { id, username, full_name, email, role, is_active } = adminData

      const stmt = db.prepare(`
      UPDATE admins 
      SET username = ?, full_name = ?, email = ?, role = ?, is_active = ?
      WHERE id = ?
    `)
      stmt.run(username, full_name, email, role, is_active, id)

      return { success: true, message: 'ادمین با موفقیت به‌روزرسانی شد' }
    } catch (err) {
      console.error('Error updating admin:', err)
      return { success: false, error: err.message }
    }
  })

  // تغییر رمز عبور ادمین
  ipcMain.handle('change-admin-password', async (_, { id, newPassword }) => {
    try {
      const hashedPassword = require('crypto')
        .createHash('sha256')
        .update(newPassword)
        .digest('hex')

      const stmt = db.prepare('UPDATE admins SET password_hash = ? WHERE id = ?')
      stmt.run(hashedPassword, id)

      return { success: true, message: 'رمز عبور با موفقیت تغییر یافت' }
    } catch (err) {
      console.error('Error changing password:', err)
      return { success: false, error: err.message }
    }
  })

  // حذف ادمین
  ipcMain.handle('delete-admin', async (_, adminId) => {
    try {
      // بررسی اینکه حداقل یک ادمین باقی بماند
      const adminCount = db.prepare('SELECT COUNT(*) as count FROM admins').get().count
      if (adminCount <= 1) {
        return { success: false, error: 'حداقل یک ادمین باید وجود داشته باشد' }
      }

      const stmt = db.prepare('DELETE FROM admins WHERE id = ?')
      const result = stmt.run(adminId)

      if (result.changes > 0) {
        return { success: true, message: 'ادمین با موفقیت حذف شد' }
      } else {
        return { success: false, error: 'ادمین یافت نشد' }
      }
    } catch (err) {
      console.error('Error deleting admin:', err)
      return { success: false, error: err.message }
    }
  })


  // ارسال پیامک
ipcMain.handle('send-sms', async (event, data) => {
  const { phoneNumbers, message, sendDateTime } = data;
  
  return new Promise((resolve, reject) => {
    try {
      const token = 'D255EA6F2C882649DCB1846EBCBE826F47947221'; // توکن شما
      const lineNumber = '98';
      
      let url = 'https://portal.amootsms.com/rest/SendSimple';
      url += '?Token=' + encodeURIComponent(token);
      url += '&SMSMessageText=' + encodeURIComponent(message);
      url += '&LineNumber=' + encodeURIComponent(lineNumber);
      url += '&Mobiles=' + encodeURIComponent(phoneNumbers.join(','));
      
      if (sendDateTime) {
        url += '&SendDateTime=' + encodeURIComponent(sendDateTime);
      }
      
      https.get(url, (resp) => {
        let data = '';
        
        resp.on('data', (chunk) => {
          data += chunk;
        });
        
        resp.on('end', () => {
          try {
            const result = JSON.parse(data);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      }).on("error", (err) => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
});

  createWindow()

  app.on('activate', function () {
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
  db.close()
})

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
