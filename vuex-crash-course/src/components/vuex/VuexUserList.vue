<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <div class="p h3 text-success">User List</div>
          <p class="fst-italic">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            iusto, minima necessitatibus earum ex neque quos impedit aperiam
            error consectetur fuga, fugiat aspernatur molestias illum
            voluptatibus omnis voluptates hic ducimus?
          </p>
        </div>
      </div>
    </div>

    <div class="container" v-if="userState.loading">
      <div class="row">
        <div class="col">
          <Spinner />
        </div>
      </div>
    </div>

    <div class="container" v-if="!userState.loading && userState.errorMessage">
      <div class="row">
        <div class="col">
          <p class="fw-bold text-danger">{{ userState.errorMessage }}</p>
        </div>
      </div>
    </div>

    <div
      class="container"
      v-if="!userState.loading && userState.users.length > 0"
    >
      <div class="row">
        <div class="col">
          <table class="table table-hover text-center table-striped">
            <thead class="bg-secondary text-white">
              <tr>
                <th>SNO</th>
                <th>Name</th>
                <th>Email</th>
                <th>Website</th>
                <th>Company</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in userState.users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.website }}</td>
                <td>{{ user.company.name }}</td>
                <td>{{ user.address.city }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner.vue";
import { mapGetters } from "vuex";
export default {
  name: "VuexUserList",
  components: { Spinner },
  created: async function () {
    this.$store.dispatch("usersModule/getUsers")
  },
  computed: mapGetters({
    userState: "getUserState",
  }),
};
</script>

<style>
</style>