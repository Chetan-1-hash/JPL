export const MenGroups:string[][] = [
    ['Captian America', 'Iron Man', 'The Hulk'],
    ['Spider Man', 'Batman', 'Superman'],
    ['Thor', 'Loki', 'Black Panther'],
];

export const MensTeamNames:string[] = ['Captian America', 'Iron Man', 'The Hulk', 'Spider Man', 'Batman', 'Superman', 'Thor', 'Loki', 'Black Panther', 'Hawkeye', 'Vision'];

export const Menfixtures: { group: string, matches: { team1: string, team2: string, time: string }[] }[] = [
    {
      group: 'Group 1 Matches',
      matches: [
        { team1: 'Doremon', team2: 'Nobita', time: '7:00 AM - 7:30 AM' },
        { team1: 'Doremon', team2: 'Tom', time: '8:00 AM - 8:30 AM' },
        { team1: 'Doremon', team2: 'Jerry', time: '9:00 AM - 9:30 AM' },
        { team1: 'Nobita', team2: 'Tom', time: '10:00 AM - 10:30 AM' },
        { team1: 'Nobita', team2: 'Jerry', time: '11:00 AM - 11:30 AM' },
        { team1: 'Tom', team2: 'Jerry', time: '12:00 AM - 12:30 AM' },
      ],
    },
    {
      group: 'Group 2 Matches',
      matches: [
        { team1: 'Pikachu', team2: 'Raichu', time: '7:30 AM - 8:00 AM' },
        { team1: 'Pikachu', team2: 'Motu', time: '8:00 AM - 9:00 AM' },
        { team1: 'Pikachu', team2: 'Patlu', time: '9:30 AM - 10:00 AM' },
        { team1: 'Raichu', team2: 'Motu', time: '10:30 AM - 11:00 AM' },
        { team1: 'Raichu', team2: 'Patlu', time: '11:30 AM - 12:00 AM' },
        { team1: 'Motu ', team2: 'Patlu', time: '12:30 AM - 1:00 AM' },
      ],
    },
      {
        group: 'Knockout Matches',
        matches: [
          { team1: 'Winner of Group 1', team2: 'Runner-up of Group 2', time: '2:00 AM - 2:30 AM' },
          { team1: 'Winner of Group 2', team2: 'Runner-up of Group 2', time: '2:30 AM - 3:00 AM' },
          { team1: 'TBA', team2: 'TBA', time: '3:30 AM - 4:00 AM' },
        ],
      },
  ];
  