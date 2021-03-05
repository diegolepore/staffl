module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/styles/base/_variables.scss";
          @import "@/assets/styles/base/_mixins.scss";
        `
      }
    }
  }
}