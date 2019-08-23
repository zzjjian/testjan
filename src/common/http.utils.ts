import { LoggerUtils } from "./logger.utils";
import { ResultInfo } from "./result.obj";

var http = require('sync-request');

export class HttpUtils {
  static get(url, params, headers) : ResultInfo {
    var response = HttpUtils.request('GET', url, params, headers);
    return response;
  }

  static post(url, params, headers) : ResultInfo {
    var response = HttpUtils.request('POST', url, params, headers);
    return response;
  }

  private static request(method, url, params, headers) : ResultInfo {
    params = params || {};
    headers = headers || {};

    var options = {
      headers: headers,
      body: null,
      json: null
    };

    var params_str = '';
    if (method == 'GET') {
      if (params instanceof Object) {
        params_str += '?';
        for (var key in params) {
          params_str += key + '=' + params[key] + '&';
        }
        params_str = params_str.substring(0, params_str.length - 1);
      }
      else if (params instanceof String) {
        params_str = params.toString();
      }

      LoggerUtils.info('GET Request: ' + url + params_str);
      LoggerUtils.info(options);
      var response = http('GET', url + params_str, options);
      if (response.statusCode == 200) {
        return ResultInfo.ok(JSON.parse(response.getBody()));
      } else {
        LoggerUtils.error('ERROR RESPONSE');
        LoggerUtils.error(response);
        return ResultInfo.error(response.statusCode);
      }
    } else {
      if (params instanceof String) {
        options.body = params;
      } else {
        options.json = params;
      }

      LoggerUtils.info('POST Request: ' + url);
      LoggerUtils.info(options);
      var response = http('POST', url, options);
      if (response.statusCode == 200) {
        return ResultInfo.ok(JSON.parse(response.getBody()));
      } else {
        LoggerUtils.error('ERROR RESPONSE');
        LoggerUtils.error(response);
        return ResultInfo.error(response.statusCode);
      }
    }
  }
}