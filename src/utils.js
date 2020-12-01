import config from './config'
export function showSuccess (text) {
  wx.showToast({
    title: '成功',
    icon: 'success',
    duration: 2000
  })
}
export function showModal (title, content) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false
  })
}
function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      method: method,
      data: data,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}

export function get (url, data) {
  return request(url, 'GET', data)
}
export function post (url, data) {
  return request(url, 'POST', data)
}
