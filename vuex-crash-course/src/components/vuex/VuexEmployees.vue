<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 text-success">Employees</p>
          <p class="fst-italic">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet ut
            consequuntur minus quasi totam vel magni a. Excepturi porro sapiente
            debitis, voluptatibus autem ratione voluptate illum quos sunt, fugit
            corporis!
          </p>
        </div>
      </div>
    </div>
    <!-- <pre>{{ employees }}</pre> -->
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <ul>
            <li
              v-for="employee of employeeState.employees"
              :key="employee.id"
              class="list-group-item list-group-item-success"
            >
              <input
                @change="updateSelected(employee.id)"
                :checked="employee.isSelected"
                type="checkbox"
                class="form-check-input"
              />
              {{ employee.name }}
            </li>
          </ul>
        </div>
        <div class="clo-md-6">
          <div v-for="employee of employeeState.employees" :key="employee.id">
            <div class="card my-2" v-if="employee.isSelected">
              <div class="card-body list-group-item-success">
                <ul class="list-group">
                  <li class="list-group-item">
                    Id: <span class="fw-bold">{{ employee.id }}</span>
                  </li>
                  <li class="list-group-item">
                    Name: <span class="fw-bold">{{ employee.name }}</span>
                  </li>
                  <li class="list-group-item">
                    Email: <span class="fw-bold">{{ employee.email }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "VuexEmployeesComponent",
  methods: {
    updateSelected: function (empId) {
      this.$store.dispatch("employeeModule/changeSelected", { empId: empId });
    },
  },
  computed: mapGetters({
    employeeState: "getEmployeeState",
  }),
};
</script>

<style>
</style>