var http = require('sync-request');

import { LoggerUtils } from './logger.utils';

export class ConfigCenterUtils {

  private static readConfigCenter(url, applicationName, profile, label) {
    url = url + '/configs';
    var params_str = '';
    params_str += 'profile=' + profile;
    params_str += '&application=' + applicationName;
    params_str += '&label=' + label;
    var options = {};

    var response = http('GET', url + '?' + params_str, options);
    if (response.statusCode == 200) {
      return JSON.parse(response.getBody());
    } else {
      LoggerUtils.error(response);
      return null;
    }
  }

  static monitor(config) {
    //ebao.config.center.url
    //ebao.config.center.profile | dev
    //ebao.config.center.label | snapshot

    //url: {url}/configs?profile={?}&application={?}&label={?}
    if (config['application.name'] == null) {
      LoggerUtils.error('Missing config: application.name');
      return;
    }
    var applicationName = config['application.name'];

    if (config['ebao.config.center.url'] == null) {
      LoggerUtils.error('Missing config: ebao.config.center.url');
      return;
    }
    var url = config['ebao.config.center.url'];

    var profile = 'dev';
    if (config['ebao.config.center.profile'] != null) {
      profile = config['ebao.config.center.profile'];
    }

    var label = 'snapshot';
    if (config['ebao.config.center.label'] != null) {
      label = config['ebao.config.center.label'];
    }

    //public
    var configCenterResult = ConfigCenterUtils.readConfigCenter(url, 'public', profile, label);
    if (configCenterResult != null) {
      for (var item in configCenterResult.data) {
        config[item] = configCenterResult.data[item];
      }
    }

    //private
    configCenterResult = ConfigCenterUtils.readConfigCenter(url, applicationName, profile, label);
    if (configCenterResult != null) {
      for (var item in configCenterResult.data) {
        config[item] = configCenterResult.data[item];
      }
    }
  }
}