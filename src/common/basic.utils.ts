var uuid = require('node-uuid');
var fs = require('fs');
var path = require("path");

export class BasicUtils {
  static isEmpty(obj) : boolean{
    return obj == null || obj.length == 0;
  }

  static randomString(len:number) : string{
    len = len || 32;
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }

  static randomNumberString(len:number) : string {
    len = len || 32;
    var $chars = '0123456789';
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }

  static guid() : string{
    return uuid.v1().replace(new RegExp("-","gm"), '');
  }

  static mkdirs(dirname:string) : boolean{
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (this.mkdirs(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
    return false;
  }

}