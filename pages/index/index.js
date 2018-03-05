import { managerFile } from '../../utils/managerFile'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:'',
    // 测试文件地址
    testFileUrl:'https://mp.weixin.qq.com/debug/wxadoc/gitbook/images/head_global_z_@all.png'
  },

  onLoad: function (options) {
  
  },
  onSaveTap(){
    let that = this
    /**
     * saveFile 存储文件
     * @param 
     * name{string} 用来存／取／删除文件的标志，
     * url{string} 需要存文件的地址
     * @returns 
     * {promise}
     */
    managerFile.saveFile({
      name:'test',
      url: that.data.testFileUrl
    })
    .then(res=>{
      that.setData({
        result: JSON.stringify(res)
      })
    })
    .catch(e=>{
      that.setData({
        result: JSON.stringify(e)
      })
    })
  },
  onGetTap(){
    let that = this
    /**
     * getFile 获取文件
     * @param 
     * 取文件的key值
     * @returns 
     * {promise}
     */
    managerFile.getFile('test')
    .then(res => {
      that.setData({
        result: JSON.stringify(res)
      })
    })
    .catch(e => {
      that.setData({
        result: JSON.stringify(e)
      })
    })
  },
  onRemoveTap(){
    let that = this
    /**
     * removeFile 获取文件
     * @param 
     * 删除文件的key值
     * @returns 
     * {promise}
     */
    managerFile.removeFile('test')
      .then(res => {
        that.setData({
          result: JSON.stringify(res)
        })
      })
      .catch(e => {
        that.setData({
          result: JSON.stringify(e)
        })
      })
  },
  onGetListTap(){
    let that = this
    /**
     * getSavedFileList 获取文件列表（包含key值）
     * @returns 
     * {promise}
     */
    managerFile.getSavedFileList()
      .then(res => {
        that.setData({
          result: JSON.stringify(res)
        })
      })
      .catch(e => {
        that.setData({
          result: JSON.stringify(e)
        })
      })
  }
})