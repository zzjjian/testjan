exports = module.exports = {
  port: process.env.PORT || 8080,
  api_info: {
    title: "testjan",
    version: "1.0",
    tenant: "eBao",
    description: "API to do something...",
    termsOfServiceUrl: "",
    contact: "yourname@something.com",
    license: "",
    licenseUrl: ""
  },
  //创建默认表脚本
  createDefaultTableSQL:[

  ],
  //配置中心配置
  'application.name': 'testjan',
  'ebao.config.center.url': process.env.ebao_config_center_url || 'http://172.25.16.153:30010',
  'ebao.config.center.profile': 'ec-test',
  'ebao.config.center.label': 'snapshot'
};