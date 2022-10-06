<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
        <label for="">File</label>
        <input type="file" id="file" ref="file" v-on:change="onFileChange()" />
    </div>
  </div>
</template>

<script>
export default {
    props: ['files'],
    data() {
        return {
            file: ''
        }
    },
    methods: {
        onFileChange() {
            this.file = this.$refs.file.files[0];
            if (this.file) {
                
            }
        }
    }
}
</script>

<style>

</style>