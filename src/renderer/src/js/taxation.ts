const _areaList = [
  {
    key: 'BEIJING',
    title: '北京'
  },
  {
    key: 'TIANJIN',
    title: '天津'
  },
  {
    key: 'HEBEI',
    title: '河北省'
  },
  {
    key: 'SHANXI',
    title: '山西省'
  },
  {
    key: 'NEIMENGGU',
    title: '内蒙古自治区'
  },
  {
    key: 'LIAONING',
    title: '辽宁省'
  },
  {
    key: 'DALIAN',
    title: '辽宁省大连市'
  },
  {
    key: 'JILIN',
    title: '吉林省'
  },
  {
    key: 'HEILONGJIANG',
    title: '黑龙江省'
  },
  {
    key: 'SHANGHAI',
    title: '上海'
  },
  {
    key: 'JIANGSU',
    title: '江苏省'
  },
  {
    key: 'ZHEJIANG',
    title: '浙江省'
  },
  {
    key: 'NINGBO',
    title: '浙江省宁波市'
  },
  {
    key: 'ANHUI',
    title: '安徽省'
  },
  {
    key: 'FUJIAN',
    title: '福建省'
  },
  {
    key: 'XIAMEN',
    title: '福建省厦门市'
  },
  {
    key: 'JIANGXI',
    title: '江西省'
  },
  {
    key: 'SHANDONG',
    title: '山东省'
  },
  {
    key: 'QINGDAO',
    title: '山东省青岛市'
  },
  {
    key: 'HENAN',
    title: '河南省'
  },
  {
    key: 'HUBEI',
    title: '湖北省'
  },
  {
    key: 'HUNAN',
    title: '湖南省'
  },
  {
    key: 'GUANGDONG',
    title: '广东省'
  },
  {
    key: 'SHENZHEN',
    title: '广东省深圳市'
  },
  {
    key: 'GUANGXI',
    title: '广西壮族自治区'
  },
  {
    key: 'HAINAN',
    title: '海南省'
  },
  {
    key: 'CHONGQING',
    title: '重庆'
  },
  {
    key: 'SICHUAN',
    title: '四川省'
  },
  {
    key: 'GUIZHOU',
    title: '贵州省'
  },
  {
    key: 'YUNNAN',
    title: '云南省'
  },
  {
    key: 'XIZANG',
    title: '西藏自治区'
  },
  {
    key: 'SHAANXI',
    title: '陕西省'
  },
  {
    key: 'GANSU',
    title: '甘肃省'
  },
  {
    key: 'QINGHAI',
    title: '青海'
  },
  {
    key: 'NINGXIA',
    title: '宁夏回族自治区'
  },
  {
    key: 'XINJIANG',
    title: '新疆维吾尔自治区'
  }
]

export const areaList = _areaList

export const areaDict = _areaList.reduce((dict, area) => {
  dict[area.key] = area.title
  return dict
})

/**
 * 获取登录链接
 * @param key
 */
export const getLoginUrl = (key: string): string => {
  return 'https://etax.' + key.toLowerCase() + '.chinatax.gov.cn:8443/'
}
