import CreateApp, { appInstanceMap } from './app'

// 自定义元素
class MyElement extends HTMLElement {
  static get observedAttributes () {
    return ['name', 'url']
  }

  constructor() {
    super()
  }

  connectedCallback () {
    // 创建微应用实例
    const app = new CreateApp({
      name: this.name,
      url: this.url,
      container: this,
    })

    // 记入缓存，用于后续功能
    appInstanceMap.set(this.name, app)
  }

  disconnectedCallback () {
    // 获取应用实例
    const app = appInstanceMap.get(this.name)
    // 如果有属性destory，则完全卸载应用包括缓存的文件
    app.unmount(this.hasAttribute('destory'))
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    // 分别记录name及url的值
    if (attrName === 'name' && !this.name && newVal) {
      this.name = newVal
    } else if (attrName === 'url' && !this.url && newVal) {
      this.url = newVal
    }
  }
}

export function defineElement () {
  /**
   * 注册元素
   * 注册后，就可以像普通元素一样使用micro-app，当micro-app元素被插入或删除DOM时即可触发相应的生命周期函数。
   */
  if (!window.customElements.get('micro-app')) {
    window.customElements.define('micro-app', MyElement)
  }
}
