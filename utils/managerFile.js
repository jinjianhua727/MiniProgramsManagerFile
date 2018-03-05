import wxApi from './wxApi'
const FILESTOREAGE = 'managerFile'
const managerFile = {
  saveFile(opts) {
    let that = this
    return new Promise((resolve, reject) => {
      wxApi.haveNet()
        .then(res => {
          if (res == 1 || res == 2) {
            return that.removeFile(opts.name)
          } else {
            reject({ code: 1001, msg: 'not have net' })
          }
        })
        .then(res => {
          return wxApi.downloadFile(opts.url)
        })
        .then(res => {
          return wxApi.saveFile(res)
        })
        .then(res => {
          return that._setStoreage(opts.name, res)
        })
        .then(res => {
          resolve({ code: 1, data: res })
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  getFile(name) {
    let that = this
    return new Promise((resolve, reject) => {
      that._getStoreage(name)
        .then(res => {
          if (res) {
            resolve(res)
          } else {
            reject({ code: 1001, msg: 'no file' })
          }
        })
    })
  },
  removeFile(name) {
    let that = this
    return new Promise((resolve, reject) => {
      that._getStoreage(name)
        .then(res => {
          if (res) {
            return wxApi.removeSavedFile(res)
          } else {
            resolve({ code: 1 })
          }
        })
        .then(res => {
          return that._removeStoreage(name)
        })
        .then(res => {
          resolve({ code: 1 })
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  getSavedFileList() {
    let that = this, files = [], storeages = []
    return new Promise((resolve, reject) => {
      wxApi.getSavedFileList()
        .then(res => {
          files = res || []
          return that._getStoreages()
        })
        .then(res => {
          storeages = res || []
          // console.log('files', files)
          files.forEach((value, index) => {
            let { entries } = Object;
            for (let [key, val] of entries(storeages)) {
              if (val == value.filePath) {
                files[index].name = key
              }
            }
          })
          resolve(files)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  _setStoreage(key, value) {
    let that = this
    return new Promise((resolve, reject) => {
      that._getStoreage(FILESTOREAGE)
        .then(res => {
          let files = res || {}
          files[key] = value
          _recursion(files)
        })

      function _recursion(files) {
        wxApi.setStoreage(FILESTOREAGE, files)
          .then(res => {
            resolve(value)
          })
          .catch(e => {
            console.log('try save file again')
            _recursion()
          })
      }
    })
  },
  _getStoreage(name) {
    let that = this
    return new Promise((resolve, reject) => {
      _recursion()
      function _recursion() {
        wxApi.getStoreage(FILESTOREAGE)
          .then(res => {
            if (res) {
              resolve(res[name])
            } else {
              resolve(false)
            }

          })
          .catch(e => {
            console.log('try get file again')
            _recursion()
          })
      }
    })
  },
  _getStoreages() {
    let that = this
    return new Promise((resolve, reject) => {
      _recursion()
      function _recursion() {
        wxApi.getStoreage(FILESTOREAGE)
          .then(res => {
            if (res) {
              resolve(res)
            } else {
              resolve(false)
            }

          })
          .catch(e => {
            console.log('try get file again')
            _recursion()
          })
      }
    })
  },
  _removeStoreage(name) {
    let that = this
    return new Promise((resolve, reject) => {
      wxApi.getStoreage(FILESTOREAGE)
        .then(res => {
          if (res && res[name]) {
            delete res[name]
            return res
          } {
            resolve(true)
          }
        })
        .then(res => {
          _recursion()
        })

      function _recursion(files) {
        wxApi.setStoreage(FILESTOREAGE, files)
          .then(res => {
            resolve(true)
          })
          .catch(e => {
            console.log('try save file again')
            _recursion()
          })
      }
    })

  }
}
const FILES = {
  
}
module.exports = {
  managerFile,
  FILES
}