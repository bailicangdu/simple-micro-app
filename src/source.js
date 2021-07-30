import { fetchSource } from './utils'

export default function loadHtml (app) {
  fetchSource(app.url).then((html) => {
    html = html
      .replace(/<head[^>]*>[\s\S]*?<\/head>/i, (match) => {
        return match
          .replace(/<head/i, '<micro-app-head')
          .replace(/<\/head>/i, '</micro-app-head>')
      })
      .replace(/<body[^>]*>[\s\S]*?<\/body>/i, (match) => {
        return match
          .replace(/<body/i, '<micro-app-body')
          .replace(/<\/body>/i, '</micro-app-body>')
      })

    // 将html字符串转化为DOM结构
    const htmlDom = document.createElement('div')
    htmlDom.innerHTML = html

    console.log('html:', htmlDom)
  }).catch((e) => {
    console.error('加载html出错', e)
  })
}
