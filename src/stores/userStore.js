import { defineStore } from "pinia";
import moment from 'jalali-moment';

export const useUserStore = defineStore("userStore", {
    state: () => ({
        users: [],
    }),
    actions: {
        async fetchUsers() {
            try {
                this.users = await window.api.getUsers();
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },
    },
    getters: {
        latestUsers: (state) => {
            return [...state.users]
                .sort((a, b) => moment(b.registrationDate, "jYYYY/jMM/jDD") - moment(a.registrationDate, "jYYYY/jMM/jDD"))
                .slice(0, 5); // فقط 5 عضو آخر رو برمی‌گردونه
        },
    }
});

// export const useUserStore = defineStore("userStore", {
//     state: () => ({
//         users: [],
//         payments: [],
//         selectedUser: null,
//         showDetailsModal: false,
//         progress: 0,
//         expirationDateMiladi: null,
//         remainingDays: 0,
//     }),
//     actions: {
//         async fetchUsers() {
//             try {
//                 this.users = await window.api.getUsers();
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         },
//         async fetchPayments() {
//             try {
//                 this.payments = await window.api.getPayments();
//             } catch (error) {
//                 console.error("Error fetching payments:", error);
//             }
//         },
//         viewUser(user) {
//             this.selectedUser = user;
//             this.showDetailsModal = true;
//             this.calculateProgress();
//         },
//         closeDetailsModal() {
//             this.showDetailsModal = false;
//             this.selectedUser = null;
//         },
//         async calculateProgress() {
//             if (!this.selectedUser) return;

//             const shamsiDate = this.selectedUser.registrationDate;
//             const registrationDateMiladi = moment(moment.from(shamsiDate, "fa", "jYYYY/jMM/jDD").locale("en").format("YYYY-MM-DD"));
//             const expirationDateMiladi = moment(registrationDateMiladi).add(30, "days");

//             const totalDays = expirationDateMiladi.diff(registrationDateMiladi, "days");
//             const passedDays = moment().diff(registrationDateMiladi, "days");
//             const usedPercentage = (passedDays / totalDays) * 100;
//             const progress = Math.min(usedPercentage, 100);
//             const remainingDays = Math.max(0, totalDays - passedDays);

//             if (moment().isAfter(expirationDateMiladi)) {
//                 this.selectedUser.status = "منقضی‌شده";
//             }

//             this.progress = progress;
//             this.expirationDateMiladi = expirationDateMiladi.format("jYYYY/jMM/jDD");
//             this.remainingDays = remainingDays;
//         }
//     }
// });
