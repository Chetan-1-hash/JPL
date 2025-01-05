import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';  // Import the xlsx library
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MVPMenList } from './SpecialList'
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-team-generation',
  imports: [FormsModule, CommonModule, SpinnerComponent],
  templateUrl: './team-generation.component.html',
  styleUrls: ['./team-generation.component.css']
})
export class TeamGenerationComponent {

  constructor(private toastr: ToastrService) { }


  isMenSelected: boolean = false;
  isWomenSelected: boolean = false;
  isBoysSelected: boolean = false;
  isGirlsSelected: boolean = false;

  MensTeamNames: string[] = ['Doremon', 'Shinchan', 'Tom', 'Jerry', 'Oggy', 'Ninja Hatori', 'Nobita', 'Pokemon', 'Motu Patlu', 'Pikachu', 'SpongeBob SquarePants'];
  WomensTeamNames: string[] = ['Wonder Woman', 'Captian Marvel', 'Mantis', 'Moondragon'];
  BoysTeamNames: string[] = ['Captian America', 'Iron Man', 'The Hulk', 'Spider Man', 'Batman', 'Thor', 'Loki', 'Black Panther', 'Hawkeye', 'Vision'];
  GirlsTeamNames: string[] = ['Cinderella', 'Snow White', 'Tom', 'Jerry', 'Moana', 'Minnie Mouse'];

  teamMenSize: number = 8;
  teamWomenSize: number = 7;
  teamBoysSize: number = 7;
  teamGirlsSize: number = 7;

  teamSize: number = 8;

  generatedMenTeams: string[][] = [];
  generatedWomenTeams: string[][] = [];
  generatedBoysTeams: string[][] = [];
  generatedGirlsTeams: string[][] = [];

  workbook: XLSX.WorkBook | null = null;


  onFileUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      this.workbook = workbook;
    };

    reader.readAsBinaryString(file);
  }

  extractNamesAndAgesFromSheet(workbook: XLSX.WorkBook, sheetName: string): { name: string; age: number }[] {
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      console.error(`Sheet ${sheetName} not found!`);
      this.toastr.error(`Sheet ${sheetName} not found!`);
      return [];
    }

    const data: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const fullNames: { name: string; age: number }[] = [];
    const fullNameIndex = data[0].indexOf('FullName');
    const ageIndex = data[0].indexOf('Age');  // Assuming 'Age' column exists

    for (let i = 1; i < data.length; i++) {
      if (data[i][fullNameIndex] && data[i][ageIndex]) {
        const rawName = data[i][fullNameIndex];
        const age = data[i][ageIndex];
        const nameParts = rawName.split(' ').filter(Boolean); // Split and remove extra spaces
        const cleanedName = nameParts.length > 1
          ? `${nameParts[0]} ${nameParts[nameParts.length - 1]}` // Keep first and last names
          : rawName; // If only one part, keep it as is

        fullNames.push({ name: cleanedName, age: age });
      }
    }

    return fullNames;
  }


  // Shuffle an array of players, each having a name and age property
  shuffleArray(arr: string[]): void {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Split players into teams based on the team size
  splitIntoTeams(players:string[], teamSize: number): string[][] {
    const teams: string[][] = [];

    // Ensure the teams are as evenly distributed as possible
    for (let i = 0; i < players.length; i += teamSize) {
      const team: string[] = [];
      for (let j = i; j < i + teamSize && j < players.length; j++) {
        team.push(players[j]); // Push the player's name to the team
      }
      teams.push(team);
    }

    return teams;
  }


  generateTeams(): void {
    if (!this.workbook) {
      console.error('No workbook loaded!');
      this.toastr.error("No workbook loaded!");
      return;
    }

    // Extract player names from the respective sheets
    const menPlayers = this.extractNamesAndAgesFromSheet(this.workbook, 'MEN');
    const womenPlayers = this.extractNamesAndAgesFromSheet(this.workbook, 'WOMEN');
    const boysPlayers = this.extractNamesAndAgesFromSheet(this.workbook, 'Boys');
    const girlsPlayers = this.extractNamesAndAgesFromSheet(this.workbook, 'Girls');

    // Shuffle players for non-MEN categories
    this.shuffleArray(womenPlayers.map(players => players.name));
    this.shuffleArray(boysPlayers.map(players => players.name));
    this.shuffleArray(girlsPlayers.map(players => players.name));

    // Divide into age groups
    const age13To16Players = menPlayers.filter(player => player.age >= 13 && player.age <= 16).map(players => players.name);
    const age17AndAbovePlayers = menPlayers.filter(player => player.age >= 17).map(player => player.name);


    // Extract MVP List for both age groups
    const mvp13_16 = age13To16Players.filter(player => MVPMenList.includes(player));
    const mvp17_above = age17AndAbovePlayers.filter(player => MVPMenList.includes(player));
    
    // Divide MEN players by prioritizing MVPMenList
    const nonmvpPlayers13_16 = age13To16Players.filter(player => !MVPMenList.includes(player));
    const nonmvpPlayers17_Above = age17AndAbovePlayers.filter(player => !MVPMenList.includes(player));

    const mvpPlayers = [...mvp13_16, ...mvp17_above];

    // Shuffle remaining MEN players
    this.shuffleArray(nonmvpPlayers17_Above);

    
    // Divide MVP players according to age equally across teams
    const totalTeams = Math.ceil(menPlayers.length / this.teamMenSize);
    const mvpTeams = this.initializeEmptyTeams(totalTeams);
    // this.distributeMVPPlayers(mvpTeams, specialList);
    this.distributeMVPPlayers(mvpTeams, mvpPlayers);
    this.distributeMVPPlayers(mvpTeams, nonmvpPlayers13_16);


    // Fill the remaining slots in each team with non-MVP players
    const finalMenTeams = this.fillTeams(mvpTeams, nonmvpPlayers17_Above, this.teamMenSize);

    // Generate teams for other categories
    this.generatedMenTeams = finalMenTeams;
    this.generatedWomenTeams = this.splitIntoTeams(womenPlayers.map(players => players.name), this.teamWomenSize);
    this.generatedBoysTeams = this.splitIntoTeams(boysPlayers.map(players => players.name), this.teamBoysSize);
    this.generatedGirlsTeams = this.splitIntoTeams(girlsPlayers.map(players => players.name), this.teamGirlsSize);
  }

  initializeEmptyTeams(totalTeams: number): string[][] {
    const teams: string[][] = [];
    for (let i = 0; i < totalTeams; i++) {
      teams.push([]);
    }
    return teams;
  }

  distributeMVPPlayers(teams: string[][], specialPlayers: string[]): void {
    let teamIndex = 0;
    specialPlayers.forEach(player => {
      teams[teamIndex].push(player);
      teamIndex = (teamIndex + 1) % teams.length; // Move to the next team cyclically
    });
  }

  fillTeams(teams: string[][], remainingPlayers: string[], teamSize: number): string[][] {
    for (const player of remainingPlayers) {
      for (const team of teams) {
        if (team.length < teamSize) {
          team.push(player);
          break; // Move to the next player after filling a slot
        }
      }
    }
    return teams;
  }




  exportPdf(): void {
    const container = document.querySelector('.outputsection') as HTMLElement | null;
    if (!container) {
      console.error('No output section to export!');
      this.toastr.error("No table generated to export!");
      return;
    }

    // Ensure all categories are visible
    container.classList.add('desktop-layout'); // Apply a desktop-like layout for styling consistency

    html2canvas(container, {
      scale: 2, // Higher resolution
      scrollX: -window.scrollX, // Handle scrolling offsets
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'px', [1600, 4000]); // Set layout size to match desktop

      const imgWidth = 1536;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let currentHeight = 0;
      pdf.addImage(imgData, 'PNG', 0, -currentHeight, imgWidth, imgHeight);

      pdf.save('Generated_Teams.pdf'); // Save the file

      container.classList.remove('desktop-layout'); // Clean up layout modifications
    });
  }


  exportExcel(): void {
    const workbook = XLSX.utils.book_new();

    if (this.isMenSelected && this.generatedMenTeams.length > 0) {
      this.teamSize = this.teamMenSize;
      const menSheetData = this.generateSheetData(this.generatedMenTeams, this.MensTeamNames);
      const menSheet = XLSX.utils.aoa_to_sheet(menSheetData);
      XLSX.utils.book_append_sheet(workbook, menSheet, 'Men Teams');
    }

    if (this.isWomenSelected && this.generatedWomenTeams.length > 0) {
      this.teamSize = this.teamWomenSize;
      const womenSheetData = this.generateSheetData(this.generatedWomenTeams, this.WomensTeamNames);
      const womenSheet = XLSX.utils.aoa_to_sheet(womenSheetData);
      XLSX.utils.book_append_sheet(workbook, womenSheet, 'Women Teams');
    }

    if (this.isBoysSelected && this.generatedBoysTeams.length > 0) {
      this.teamSize = this.teamBoysSize;
      const boysSheetData = this.generateSheetData(this.generatedBoysTeams, this.BoysTeamNames);
      const boysSheet = XLSX.utils.aoa_to_sheet(boysSheetData);
      XLSX.utils.book_append_sheet(workbook, boysSheet, 'Boys Teams');
    }

    if (this.isGirlsSelected && this.generatedGirlsTeams.length > 0) {
      this.teamSize = this.teamGirlsSize;
      const girlsSheetData = this.generateSheetData(this.generatedGirlsTeams, this.GirlsTeamNames);
      const girlsSheet = XLSX.utils.aoa_to_sheet(girlsSheetData);
      XLSX.utils.book_append_sheet(workbook, girlsSheet, 'Girls Teams');
    }

    XLSX.writeFile(workbook, 'Generated_Teams_Excel.xlsx');
  }


  generateSheetData(teams: string[][], teamNames: string[]): any[][] {
    const sheetData: any[][] = [];

    const headerRow: string[] = [];
    teamNames.forEach((teamName, index) => {
      headerRow.push(teamName || `Team-${index + 1}`);
      if (index < teamNames.length - 1) headerRow.push(''); // Add a space column between teams
    });
    sheetData.push(headerRow);

    const maxPlayers = Math.max(...teams.map((team) => team.length));

    for (let i = 0; i < maxPlayers; i++) {
      const playerRow: string[] = [];
      teams.forEach((team, index) => {
        playerRow.push(team[i] || ''); // Add player or empty string if no player exists
        if (index < teams.length - 1) playerRow.push(''); // Add a space column between teams
      });
      sheetData.push(playerRow);
    }

    return sheetData;
  }

}