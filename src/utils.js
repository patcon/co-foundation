import { PROVINCE_DATA } from './constants'

export const getProvinceByCode = (code) => {
  return PROVINCE_DATA.find(p => p.code === code)
}