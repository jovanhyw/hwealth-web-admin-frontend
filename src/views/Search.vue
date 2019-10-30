<template>
  <v-container fluid>
    <v-row align="start" justify="center" class="px-12">
      <v-col xs="12" sm="12" md="4" lg="3">
        <v-card class="elevation-5">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Search for a user</v-toolbar-title>
          </v-toolbar>
          <v-form @submit.prevent="search">
            <v-card-text>
              <v-text-field
                label="Email"
                prepend-icon="mdi-email"
                type="text"
                v-model="email"
              />

              <v-row align="center" justify="center">
                <v-btn color="primary" type="submit" :loading="btnLoading"
                  >Submit</v-btn
                >
              </v-row>
            </v-card-text>
          </v-form>
        </v-card>
      </v-col>

      <v-col xs="12" sm="12" md="4" lg="5" v-if="userAccountDetails !== null">
        <v-card class="elevation-5">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>User Account Details</v-toolbar-title>
          </v-toolbar>
          <v-container class="pa-5">
            <v-row>
              <v-col cols="3">
                <span class="font-weight-bold text-uppercase">Username:</span>
              </v-col>
              <v-col cols="5">
                <span>{{ userAccountDetails.username }}</span>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="3" sm="3" md="3">
                <span class="font-weight-bold text-uppercase">Email:</span>
              </v-col>
              <v-col cols="5">
                <span>{{ userAccountDetails.email }}</span>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="3" sm="3" md="3">
                <span class="font-weight-bold text-uppercase">Verified:</span>
              </v-col>
              <v-col cols="5">
                <span class="text-capitalize">
                  {{ userAccountDetails.verified }}
                </span>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="3" sm="3" md="3">
                <span class="font-weight-bold text-uppercase">Role:</span>
              </v-col>
              <v-col cols="5">
                <v-select
                  v-model="userAccountDetails.role"
                  :items="rolesEnum"
                  :disabled="editRoleBtn"
                  class="pa-0 ma-0"
                ></v-select>
              </v-col>

              <v-col align="center" justify="center">
                <v-btn
                  class="ma-1"
                  color="primary"
                  @click="editRoleBtn = !editRoleBtn"
                  >Edit</v-btn
                >
                <v-btn
                  class="ma-1"
                  color="success"
                  :loading="updateRoleBtn"
                  @click="updateRole"
                  >Update</v-btn
                >
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="3" sm="3" md="3">
                <span class="font-weight-bold text-uppercase">Locked:</span>
              </v-col>
              <v-col cols="5">
                <v-select
                  v-model="userAccountDetails.locked"
                  :items="lockedEnum"
                  :disabled="editLockedBtn"
                  class="pa-0 ma-0 text-capitalize"
                ></v-select>
              </v-col>
              <v-col align="center" justify="center">
                <v-btn
                  class="ma-1"
                  color="primary"
                  @click="editLockedBtn = !editLockedBtn"
                  >Edit</v-btn
                >
                <v-btn
                  class="ma-1"
                  color="success"
                  :loading="updateLockedBtn"
                  @click="updateLockBtn"
                  >Update</v-btn
                >
              </v-col>
            </v-row>
            <v-divider v-if="userAccountDetails.lockReason"></v-divider>
            <v-row v-if="userAccountDetails.lockReason">
              <v-col cols="3" sm="3" md="3">
                <span class="font-weight-bold text-uppercase"
                  >Lock Reason:</span
                >
              </v-col>
              <v-col cols="5">
                <span>{{ userAccountDetails.lockReason }}</span>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="updateLockDialog" persistent max-width="500">
      <v-card class="elevation-5">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Enter a reason</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            class="mt-5"
            label="Please enter a reason for locking this account."
            prepend-icon="mdi-calendar-text-outline"
            type="text"
            v-model="lockReason"
          />

          <v-row align="center" justify="center">
            <v-btn color="error" class="ma-1" @click="updateLockDialog = false"
              >Cancel</v-btn
            >
            <v-btn
              color="primary"
              class="ma-1"
              :loading="submitUpdateLockBtn"
              @click="submitUpdateLock"
              >Submit</v-btn
            >
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbarSuccess" :timeout="0" bottom color="success">
      <span>{{ snackbarMessage }}</span>
      <v-btn
        text
        color="white"
        @click="
          {
            snackbarSuccess = false
            snackbarMessage = ''
          }
        "
        >Close</v-btn
      >
    </v-snackbar>

    <v-snackbar v-model="snackbarError" :timeout="0" bottom color="error">
      <span>{{ snackbarMessage }}</span>
      <v-btn
        text
        color="white"
        @click="
          {
            snackbarError = false
            snackbarMessage = ''
          }
        "
        >Close</v-btn
      >
    </v-snackbar>
  </v-container>
</template>

<script>
import ApiService from '@/services/api.service'

export default {
  name: 'Search',
  data() {
    return {
      email: '',
      snackbarSuccess: false,
      snackbarError: false,
      snackbarMessage: '',
      btnLoading: false,
      userAccountDetails: null,
      rolesEnum: ['User', 'Professional'],
      editRoleBtn: true,
      updateRoleBtn: false,
      lockedEnum: [true, false],
      editLockedBtn: true,
      updateLockedBtn: false,
      updateLockDialog: false,
      lockReason: '',
      type: null,
      submitUpdateLockBtn: false
    }
  },
  methods: {
    search() {
      this.btnLoading = true
      ApiService.post('/admin/search', { email: this.email })
        .then(res => {
          this.btnLoading = false
          this.userAccountDetails = res.data.account
        })
        .catch(err => {
          this.btnLoading = false
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
    },
    updateRole() {
      this.updateRoleBtn = true
      this.editRoleBtn = true
      ApiService.post('/admin/update-role', {
        email: this.userAccountDetails.email,
        role: this.userAccountDetails.role
      })
        .then(res => {
          this.updateRoleBtn = false
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message
          this.callSearch()
        })
        .catch(err => {
          this.updateRoleBtn = false
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
          this.callSearch()
        })
    },
    updateLockBtn() {
      if (this.userAccountDetails.locked) {
        this.type = 1
      } else {
        this.type = 0
      }

      // suppose to open modal to ask for lock reason if type = 1
      if (this.type === 1) {
        this.updateLockDialog = true
      }

      if (this.type === 0) {
        this.updateLockedBtn = true
        this.editLockedBtn = true
        ApiService.post('/admin/update-lock', {
          email: this.userAccountDetails.email,
          type: this.type
        })
          .then(res => {
            this.updateLockedBtn = false
            this.snackbarSuccess = true
            this.snackbarMessage = res.data.message
            this.callSearch()
          })
          .catch(err => {
            this.updateLockedBtn = false
            this.snackbarError = true
            this.snackbarMessage = err.response.data.message
            this.callSearch()
          })
      }
    },
    submitUpdateLock() {
      this.submitUpdateLockBtn = true
      this.editLockedBtn = true

      ApiService.post('/admin/update-lock', {
        email: this.userAccountDetails.email,
        type: this.type,
        lockReason: this.lockReason
      })
        .then(res => {
          this.submitUpdateLockBtn = false
          this.updateLockDialog = false
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message
          this.lockReason = ''
          this.callSearch()
        })
        .catch(err => {
          this.submitUpdateLockBtn = false
          this.updateLockDialog = false
          this.updateLockedBtn = false
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
          this.lockReason = ''
          this.callSearch()
        })
    },
    callSearch() {
      ApiService.post('/admin/search', { email: this.userAccountDetails.email })
        .then(res => (this.userAccountDetails = res.data.account))
        .catch(() => console.log('reload failed'))
    }
  }
}
</script>

<style></style>
