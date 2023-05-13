// This file contains our type and listings of various people, more specifically team members.

import type { StaticImageData } from "next/image";

export type Person = {
  Names: PersonName;
  Picture?: StaticImageData;
  Social?: PersonSocial;
};

export type PersonName = {
  First: string;
  Last: string;
};

export type PersonSocial = {
  Github?: string;
  Matrix?: string;
  Website?: string;
};

// Avatars
import AvatarCampbellJones from "../../public/images/avatars/CampbellJones.png";
import AvatarDavidMohammed from "../../public/images/avatars/DavidMohammed.png";
import AvatarEvanMaddock from "../../public/images/avatars/EvanMaddock.png";
import AvatarJoshuaStrobl from "../../public/images/avatars/JoshuaStrobl.jpg";

// People
export const People: Record<string, Person> = {
  CampbellJones: {
    Names: {
      First: "Campbell",
      Last: "Jones",
    },
    Picture: AvatarCampbellJones,
    Social: {
      Github: "serebit",
      Matrix: "@serebit:matrix.org",
      Website: "https://serebit.com/",
    },
  },
  DavidMohammed: {
    Names: {
      First: "David",
      Last: "Mohammed",
    },
    Picture: AvatarDavidMohammed,
    Social: {
      Github: "fossfreedom",
      Matrix: "@fossfreedom:matrix.org",
    },
  },
  EvanMaddock: {
    Names: {
      First: "Evan",
      Last: "Maddock",
    },
    Picture: AvatarEvanMaddock,
    Social: {
      Github: "EbonJaeger",
      Matrix: "@ebonjaeger:matrix.org",
    },
  },
  JoshuaStrobl: {
    Names: {
      First: "Joshua",
      Last: "Strobl",
    },
    Picture: AvatarJoshuaStrobl,
    Social: {
      Github: "JoshStrobl",
      Matrix: "@joshuastrobl:matrix.org",
      Website: "https://joshuastrobl.com",
    },
  },
};
