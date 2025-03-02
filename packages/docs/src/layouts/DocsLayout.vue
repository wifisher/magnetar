<template>
  <q-layout view="HHH Lpr fff" class="docs-layout">
    <q-header style="padding: 0.7rem 1.5rem" class="_layout-header row items-center">
      <q-btn
        class="xs"
        dense
        icon="menu"
        color="white"
        flat
        @click="() => (leftDrawerOpen = !leftDrawerOpen)"
      />
      <div class="text-h6 cursor-pointer flex items-center" @click="$router.push('/')">
        <q-img src="media/magnetar-logo-white.svg" style="width: 20px" class="mr-xs gt-xs" />
        <div class="ml-lg">{{ routeName }}</div>
      </div>
      <div class="ml-auto flex q-gutter-md">
        <AnchorLink
          href="https://github.com/CyCraft/magnetar/blob/production/CHANGELOG.md"
          text="Changelog"
          external
        />
        <AnchorLink href="https://github.com/cycraft/magnetar" text="Github" external />
      </div>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="260"
      :breakpoint="600"
      content-class="_layout-side"
      dark
    >
      <TableOfContents :TOC="TOC" />
    </q-drawer>

    <q-page-container>
      <router-view @set-toc="setTOC" />
    </q-page-container>
  </q-layout>
</template>

<style lang="sass">
// $
.docs-layout
  ._layout-header
    +C(background, lucy-bg-head)
    color: white
  .q-drawer
    +C(background, lucy-bg-menu)
    border-right: 0.5px solid $c-lucy-bg-head
</style>

<script lang="ts">
import { defineComponent, ref, computed, Ref } from '@vue/composition-api'
import { TableOfContents } from 'planetar'
import AnchorLink from '../components/AnchorLink.vue'
import { routeNamePageChaptersMap } from '../config/pageChapters'
import { ROUTE_NAMES } from '../router/routes'

export default defineComponent({
  name: 'MainLayout',
  components: { AnchorLink, TableOfContents },
  setup(props, options) {
    const leftDrawerOpen = ref(true)

    const routeName = options.root.$route.name as ROUTE_NAMES
    const pageChapters = computed(() => routeNamePageChaptersMap[routeName])

    const TOC: Ref<any[]> = ref([])
    function setTOC(newTOC: any[]) {
      TOC.value.splice(0, TOC.value.length, ...newTOC)
    }

    return { leftDrawerOpen, routeName, pageChapters, setTOC, TOC }
  },
})
</script>
