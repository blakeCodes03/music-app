import React from "react";

function CurrentTrack() {
    const topArtists = [
        {
          name: "Post Malone",
          image: "https://upload.wikimedia.org/wikipedia/en/7/72/Stoneyalbum.jpg",
          slug: "post-malone",
          song: "Stoney",
        },
        {
          name: "Troye Sivan",
          image:
            "https://upload.wikimedia.org/wikipedia/en/3/38/Troye_Sivan_-_Blue_Neighbourhood.png",
          slug: "troye-sivan",
          song: "Blue Neighbourhood",
        },
        {
          name: "Juice WRLD",
          image:
            "https://i1.sndcdn.com/artworks-6ckvoVw7hI2UphtB-R46ZkA-t500x500.jpg",
          slug: "juice-wrld",
          song: "Robbery",
        },
        {
          name: "Lil Uzi Vert",
          image:
            "https://media.pitchfork.com/photos/59a4383b8f174d4ac3871d97/1:1/w_600/600x600bb-1.jpg",
          slug: "lil-uzi-vert",
          song: "Luv Is Rage 2",
        },
        {
          name: "Drake",
          image:
            "https://upload.wikimedia.org/wikipedia/en/9/90/Scorpion_by_Drake.jpg",
          slug: "drake",
          song: "Scorpion",
        },
        {
          name: "The Weeknd",
          image:
            "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Weeknd_-_After_Hours.png",
          slug: "the-weeknd",
          song: "After Hours",
        },
        {
          name: "Lil Baby",
          image:
            "https://media.pitchfork.com/photos/5e56ce610e27b00008f7b845/1:1/w_600/My%20Turn_Lil%20Baby.jpg",
          slug: "lil-baby",
          song: "My Turn",
        },
        {
          name: "J. Cole",
          image: "https://upload.wikimedia.org/wikipedia/en/d/d3/JColeKOD.jpg",
          slug: "j-cole",
          song: "KOD",
        },
        {
          name: "Travis Scott",
          image:
            "https://upload.wikimedia.org/wikipedia/en/0/0b/Astroworld_by_Travis_Scott.jpg",
          slug: "travis-scott",
          song: "Astroworld",
        },
        {
          name: "XXXTentacion",
          image:
            "https://media.pitchfork.com/photos/59a73b170f1e570bad6cc33f/1:1/w_600/17_xxx.jpg",
          slug: "xxxtentacion",
          song: "17",
        },
      ];
  return (
    <div className="flex items-center gap-4">
      <div className=" flex w-[50px] h-full ">
      <img
      className="ml-30px rounded-[25px] shadow-md"
      src={topArtists[0].image}
      alt={topArtists[0].name}
    />
      </div>
      <div className="flex flex-col gap-2 ">
        <h4 className="text-black">currentlyPlaying.name</h4>
        <h6 className="text-[#b3b3b3]">song artists</h6>
      </div>
    </div>
  );
}

export default CurrentTrack;
