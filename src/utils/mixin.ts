import { mapState } from 'vuex';

export const mixin = {
  computed: {
    ...mapState({
      layoutMode: (state: any) => state.app.layout,
    })
  }
}
