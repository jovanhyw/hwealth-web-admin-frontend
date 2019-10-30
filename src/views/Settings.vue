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
              <span>User Profile</span>
            </v-tab>
            <v-tab>
              <v-icon left>mdi-lock</v-icon>
              <span>Security</span>
            </v-tab>

            <v-tab-item>
              <v-card flat>
                <v-form>
                  <v-container>
                    <h1>Profile</h1>

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
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row class="mt-n6">
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="profile.fullname"
                          label="Full Name"
                          outlined
                          :disabled="disableField1"
                          :maxlength="50"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApiService from '@/services/api.service'

export default {
  name: 'Settings',
  data() {
    return {
      username: '',
      email: '',
      fullname: '',
      profile: '',
      disableField1: true
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
        })
        .catch(() => console.log('Failed to get profile details.'))
    }
  },
  created() {
    this.getAccount()
    this.getProfile()
  }
}
</script>

<style></style>
