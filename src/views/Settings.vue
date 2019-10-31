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
                  <v-form
                    @submit.prevent="updateEmail"
                    v-model="validAccountForm"
                  >
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
                          :rules="[notEmptyRule('Email'), emailRule()]"
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
                          :disabled="!validAccountForm"
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
                <v-container fluid class="ma-2">
                  <div class="title">Profile</div>
                  <v-form
                    @submit.prevent="updateProfile"
                    v-model="validProfileForm"
                  >
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="profile.fullname"
                          label="Full Name"
                          outlined
                          :disabled="editProfileBtn"
                          :rules="[notEmptyRule('Full Name')]"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <!-- Disable DOB for admin -->
                    <!-- <v-row class="mt-n6">
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="profile.dateOfBirth"
                            label="Date Of Birth"
                            outlined
                            :disabled="editProfileBtn"
                          ></v-text-field>
                        </v-col>
                    </v-row>-->

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
                        <v-btn
                          color="success"
                          class="ma-1"
                          type="submit"
                          :disabled="!validProfileForm"
                          :loading="updateProfileBtn"
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

                  <v-divider class="my-4"></v-divider>

                  <!-- Render Enable Button -->
                  <!-- To Generate the secret -->
                  <div v-if="tfaEnabled === false && tfaSecret === null">
                    <v-form @submit.prevent="generateTfaSecret">
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="tfaPassword"
                            label="Password"
                            type="password"
                            autocomplete="off"
                            outlined
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row class="mt-n10">
                        <v-col cols="12" sm="6">
                          <v-btn
                            color="success"
                            :loading="generateSecretBtn"
                            @click="generateTfaSecret"
                          >
                            <span>Enable</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </div>

                  <!-- Render the QRCode and secret -->
                  <!-- To send to server secret and token -->
                  <div v-if="qrImage !== null">
                    <div class="font-weight-bold">
                      Step 1: Scan the following QRCode on your Authenticator
                      App.
                    </div>
                    <img :src="qrImage" />
                    <div class="font-weight-bold">
                      Alternatively, enter the following secret manually:
                    </div>
                    <div>{{ base32secret }}</div>

                    <v-divider class="my-4"></v-divider>

                    <div class="font-weight-bold">
                      Step 2: To confirm the authenticator app is set up
                      correctly, enter the security code that appears on the
                      authenticator app.
                    </div>
                    <v-form @submit.prevent="enableTfa">
                      <v-row class="mb-n6">
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="securityCode"
                            label="Security Code"
                            outlined
                            :maxlength="6"
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row class="mt-n10">
                        <v-col cols="12" sm="6">
                          <v-btn
                            color="success"
                            :loading="verifyTfaBtn"
                            @click="enableTfa"
                          >
                            <span>Verify</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </div>

                  <!-- Render Disable Button -->
                  <!-- To disable 2FA -->
                  <div v-if="tfaEnabled === true">
                    <v-form @submit.prevent="disableTfa">
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="tfaPassword"
                            label="Password"
                            type="password"
                            autocomplete="off"
                            outlined
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row class="mt-n10">
                        <v-col cols="12" sm="6">
                          <v-btn
                            color="error"
                            :loading="disableBtnLoading"
                            @click="disableTfa"
                          >
                            <span>Disable</span>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>

                    <v-row>
                      <v-col cols="12" sm="6">
                        <div class="title">View Recovery Code</div>
                      </v-col>
                    </v-row>

                    <v-row class="mt-n4">
                      <v-col cols="12" sm="6">
                        <v-btn
                          color="primary"
                          :loading="viewBtnLoading"
                          @click="getRecoveryCode"
                        >
                          <span>View</span>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>

                  <!-- END OF SECURITY TAB -->
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

        <v-dialog v-model="recoverCodeDialog" persistent max-width="500">
          <v-card class="elevation-5">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Recovery Code</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <div class="font-weight-bold mx-2 my-4 black--text">
                Please write down or save this recovery code. This code will
                allow you to recover your account in case you lose access your
                authenticator app.
              </div>

              <div align="center" justify="center">
                <span class="font-weight-bold mb-4 black--text"
                  >Recovery Code:</span
                >
                <div>{{ recoveryCode }}</div>
              </div>

              <v-row align="center" justify="center">
                <v-btn
                  color="primary"
                  class="ma-1 mt-3"
                  @click="recoverCodeDialog = false"
                  >Ok</v-btn
                >
              </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApiService from '@/services/api.service'
import { TokenService } from '@/services/storage.service'
import QRCode from 'qrcode'

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
      tfaEnabled: TokenService.getTfaState() === 'false' ? false : true,
      generateSecretBtn: false,
      tfaSecret: null,
      base32secret: null,
      qrImage: null,
      securityCode: null,
      verifyTfaBtn: false,
      recoveryCode: null,
      recoverCodeDialog: false,
      disableBtnLoading: false,
      viewBtnLoading: false,
      validAccountForm: false,
      notEmptyRule(property) {
        return v => (v && v.length > 0) || `${property} cannot be empty.`
      },
      emailRule() {
        return v => /.+@.+\..+/.test(v) || 'E-mail must be valid.'
      },
      validProfileForm: false
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
      this.updateProfileBtn = true
      ApiService.put('/profile/update-profile', {
        fullname: this.profile.fullname
      })
        .then(res => {
          this.updateProfileBtn = false
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message
          this.editProfileBtn = true
          this.getProfile()
        })
        .catch(err => {
          this.updateProfileBtn = false
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
          this.editProfileBtn = true
          this.getProfile()
        })
    },
    updatePassword() {
      if (
        this.currentPassword === '' ||
        this.newPassword === '' ||
        this.confirmPassword === ''
      ) {
        this.updatePasswordBtn = false
        this.snackbarError = true
        this.snackbarMessage = 'Password field are required.'
        return
      }

      if (this.newPassword !== this.confirmPassword) {
        this.updatePasswordBtn = false
        this.snackbarError = true
        this.snackbarMessage = "New passwords don't match."
        return
      }

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
    },
    generateTfaSecret() {
      if (this.tfaPassword === '') {
        this.generateSecretBtn = false
        this.snackbarError = true
        this.snackbarMessage = 'Password field is required.'
        return
      }

      this.generateSecretBtn = true
      ApiService.post('/two-factor/get-authenticator', {
        password: this.tfaPassword
      })
        .then(res => {
          this.generateSecretBtn = false
          this.tfaPassword = ''
          this.tfaSecret = res.data.secret

          this.base32secret = this.tfaSecret.base32
          const otpAuth = this.tfaSecret.otpauth_url
          QRCode.toDataURL(otpAuth, (err, dataURL) => {
            this.qrImage = dataURL
          })
        })
        .catch(err => {
          this.generateSecretBtn = false
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
    },
    enableTfa() {
      if (this.securityCode === null || this.securityCode === '') {
        this.verifyTfaBtn = false
        this.snackbarError = true
        this.snackbarMessage = 'Security code is required.'
        return
      }

      this.verifyTfaBtn = true
      ApiService.post('/two-factor/enable', {
        secret: this.base32secret,
        token: this.securityCode
      })
        .then(res => {
          this.verifyTfaBtn = false
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message

          // on success, clear the variables
          this.tfaSecret = null
          this.base32secret = null
          this.qrImage = null
          this.securityCode = null

          // set the 2fa state to true
          TokenService.saveTfaState(true)
          this.tfaEnabled = true

          // clear the current jwt, save the new jwt
          TokenService.removeToken()
          ApiService.removeHeader()
          TokenService.saveToken(res.data.token)
          ApiService.setHeader()

          // show the recovery code
          this.recoveryCode = res.data.recoveryCode
          this.recoverCodeDialog = true
        })
        .catch(err => {
          this.verifyTfaBtn = false
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
    },
    getRecoveryCode() {
      this.viewBtnLoading = true
      ApiService.get('/two-factor/get-recovery-code')
        .then(res => {
          this.viewBtnLoading = false
          this.recoveryCode = res.data.recoveryCode
          this.recoverCodeDialog = true
        })
        .catch(err => {
          this.viewBtnLoading = false
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
    },
    disableTfa() {
      if (this.tfaPassword === '') {
        this.generateSecretBtn = false
        this.snackbarError = true
        this.snackbarMessage = 'Password field is required.'
        return
      }

      this.disableBtnLoading = true
      ApiService.post('/two-factor/disable', {
        password: this.tfaPassword
      })
        .then(res => {
          this.disableBtnLoading = false
          this.snackbarSuccess = true
          this.snackbarMessage = res.data.message

          this.tfaPassword = ''

          // set the 2fa state to false
          TokenService.saveTfaState(false)
          this.tfaEnabled = false
        })
        .catch(err => {
          this.disableBtnLoading = false
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
    }
  },
  created() {
    this.getAccount()
    this.getProfile()
  }
}
</script>

<style></style>
