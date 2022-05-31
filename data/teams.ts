// This file contains our teams, description of the team, URL to further details, and list of members

export type Team = {
  Description: string;
  Members: string[];
  Name: string;
  URL: string;
};

export const Teams: Team[] = [
  {
    Description:
      "This team is responsible for general day-to-day maintenance of our software whether that be issue triaging and code reviews or releasing a new version of Budgie Desktop.",
    Members: ["JoshuaStrobl", "CampbellJones", "DavidMohammed", "JulienGuillot", "EvanMaddock"],
    Name: "Best Buds",
    URL: "",
  },
  {
    Description:
      "This team is responsible for active community outreach, main site content writing, release promotion, and general marketing.",
    Members: ["JoshuaStrobl", "CampbellJones", "DavidMohammed", "EvanMaddock"],
    Name: "Community Engagement & Marketing Team",
    URL: "",
  },
  {
    Description:
      "This team is responsible for the distribution / packaging of Budgie and its microcosm of supplemental software on various operating systems.",
    Members: ["JoshuaStrobl", "CampbellJones", "DavidMohammed", "EvanMaddock"],
    Name: "Distribution / Packaging Team",
    URL: "",
  },
  {
    Description: "This team is responsible for improving documentation of the organization and our software.",
    Members: ["JoshuaStrobl", "CampbellJones", "DavidMohammed", "JulienGuillot", "EvanMaddock"],
    Name: "Documentation Team",
    URL: "",
  },
  {
    Description:
      "This team is responsible for the development and management of our web properties and infrastructure.",
    Members: ["JoshuaStrobl", "JulienGuillot"],
    Name: "Infrastructure and Web Ops Team",
    URL: "",
  },
];
