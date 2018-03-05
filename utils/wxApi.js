const wxApi = {
  /**
   * 当前是否联网
   * 0断网，1联网，2不清楚
   */
  haveNet(){
    return new Promise((resolve, reject) => {
      wx.getNetworkType({
        success: function (res) {
          // 返回网络类型, 有效值：
          // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
          var networkType = res.networkType;
          if (networkType == "none") {
            resolve(0)
          } else {
            resolve(1)
          }
        },
        fail(e) {
          resolve(2)
        }
      })
    })
  },
  downloadFile(url){
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: url, //仅为示例，并非真实的资源
        success: function (res) {
          console.log('downloadFile success', res)
          // res.tempFilePath
          resolve(res.tempFilePath)
        },
        fail(e) {
          console.log('downloadFile error', e)
          e.code = 1002
          reject(e)
        }
      })
    })
  },
  saveFile(path) {
    return new Promise((resolve, reject) => {
      wx.saveFile({
        tempFilePath: path,
        success: function (res) {
          console.log('wxApi saveFile success', res.savedFilePath)
          var savedFilePath = res.savedFilePath
          resolve(savedFilePath)
        },
        fail(e) {
          console.log('wxApi saveFile error', e)
          e.code = 1003
          reject(e)
        }
      })
    })
  },
  getSavedFileList() {
    return new Promise((resolve, reject) => {
      wx.getSavedFileList({
        success: function (res) {
          console.log('wxApi getSavedFileList success', res)
          resolve(res.fileList)
        },
        fail: function (res) {
          console.log('wxApi getSavedFileList error', res)
          reject()
        },
        complete: function (res) { },
      })
    })
  },
  removeSavedFile(path){
    return new Promise((resolve,reject)=>{
      wx.removeSavedFile({
        filePath: path,
        success(res) {
          console.log('wxApi removeFile success', res)
          resolve(res)
        },
        fail(e){
          console.log('wxApi removeFile error', e)
          reject(e)
        }
      })
    })
    
  },
  setStoreage(key, value) {
    // console.log('key', key)
    // console.log('value', value)
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key: key,
        data: value,
        success: function (res) {
          resolve()
        },
        fail: function (res) {
          reject()
        },
      })
    })

  },
  getStoreage(key) {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: key,
        success: function (res) {
          console.log('getStoreage', res)
          resolve(res.data)
        },
        fail: function (e) {
          console.log('getStorage error', e)
          resolve(false)
        }
      })
    })
  },
  
}
export default wxApi