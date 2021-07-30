import loadHtml from './source'

// 微应用实例
export const appInstanceMap = new Map()

// 创建微应用
export default class CreateApp {
  constructor ({ name, url, container }) {
    this.name = name // 应用名称
    this.url = url  // url地址
    this.container = container // micro-app元素
    this.status = 'loading'
    loadHtml(this)
  }

  status = 'created' // 组件状态，包括 created/loading/mount/unmount

  // 资源加载完时执行
  onLoad () {

  }

  /**
   * 资源加载完成后进行渲染
   */
  mount () {

  }

  /**
   * 卸载应用
   * 执行关闭沙箱，清空缓存等操作
   */
  unmount () {

  }
}
