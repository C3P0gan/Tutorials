<template>
  <div id="app">
    <h1 style="color: orange">{{ profile.user.name }}</h1>
    <p>{{ profile.bio }}</p>

    <input v-model="form.body" />

    <button @click="addItem">Add Item</button>

    <li v-for="item in items" :key="item.$id" v-text="item.body" />
  </div>
</template>

<script>
import Item from "./classes/Item";
import User from "./classes/User";
import Profile from "./classes/Profile";

export default {
  name: "App",

  data() {
    return {
      form: {
        body: "",
      },
    };
  },

  beforeMount() {
    User.insert({
      data: {
        id: 28,
        name: "Luke",
        email: "luke@ldiebold.com",
      },
    });

    Profile.insert({
      data: {
        id: 55,
        bio: "whatever",
        life_goal: "whatever #2",
        user_id: 28,
      },
    });
  },

  computed: {
    items() {
      return Item.all();
    },

    profile() {
      return Profile.query().with("user").find(55);
    },
  },

  methods: {
    addItem() {
      Item.insert({ data: this.form });
    },
  },
};
</script>
