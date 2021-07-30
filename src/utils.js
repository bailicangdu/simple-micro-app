
/**
 * 获取静态资源
 * @param {string} url 静态资源地址
 */
export function fetchSource (url) {
  return fetch(url).then((res) => {
    return res.text()
  })
}
