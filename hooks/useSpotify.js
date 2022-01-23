import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import { useEffect } from 'react/cjs/react.development';
import spotifyApi from '../lib/spotify';

function useSpotify() {
    const {data : session, status } = useSession();

    useEffect(() => {
        if(session){
            if(session.error === 'RefreshAccessTokenError'){
                signIn();
            }

            spotifyApi.setAccessToken(session.user.accessToken);
        }
    }, [session]);
  return spotifyApi;
}

export default useSpotify;
