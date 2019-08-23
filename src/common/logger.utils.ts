var fs = require('fs');
import { BasicUtils } from './basic.utils';

export class LoggerUtils {
  private static LOG_DIR:string = '.';

  static setPath(dirname:string) {
    BasicUtils.mkdirs(dirname);

    LoggerUtils.LOG_DIR = dirname;
  }

  static info = function(message:any) {
    LoggerUtils.writeLog('INFO', message);
  }

  static debug = function(message:any) {
    LoggerUtils.writeLog('DEBUG', message);
  }

  static error = function(message:any) {
    LoggerUtils.writeLog('ERROR', message);
  }

  static readFile = function(date:string) {
    return fs.readFileSync(LoggerUtils.LOG_DIR + '/' + date + '.txt', 'utf-8'); 
  }

  private static writeLog(type:string, message:any) {
    var dateString = LoggerUtils.getNowFormatDate();
    var logItem = {
      date: dateString,
      type: type,
      content: message
    };

    console.log(logItem);

    fs.writeFileSync(LoggerUtils.LOG_DIR + '/' + dateString + '.txt', JSON.stringify(logItem) + '\n', { 'flag': 'a' });
  }

  private static getNowFormatDate() : string{
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var currentdate = year + seperator1 + month + seperator1 + day;
    return currentdate;
  }
}