<template>
<v-container >

  <v-sheet class='pt-5' elevation='0' color='transparent' rounded='lg'>
    <v-row><h1  class='px-4 pb-2'>Courses </h1><v-spacer></v-spacer><v-btn v-if='false' class='mr-7' style='padding: 0 0 !important;' rounded color='accent' ><v-icon >mdi-reload</v-icon></v-btn></v-row>
    <v-list color='transparent' rounded class='rounded-b-lg'  v-if='$store.state.courses'>
      <v-list-item link :to='`/app/courses/${section.id}`' v-for='section in $store.state.courses' :key='section.id' two-line>
        <v-list-item-avatar>
          <v-img :src='section.profile_url' />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ section.course_title }}</v-list-item-title>
          <v-list-item-subtitle>{{ section.section_title }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <v-icon>mdi-chevron-right</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-sheet>
</v-container>
</template>

<script>
export default {
  name: 'index',
  /*async asyncData({ $axios }) {
    const sections = await $axios.$get('/cc/api/users/me/sections');
    //console.log(sections)
    return {sections}
  },*/
  /*data:()=>({
    sections: this.$store.state.courses
  })*/
  head(){
    return {
      title:'Courses'
    }
  },

}
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--default {

  min-width: 36px;

}
</style>
