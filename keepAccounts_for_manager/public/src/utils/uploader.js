export default {
  initUpload: function(uptoken, button, callback, errorback,UploadProgress,FilesAdded) {
    Qiniu.uploader({
      runtimes: 'html5,flash',
      browse_button: button,
      max_file_size: '100mb',
      flash_swf_url: 'static/upload/plupload/Moxie.swf',
      dragdrop: true,
      chunk_size: '4mb',
      uptoken: uptoken.token,
      domain: uptoken.domain,
      get_new_uptoken: false,
      unique_names: true,
      auto_start: false,
      // 单选文件
      multi_selection: false,
      // 过滤选择的文件类型
      filters: {
        mime_types: [
          //只允许上传图片和zip文件
          {title: "所有图片", extensions: "jpg,png,jpeg"},
        ],
        // 最大只能上传2MB的文件
        max_file_size: '8192kb',
        // 不允许选取重复文件
        prevent_duplicates: false
      },
      init: {
        'FilesAdded': function (up, files) {
          if (FilesAdded) {
            FilesAdded(up,files);
          }
          up.start();
        },
        'BeforeUpload': function (up, file) {
        },
        'UploadProgress': function (up, file) {
          console.log("UploadProgress");
          console.log(file);
          console.log(up);
          if (UploadProgress) {
            UploadProgress(up,file);
          }
        },
        'UploadComplete': function () {
          console.log("UploadComplete");
        },
        'FileUploaded': function (up, file, info) {
          var url = up.getOption('domain') + $.parseJSON(info.response).key;
          callback(url);
        },
        'Error': function (up, err, errTip) {
          if (errorback) {
            errorback(up, err, errTip);
          } else {
            alert(errTip);
          }
        }
      }
    });
  },

  initMultiUpload: function(uptoken, button, callback, errorback,UploadProgress,FilesAdded) {
    Qiniu.uploader({
      runtimes: 'html5,flash',
      browse_button: button,
      max_file_size: '100mb',
      flash_swf_url: 'static/upload/plupload/Moxie.swf',
      dragdrop: true,
      chunk_size: '4mb',
      uptoken: uptoken.token,
      domain: uptoken.domain,
      get_new_uptoken: false,
      unique_names: true,
      auto_start: false,
      // 单选文件
      multi_selection: true,
      // 过滤选择的文件类型
      filters: {
        mime_types: [
          //只允许上传图片和zip文件
          {title: "所有图片", extensions: "jpg,png,jpeg"},
        ],
        // 最大只能上传2MB的文件
        max_file_size: '8192kb',
        // 不允许选取重复文件
        prevent_duplicates: false
      },
      init: {
        'FilesAdded': function (up, files) {
          if (FilesAdded) {
            FilesAdded(up,files);
          }
          up.start();
        },
        'BeforeUpload': function (up, file) {
        },
        'UploadProgress': function (up, file) {
          console.log("UploadProgress");
          console.log(file);
          console.log(up);
          if (UploadProgress) {
            UploadProgress(up,file);
          }
        },
        'UploadComplete': function () {
          console.log("UploadComplete");
        },
        'FileUploaded': function (up, file, info) {
          var url = up.getOption('domain') + $.parseJSON(info.response).key;
          callback(up, file, url);
        },
        'Error': function (up, err, errTip) {
          if (errorback) {
            errorback(up, err, errTip);
          } else {
            alert(errTip);
          }
        }
      }
    });
  },

  /*上传pdf格式文件*/
  initPdfUpload: function(uptoken, button, callback, errorback,UploadProgress,FilesAdded) {
    Qiniu.uploader({
      runtimes: 'html5,flash',   //上传模式,依次退化
      browse_button: button,     //上传选择的点选按钮，**必需**
      max_file_size: '20mb',    //最大文件体积限制
      flash_swf_url: 'static/upload/plupload/Moxie.swf',   //引入flash,相对路径
      dragdrop: true,    //开启可拖曳上传
      chunk_size: '4mb',   //分块上传时，每片的体积
      uptoken: uptoken.token,  //token
      domain: uptoken.domain,  //bucket 域名，下载资源时用到，**必需**
      get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
      unique_names: true,    //true生成唯一的文件名称
      auto_start: false,    //选择文件后自动上传，若关闭需要自己绑定事件触发上传
      multi_selection: false,  // 单选文件
      filters: {               // 过滤选择的文件类型
        mime_types: [
          {title: "pdf files", extensions: "pdf,PDF"},  //只允许上传图片和zip文件
        ],
        max_file_size: '20mb',     // 最大只能上传20MB的文件
        prevent_duplicates: false    // 不允许选取重复文件
      },
      init: {
        'FilesAdded': function (up, files) {
          if (FilesAdded) {
            FilesAdded(up,files);
          }
          up.start();
        },
        'BeforeUpload': function (up, file) {
        },
        'UploadProgress': function (up, file) {
          console.log("UploadProgress");
          console.log(file);
          console.log(up);
          if (UploadProgress) {
            UploadProgress(up,file);
          }
        },
        'UploadComplete': function () {
          console.log("UploadComplete");
        },
        'FileUploaded': function (up, file, info) {
          var url = up.getOption('domain') + $.parseJSON(info.response).key;
          callback(url);
        },
        'Error': function (up, err, errTip) {
          if (errorback) {
            errorback(up, err, errTip);
          } else {
            alert(errTip);
          }
        }
      }
    });
  }


}
