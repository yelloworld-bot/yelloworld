/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { pallete } from '@/styles/Color';
import {
  Menu,
  TopBar,
  BodyLarge,
  Headline_00,
  LabelLarge,
  Subtitle_01,
  Subtitle_02,
} from '@/component';
import { Button, Spinner, TextInput } from '@primer/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { editUser, userDetailFetcher } from '@/repository/user';
import { UserDetail } from '@/repository/schema';

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [userDetailData, setUserDetailData] = useState<UserDetail>();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['userDetail', { userId: id }],
    queryFn: userDetailFetcher,
  });

  useEffect(() => {
    if (data?.data) {
      setUserDetailData(data.data);
    }
  }, [data?.data]);

  if (isLoading) {
    return (
      <Spinner size={'large'} sx={{ padding: '300px 400px 300px 400px' }} />
    );
  }

  if (isError) {
    return (
      <>
        <div
          style={{
            backgroundColor: pallete['semantic-red-100'],
            padding: '100px 150px 100px 150px',
            borderRadius: '20px',
          }}
        >
          <Headline_00>에러</Headline_00>
          <Subtitle_01 style={{ color: pallete['semantic-red-500'] }}>
            {error.message}
          </Subtitle_01>
        </div>
      </>
    );
  }

  const onClickPost = async (userId: number) => {
    if (confirm(userId + '를 수정하시겠습니까?')) {
      const request = userDetailData;
      delete request?.id;
      delete request?.deletedAt;
      delete request?.group;

      await editUser(
        userId,
        request as Omit<UserDetail, 'id' | 'deleteAt' | 'group'>,
      )
        .then((res) => {
          alert(res.data.message);
          router.push(`/admin/user/${userId}`);
        })
        .catch((reason) => {
          alert(reason.response.data.message);
        });
    }
  };

  return (
    <>
      <div
        style={{
          padding: '20px 100px 20px 100px',
          marginTop: '20px',
          backgroundColor: pallete['grayscales-100'],
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button
          sx={{ backgroundColor: pallete['semantic-green-500'] }}
          onClick={() => {
            router.back();
          }}
        >
          {'이전'}
        </Button>
        <Headline_00 style={{ marginTop: '40px' }}>{'기본 정보'}</Headline_00>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'id'}</Subtitle_01>
          <BodyLarge>{data?.data.id}</BodyLarge>
        </div>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'옐로 아이디'}</Subtitle_01>
          <TextInput
            sx={{ width: '90%' }}
            aria-label='yelloId'
            name='yelloId'
            value={userDetailData?.yelloId}
            onChange={(e) =>
              setUserDetailData({
                ...userDetailData!,
                yelloId: e.target.value,
              })
            }
          />
        </div>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'이름'}</Subtitle_01>
          <TextInput
            sx={{ width: '90%' }}
            aria-label='name'
            name='name'
            value={userDetailData?.name}
            onChange={(e) =>
              setUserDetailData({
                ...userDetailData!,
                name: e.target.value,
              })
            }
          />
        </div>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'탈퇴 날짜'}</Subtitle_01>
          <BodyLarge>{data?.data.deletedAt}</BodyLarge>
        </div>

        <Headline_00 style={{ marginTop: '40px' }}>{'개인 정보'}</Headline_00>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'성별'}</Subtitle_01>
          <TextInput
            sx={{ width: '90%' }}
            aria-label='gender'
            name='gender'
            value={userDetailData?.gender}
            onChange={(e) =>
              setUserDetailData({
                ...userDetailData!,
                gender: e.target.value,
              })
            }
          />
        </div>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'이메일'}</Subtitle_01>
          <TextInput
            sx={{ width: '90%' }}
            aria-label='email'
            name='email'
            value={userDetailData?.email}
            onChange={(e) =>
              setUserDetailData({
                ...userDetailData!,
                email: e.target.value,
              })
            }
          />
        </div>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'프로필 사진'}</Subtitle_01>
          <BodyLarge>
            {data?.data.profileImage}
            <Image
              alt={'profileImage'}
              width={128}
              height={128}
              // eslint-disable-next-line
              src={data?.data.profileImage!}
            />
          </BodyLarge>
        </div>

        <Headline_00 style={{ marginTop: '40px' }}>
          {'소셜 로그인 정보'}
        </Headline_00>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>
            {'소셜 로그인 종류'}
          </Subtitle_01>
          <BodyLarge>{data?.data.social}</BodyLarge>
        </div>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>
            {'소셜로그인 ID'}
          </Subtitle_01>
          <TextInput
            sx={{ width: '90%' }}
            aria-label='uuid'
            name='uuid'
            value={userDetailData?.uuid}
            onChange={(e) =>
              setUserDetailData({
                ...userDetailData!,
                uuid: e.target.value,
              })
            }
          />
        </div>

        <Headline_00 style={{ marginTop: '40px' }}>{'학교 정보'}</Headline_00>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'학교 정보'}</Subtitle_01>
          <BodyLarge>{data?.data.group}</BodyLarge>
        </div>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'학교 학번'}</Subtitle_01>
          <TextInput
            sx={{ width: '90%' }}
            aria-label='groupAdmissionYear'
            name='groupAdmissionYear'
            value={userDetailData?.groupAdmissionYear}
            onChange={(e) =>
              setUserDetailData({
                ...userDetailData!,
                groupAdmissionYear: Number(e.target.value),
              })
            }
          />
        </div>

        <Headline_00 style={{ marginTop: '40px' }}>{'결제 정보'}</Headline_00>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'포인트'}</Subtitle_01>
          <TextInput
            sx={{ width: '90%' }}
            aria-label='point'
            name='point'
            value={userDetailData?.point}
            onChange={(e) =>
              setUserDetailData({
                ...userDetailData!,
                point: Number(e.target.value),
              })
            }
          />
        </div>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'열람권 개수'}</Subtitle_01>
          <TextInput
            sx={{ width: '90%' }}
            aria-label='ticketCount'
            name='ticketCount'
            value={userDetailData?.ticketCount}
            onChange={(e) =>
              setUserDetailData({
                ...userDetailData!,
                ticketCount: Number(e.target.value),
              })
            }
          />
        </div>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'구독 현황'}</Subtitle_01>
          <TextInput
            sx={{ width: '90%' }}
            aria-label='subscribe'
            name='subscribe'
            value={userDetailData?.subscribe}
            onChange={(e) =>
              setUserDetailData({
                ...userDetailData!,
                subscribe: e.target.value,
              })
            }
          />
        </div>

        <Headline_00 style={{ marginTop: '40px' }}>
          {'옐로 관련 정보'}
        </Headline_00>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>{'추천 받은 수'}</Subtitle_01>
          <TextInput
            sx={{ width: '90%' }}
            aria-label='recommendCount'
            name='recommendCount'
            value={userDetailData?.recommendCount}
            onChange={(e) =>
              setUserDetailData({
                ...userDetailData!,
                recommendCount: Number(e.target.value),
              })
            }
          />
        </div>

        <Headline_00 style={{ marginTop: '40px' }}>
          {'푸쉬 알람 정보'}
        </Headline_00>
        <div style={{ display: 'flex', padding: '10px 0 10px 0' }}>
          <Subtitle_01 style={{ width: '150px' }}>
            {'푸쉬 알람 deviceToken'}
          </Subtitle_01>
          <TextInput
            sx={{ width: '90%' }}
            aria-label='deviceToken'
            name='deviceToken'
            value={userDetailData?.deviceToken}
            onChange={(e) =>
              setUserDetailData({
                ...userDetailData!,
                deviceToken: e.target.value,
              })
            }
          />
        </div>

        <Button
          sx={{ backgroundColor: pallete['semantic-green-100'] }}
          onClick={() => {
            onClickPost(Number(id));
          }}
        >
          {'확인'}
        </Button>
      </div>
    </>
  );
}
