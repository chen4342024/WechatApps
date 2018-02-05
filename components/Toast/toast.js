Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    content: {
      type: String,
      value: "",
    },
    contentClass: {
      type: String,
      value: 'custom-toast-content'
    },
    position: {
      type: String,
      value: "",
    },
    mask: {
      type: Boolean,
      value: false
    }
  },
  data: {
    // 这里是一些组件内部数据
  },

  ready: function () {
    let { position } = this.data;
    if (!position){
      position = "center";
    }
    this.setData({
      contentClass: `custom-toast-content ${position}`
    })
  },

  methods: {
    // 这里是一个自定义方法
    show: function (e) {
      let data = this.data;
      this.triggerEvent('onItemDelete', { data }, { bubbles: false })
    },
    hide: function (e) {
      let data = this.data;
      this.triggerEvent('itempreview', { data }, { bubbles: true });
    }
  }
})