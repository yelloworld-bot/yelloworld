import axios from 'axios';
import {
  BaseResponse,
  GetSchoolAttackStatistics,
  SchoolAttackStatistics,
} from './schema';
import { BASE_URL } from '@/util/string';

export const getSchoolAttackStatistics = async (page: number) => {
  return await axios<BaseResponse<GetSchoolAttackStatistics>>({
    method: 'GET',
    url: `${BASE_URL}/api/v1/statistics/user-group/school-attack?page=${page}`,
  });
};

export const getSchoolAttackStatisticsDetail = async (groupId: string) => {
  return await axios<BaseResponse<SchoolAttackStatistics>>({
    method: 'GET',
    url: `${BASE_URL}/api/v1/statistics/user-group/school-attack/${groupId}`,
  });
};

export const getSchoolAttackStatisticsLikeGroupName = async (
  groupId: string,
  page: number,
) => {
  return await axios<BaseResponse<GetSchoolAttackStatistics>>({
    method: 'GET',
    url: `${BASE_URL}/api/v1/statistics/user-group/school-attack/group-name/${groupId}?page=${page}`,
  });
};
