<template>
  <div>
    <v-card color='background' elevation='0' rounded
            style='border: 1px solid #ffffff22 !important;position: sticky;top: 17%'>
      <v-card-title v-html='focusedObject.title'></v-card-title>
      <v-card-text style='white-space: pre-wrap' v-html='stripBase(focusedObject.body)'></v-card-text>
      <div class='pb-4' v-if='focusedObject.attachments'>

        <div class='px-10' v-if='focusedObject.attachments.links'>
          <v-alert
            v-for='link in focusedObject.attachments.links.link'
            :key='link.id'
            border='left'
            text
            color='accent'>

            <h4><a style='color: var(--v-accent-base) !important;text-decoration: none' target='_blank'
                   :href='link.url'>{{ link.title }}
              <v-icon color='accent'>mdi-open-in-new</v-icon>
            </a>

            </h4>
            <p v-if='link.summary' v-html='link.summary'></p>
          </v-alert>
        </div>
        <div class='px-10' v-if='focusedObject.attachments.embeds'>
          <div style='width: 100% !important;' v-html='focusedObject.attachments.embeds.embed[0].embed_code'></div>
        </div>
        <div class='px-10' v-if='focusedObject.attachments.files'>
          <v-row>
            <div class='py-3' :key='file.id' v-for='file of focusedObject.attachments.files.file'>
              <v-dialog v-if='file.filemime.split("/")[0]==="image"'
                        transition='dialog-bottom-transition'
                        max-width='600'
              >
                <template v-slot:activator='{ on, attrs }'>
                  <v-card v-bind='attrs' v-on='on' style='cursor: pointer' v-ripple class='mx-3'>

                    <v-img
                      :src='`https://pausd.schoology.com/attachment/${file.id}/image/attachment_image_thumb`'></v-img>
                  </v-card>
                </template>
                <template v-slot:default='dialog'>
                  <v-card link target='_blank'
                          :href='`https://pausd.schoology.com/attachment/${file.id}/image/lightbox_preview`'
                          color='secondary' class='pa-1'>
                    <v-card-actions class=''>
                      <v-btn icon>
                        <v-icon>mdi-open-in-new</v-icon>
                      </v-btn>
                      {{ file.title }}
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        icon
                        @click='dialog.value = false'
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-card-actions>
                    <v-img :lazy-src='`https://pausd.schoology.com/attachment/${file.id}/image/attachment_image_thumb`'
                           :src='`https://pausd.schoology.com/attachment/${file.id}/image/lightbox_preview`'></v-img>

                  </v-card>
                </template>
              </v-dialog>
              <div v-else-if='file.filemime==="application/pdf"'>
                <client-only>
                  <object src='https://ymath.io/trigonometry/Tilting-A-Parabola.pdf'></object>
                </client-only>

              </div>
              <div v-else>
                {{ file.filemime.split('/')[0] }}
              </div>
            </div>
          </v-row>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'MaterialViewer',
  props: ['focusedObject', 'objectType'],
  methods: {
    stripBase(s) {
      const div = document.createElement('div')
      div.innerHTML = s
      const scripts = div.getElementsByTagName('base')
      let i = scripts.length
      while (i--) {
        scripts[i].parentNode.removeChild(scripts[i])
      }
      return div.innerHTML
    }
  }
}
</script>

<style scoped>

</style>
