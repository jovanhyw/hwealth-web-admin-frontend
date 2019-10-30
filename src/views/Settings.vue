<template>
  <v-container fluid class="pa-12" style="max-width: 1344px;">
    <v-row align="start" justify="center" class="px-12">
      <v-col cols="12">
        <v-card class="elevation-5">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>General Account Settings</v-toolbar-title>
          </v-toolbar>

          <v-tabs vertical>
            <v-tab>
              <v-icon left>mdi-account</v-icon>
              <span>Account</span>
            </v-tab>
            <v-tab>
              <v-icon left>mdi-account-badge-horizontal</v-icon>
              <span>Profile</span>
            </v-tab>
            <v-tab>
              <v-icon left>mdi-lock</v-icon>
              <span>Security</span>
            </v-tab>

            <!-- For Account Tab -->
            <v-tab-item>
              <v-card flat>
                <v-container fluid class="ma-2">
                  <v-form @submit.prevent="updateEmail">
                    <div class="title">Account</div>

                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="username"
                          label="Username"
                          outlined
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row class="mt-n6">
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="email"
                          label="Email"
                          outlined
                          :disabled="editAccountBtn"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row class="mt-n6" v-if="editAccountBtn == true">
                      <v-col cols="12" sm="6">
                        <v-btn
                          color="primary"
                          class="ma-1"
                          @click="editAccountBtn = !editAccountBtn"
                        >
                          <v-icon left>mdi-pencil</v-icon>
                          <span>Edit</span>
                        </v-btn>
                      </v-col>
                    </v-row>

                    <v-row class="mt-n6" v-else>
                      <v-col cols="12" sm="6">
                        <v-btn
                          color="error"
                          class="ma-1"
                          @click="editAccountBtn = !editAccountBtn"
                        >
                          <v-icon left>mdi-cancel</v-icon>
                          <span>Cancel</span>
                        </v-btn>
                        <v-btn
                          color="success"
                          class="ma-1"
                          type="submit"
                          :loading="updateAccountBtn"
                          @click="updateEmail"
                        >
                          <v-icon left>mdi-check</v-icon>
                          <span>Update</span>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card>
            </v-tab-item>

            <!-- For Profile Tab -->
            <v-tab-item>
              <v-card flat>
                <v-form @submit.prevent="updateProfile">
                  <v-container fluid class="ma-2">
                    <v-form>
                      <div class="title">Profile</div>

                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="profile.fullname"
                            label="Full Name"
                            outlined
                            :disabled="editProfileBtn"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row class="mt-n6">
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="profile.dateOfBirth"
                            label="Date Of Birth"
                            outlined
                            :disabled="editProfileBtn"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row class="mt-n6" v-if="editProfileBtn == true">
                        <v-col cols="12" sm="6">
                          <v-btn
                            color="primary"
                            class="ma-1"
                            @click="editProfileBtn = !editProfileBtn"
                          >
                            <v-icon left>mdi-pencil</v-icon>
                            <span>Edit</span>
                          </v-btn>
                        </v-col>
                      </v-row>

                      <v-row class="mt-n6" v-else>
                        <v-col cols="12" sm="6">
                          <v-btn
                            color="error"
                            class="ma-1"
                            @click="editProfileBtn = !editProfileBtn"
                          >
                            <v-icon left>mdi-cancel</v-icon>
                            <span>Cancel</span>
                          </v-btn>
                          <v-btn color="success" class="ma-1" type="submit">
                            <v-icon left>mdi-check</v-icon>
                            <span>Update</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-form>
              </v-card>
            </v-tab-item>

            <!-- For Security Tab -->
            <v-tab-item>
              <v-card flat>
                <v-container fluid class="ma-2">
                  <!-- Change Password -->
                  <v-form @submit.prevent="updatePassword">
                    <div class="title">Change Password</div>

                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="currentPassword"
                          label="Current Password"
                          type="password"
                          autocomplete="off"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row class="mt-n10">
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="newPassword"
                          label="New Password"
                          type="password"
                          autocomplete="off"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row class="mt-n10">
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="confirmPassword"
                          label="Confirm Password"
                          type="password"
                          autocomplete="off"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row class="mt-n10">
                      <v-col cols="12" sm="6">
                        <v-btn
                          color="primary"
                          type="submit"
                          :loading="updatePasswordBtn"
                          @click="updatePassword"
                        >
                          <span>Update Password</span>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>

                  <!-- 2FA -->
                  <div class="title mt-4">Two Factor Authentication</div>
                  <span class="caption grey--text">
                    You may need to download and install an Authenticator App
                    before enabling two factor authentication. Examples of such
                    Authenticator App that we recommend, while not limited to,
                    includes; Tofu (iOS), Authenticator (iOS), Aegis
                    Authenticator (Android), Google Authenticator, Authy.
                  </span>

                  <v-divider class="mt-4"></v-divider>

                  <div v-if="tfaEnabled === false">
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-form>
                          <v-text-field
                            v-model="tfaPassword"
                            label="Password"
                            type="password"
                            autocomplete="off"
                            outlined
                          ></v-text-field>
                        </v-form>
                      </v-col>
                    </v-row>

                    <v-row class="mt-n10">
                      <v-col cols="12" sm="6">
                        <v-btn color="success">
                          <span>Enable</span>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                </v-container>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>

        <v-snackbar
          v-model="snackbarSuccess"
          :timeout="0"
          bottom
          color="success"
        >
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApiService from '@/services/api.service'
import { TokenService } from '@/services/storage.service'

export default {
  name: 'Settings',
  data() {
    return {
      username: '',
      email: '',
      profile: '',
      snackbarSuccess: false,
      snackbarError: false,
      snackbarMessage: '',
      editAccountBtn: true,
      updateAccountBtn: false,
      editProfileBtn: true,
      updateProfileBtn: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      updatePasswordBtn: false,
      tfaPassword: '',
      tfaEnabled: TokenService.getTfaState() === 'false' ? false : true
    }
  },
  methods: {
    getAccount() {
      ApiService.get('/account')
        .then(res => {
          this.username = res.data.account.username
          this.email = res.data.account.email
        })
        .catch(() => console.log('Failed to get account details.'))
    },
    getProfile() {
      ApiService.get('/profile')
        .then(res => {
          this.profile = res.data.profile
          if (res.data.profile.dateOfBirth) {
            this.profile.dateOfBirth = this.$options.filters.formatDOB(
              this.profile.dateOfBirth
            )
          }
        })
        .catch(() => {
          console.log('Failed to get profile details.')
        })
    },
    updateEmail() {
      this.updateAccountBtn = true
      ApiService.put('/account/update-email', { email: this.email })
        .then(res => {
          this.updateAccountBtn = false
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message
          this.editAccountBtn = true
          this.getAccount()
        })
        .catch(err => {
          this.updateAccountBtn = false
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
          this.editAccountBtn = true
          this.getAccount()
        })
    },
    updateProfile() {
      //
    },
    updatePassword() {
      this.updatePasswordBtn = true
      ApiService.put('/account/update-password', {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword
      })
        .then(res => {
          this.updatePasswordBtn = false
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message
          this.currentPassword = ''
          this.newPassword = ''
          this.confirmPassword = ''
        })
        .catch(err => {
          this.updatePasswordBtn = false
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
    }
  },
  created() {
    this.getAccount()
    this.getProfile()
    console.log(this.tfaEnabled)
  }
}
</script>

<style></style>
