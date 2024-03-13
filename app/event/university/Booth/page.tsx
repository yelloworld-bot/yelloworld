'use client';

import {
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
  LANDING_PAGE_URL,
} from '@/util/string';
import React, { useEffect } from 'react';
import { isAndroid, isIOS } from 'react-device-detect';

export default function Page() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isIOS) {
        window.location.href = APP_STORE_URL;
      } else if (isAndroid) {
        window.location.href = GOOGLE_PLAY_URL;
      } else {
        window.location.href = LANDING_PAGE_URL;
      }
    }
  }, []);

  return (
    <>
      <div>{'redirecting...'}</div>
    </>
  );
}
