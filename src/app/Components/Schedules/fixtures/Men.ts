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
        { team1: 'Captain America', team2: 'Iron Man', time: '7:00 AM - 7:30 AM' },
        { team1: 'Captain America', team2: 'The Hulk', time: '8:30 AM - 9:00 AM' },
        { team1: 'Iron Man', team2: 'The Hulk', time: '10:00 AM - 10:30 AM' },
      ],
    },
    {
      group: 'Group 2 Matches',
      matches: [
        { team1: 'Spider Man', team2: 'Batman', time: '7:30 AM - 8:00 AM' },
        { team1: 'Spider Man', team2: 'Batman', time: '9:00 AM - 9:30 AM' },
        { team1: 'Batman', team2: 'SuperMan', time: '10:30 AM - 11:00 AM' },
      ],
    },
    {
      group: 'Group 3 Matches',
      matches: [
        { team1: 'Thor', team2: 'Loki', time: '8:00 AM - 8:30 AM' },
        { team1: 'Thor', team2: 'Black Panther', time: '9:30 AM - 10:00 AM' },
        { team1: 'Loki', team2: 'Black Panther', time: '11:00 AM - 11:30 AM' },
      ],
    },
    {
        group: 'Cross Groups Matches',
        matches: [
          { team1: 'Captain America', team2: 'Spider Man', time: '11:30 AM - 12:00 AM' },
          { team1: 'Iron Man', team2: 'Batman', time: '12:00 AM - 12:30 AM' },
          { team1: 'The Hulk', team2: 'Superman', time: '12:30 AM - 1:00 AM' },
          { team1: 'Captain America', team2: 'Thor', time: '1:00 AM - 1:30 AM' },
          { team1: 'Iron Man', team2: 'Loki', time: '1:30 AM - 2:00 AM' },
          { team1: 'The Hulk', team2: 'Black Panther', time: '2:00 AM - 2:30 AM' },
          { team1: 'Spider Man', team2: 'Thor', time: '2:30 AM - 3:00 AM' },
          { team1: 'Batman', team2: 'Loki', time: '3:00 AM - 3:30 AM' },
          { team1: 'Superman', team2: 'Black Panther', time: '3:30 AM - 4:00 AM' },
        ],
      },
      {
        group: 'Knockout Matches',
        matches: [
          { team1: 'Winner of Group 1', team2: 'Runner-up of Group 2', time: '4:00 AM - 4:30 AM' },
          { team1: 'Winner of Group 2', team2: 'Runner-up of Group 3', time: '4:30 AM - 5:00 AM' },
          { team1: 'Winner of Group 3', team2: 'Runner-up of Group 1', time: '5:00 AM - 5:30 AM' },
          { team1: 'TBA', team2: 'TBA', time: '5:30 AM - 6:00 AM' },
        ],
      },
  ];
  