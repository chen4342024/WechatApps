const UploadItem = require('./item.js')
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    uploadItem: {
      type: UploadItem,
      value: null,
    }
  },
  data: {
    // 这里是一些组件内部数据
  },
  methods: {
    // 这里是一个自定义方法
    bindDelete: function (e) {
      let data = this.data;
      this.triggerEvent('onItemDelete', { data }, { bubbles: false })
    },
    bindPreview: function (e) {
      let data = this.data;
      this.triggerEvent('itempreview', { data }, { bubbles: true });
    }
  }
})