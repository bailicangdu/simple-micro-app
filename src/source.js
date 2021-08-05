import { fetchSource } from './utils'
import scopedCSS from './scopedcss'

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

    // 进一步提取和处理js、css等静态资源
    extractSourceDom(htmlDom, app)

    // 获取micro-app-head元素
    const microAppHead = htmlDom.querySelector('micro-app-head')
    // 如果有远程css资源，则通过fetch请求
    if (app.source.links.size) {
      fetchLinksFromHtml(app, microAppHead, htmlDom)
    } else {
      app.onLoad(htmlDom)
    }

    // 如果有远程js资源，则通过fetch请求
    if (app.source.scripts.size) {
      fetchScriptsFromHtml(app, htmlDom)
    } else {
      app.onLoad(htmlDom)
    }
  }).catch((e) => {
    console.error('加载html出错', e)
  })
}

/**
 * 递归处理每一个子元素
 * @param parent 父元素
 * @param app 应用实例
 */
 function extractSourceDom(parent, app) {
  const children = Array.from(parent.children)

  // 递归每一个子元素
  children.length && children.forEach((child) => {
    extractSourceDom(child, app)
  })

  for (const dom of children) {
    if (dom instanceof HTMLLinkElement) {
      // 提取css地址
      const href = dom.getAttribute('href')
      if (dom.getAttribute('rel') === 'stylesheet' && href) {
        // 计入source缓存中
        app.source.links.set(href, {
          code: '', // 代码内容
        })
      }
      // 删除原有元素
      parent.removeChild(dom)
    } else if (dom instanceof HTMLStyleElement) {
      // 执行样式隔离
      scopedCSS(dom, app.name)
    } else if (dom instanceof HTMLScriptElement) {
      // 并提取js地址
      const src = dom.getAttribute('src')
      if (src) { // 远程script
        app.source.scripts.set(src, {
          code: '', // 代码内容
          isExternal: true, // 是否远程script
        })
      } else if (dom.textContent) { // 内联script
        const nonceStr = Math.random().toString(36).substr(2, 15)
        app.source.scripts.set(nonceStr, {
          code: dom.textContent, // 代码内容
          isExternal: false, // 是否远程script
        })
      }

      parent.removeChild(dom)
    }
  }
}

/**
 * 获取link远程资源
 * @param app 应用实例
 * @param microAppHead micro-app-head
 * @param htmlDom html DOM结构
 */
 export function fetchLinksFromHtml (app, microAppHead, htmlDom) {
  const linkEntries = Array.from(app.source.links.entries())
  // 通过fetch请求所有css资源
  const fetchLinkPromise = []
  for (const [url] of linkEntries) {
    fetchLinkPromise.push(fetchSource(url))
  }

  Promise.all(fetchLinkPromise).then((res) => {
    for (let i = 0; i < res.length; i++) {
      const code = res[i]
      // 拿到css资源后放入style元素并插入到micro-app-head中
      const link2Style = document.createElement('style')
      link2Style.textContent = code
      scopedCSS(link2Style, app.name)
      microAppHead.appendChild(link2Style)
      // 将代码放入缓存，再次渲染时可以从缓存中获取
      linkEntries[i][1].code = code
    }

    // 处理完成后执行onLoad方法
    app.onLoad(htmlDom)
  }).catch((e) => {
    console.error('加载css出错', e)
  })
}

/**
 * 获取js远程资源
 * @param app 应用实例
 * @param htmlDom html DOM结构
 */
 export function fetchScriptsFromHtml (app, htmlDom) {
  const scriptEntries = Array.from(app.source.scripts.entries())
  // 通过fetch请求所有js资源
  const fetchScriptPromise = []
  for (const [url, info] of scriptEntries) {
    // 如果是内联script，则不需要请求资源
    fetchScriptPromise.push(info.code ? Promise.resolve(info.code) :  fetchSource(url))
  }

  Promise.all(fetchScriptPromise).then((res) => {
    for (let i = 0; i < res.length; i++) {
      const code = res[i]
      // 将代码放入缓存，再次渲染时可以从缓存中获取
      scriptEntries[i][1].code = code
    }

    // 处理完成后执行onLoad方法
    app.onLoad(htmlDom)
  }).catch((e) => {
    console.error('加载js出错', e)
  })
}
