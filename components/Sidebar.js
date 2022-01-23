import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    RssIcon,
    LogoutIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { playlistIdState } from "../atoms/playlistAtom";
import {useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import spotifyApi from "../lib/spotify";
import { HeartIcon, PlusSmIcon } from "@heroicons/react/solid";

function Sidebar() {
    const spotifyApi = useSpotify();
    const { data: session, status} = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    console.log('You picked playlist', playlistId);

    useEffect(()=>{
        if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi]);

   
  return <div className="text-gray-500 p-5 text-sx lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
          <button className="flex items-center space-x-4 hover:text-white">
              <HomeIcon className="h-5 w-5" />
              <p>Home</p>
          </button>
          <button className="flex items-center space-x-4 hover:text-white" >
              <SearchIcon className="h-5 w-5" />
              <p>Search</p>
          </button>
          <button className="flex items-center space-x-4 hover:text-white">
              <LibraryIcon className="h-5 w-5" />
              <p>Your Library</p>
          </button>
          <hr className="border-t-[0.1px] border-gray-900"/>


          <button className="flex items-center space-x-4 hover:text-white">
              <PlusCircleIcon className="h-5 w-5 text-emerald-50" />
              <p>Creat Playlist</p>
          </button>
          <button className=" flex items-center space-x-4 hover:text-white" >
              <HeartIcon className="h-5 w-5 text-blue-500" />
              <p>Liked songs</p>
          </button>
          <button className="flex items-center space-x-4 hover:text-white">
              <RssIcon className="h-5 w-5 text-green-500" />
              <p>Your episodes</p>
          </button>
          <hr className="border-t-[0.1px] border-gray-900"/>

          {/*Playlist....*/}
        {playlists.map((playlist) =>(
            <p key={playlists.id} onClick={() => setPlaylistId(playlist.id) } className="cursor-pointer hover:text-white">{playlist.name}</p>
        )
        )}
          
      </div>
  </div>;
}

export default Sidebar;