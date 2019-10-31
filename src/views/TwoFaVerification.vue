<template>
  <v-container fluid>
    <v-row align="start" justify="center" class="px-12">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-5">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>2FA Authentication</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <div class="subtitle-1" align="center" justify="center">
              <span>
                Enter the 6 digit verification code from your authenticator app.
              </span>

              <v-form @submit.prevent="validate2fa">
                <v-row class="mb-n6" align="center" justify="center">
                  <v-col cols="12" sm="6" lg="10">
                    <v-text-field
                      v-model="securityCode"
                      label="Security Code"
                      outlined
                      :maxlength="6"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="mt-n10" align="center" justify="center">
                  <v-col cols="12" sm="6">
                    <v-btn
                      color="success"
                      :loading="verifyBtnLoading"
                      @click="validate2fa"
                    >
                      <v-icon left>mdi-check</v-icon>
                      <span>Verify</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </div>
          </v-card-text>

          <v-card-actions>
            <div class="ma-2 subtitle-2">
              <a href="@">
                <i>I lost access to my Authenticator device</i>
              </a>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

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
import { TokenService } from '@/services/storage.service'

export default {
  name: 'TwoFaVerification',
  data() {
    return {
      snackbarError: false,
      snackbarMessage: '',
      securityCode: null,
      verifyBtnLoading: false
    }
  },
  methods: {
    validate2fa() {
      if (this.securityCode === null || this.securityCode === '') {
        this.verifyTfaBtn = false
        this.snackbarError = true
        this.snackbarMessage = 'Security code is required.'
        return
      }

      this.verifyBtnLoading = true
      ApiService.post('/two-factor/authenticate', { token: this.securityCode })
        .then(res => {
          this.verifyBtnLoading = false

          // on success, clear the variable
          this.securityCode = null

          // clear the current jwt, save the new jwt
          TokenService.removeToken()
          ApiService.removeHeader()
          TokenService.saveToken(res.data.token)
          ApiService.setHeader()

          // direct to search
          TokenService.saveTfaAuth(true)
          this.$router.push({ name: 'search' })
        })
        .catch(err => {
          this.verifyBtnLoading = false
          this.snackbarError = true
          this.snackbarMessage = err.response.data.message
        })
    }
  }
}
</script>

<style></style>
