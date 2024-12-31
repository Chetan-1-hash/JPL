import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';  // Import the xlsx library
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-team-generation',
  imports: [FormsModule, CommonModule],
  templateUrl: './team-generation.component.html',
  styleUrls: ['./team-generation.component.css']
})
export class TeamGenerationComponent {


  isMenSelected: boolean = false; 
  isWomenSelected: boolean = false; 
  isBoysSelected: boolean = false;
  isGirlsSelected: boolean = false;

  MensTeamNames: string[] = ['Captian America', 'Iron Man', 'The Hulk', 'Spider Man', 'Batman', 'Thor', 'Loki', 'Black Panther','Hawkeye', 'Vision'];
  WomensTeamNames: string[] = ['Wonder Woman', 'Captian Marvel', 'Mantis','Moondragon'];
  BoysTeamNames: string[] = ['Doremon', 'Shinchan', 'Tom', 'Jerry', 'Oggy', 'Ninja Hatori', 'SpongeBob SquarePants', 'Pokemon', 'Motu Patlu'];
  GirlsTeamNames: string[] = ['Cinderella', 'Snow White', 'Tom', 'Jerry', 'Moana','Minnie Mouse'];

  teamMenSize: number = 7;
  teamWomenSize: number = 7;
  teamBoysSize: number = 7;
  teamGirlsSize: number = 7;

  teamSize:number = 7;

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

  shuffleArray(arr: string[]): void {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  generateTeams(): void {
    if (!this.workbook) {
      console.error('No workbook loaded!');
      alert('No workbook loaded!');
      return;
    }

    const menPlayers = this.extractNamesFromSheet(this.workbook, 'MEN');
    const womenPlayers = this.extractNamesFromSheet(this.workbook, 'WOMEN');
    const boysPlayers = this.extractNamesFromSheet(this.workbook, 'Boys');
    const girlsPlayers = this.extractNamesFromSheet(this.workbook, 'Girls');

    this.shuffleArray(menPlayers);
    this.shuffleArray(womenPlayers);
    this.shuffleArray(boysPlayers);
    this.shuffleArray(girlsPlayers);

    this.generatedMenTeams = this.splitIntoTeams(menPlayers, this.teamMenSize);
    this.generatedWomenTeams = this.splitIntoTeams(womenPlayers, this.teamWomenSize);
    this.generatedBoysTeams = this.splitIntoTeams(boysPlayers, this.teamBoysSize);
    this.generatedGirlsTeams = this.splitIntoTeams(girlsPlayers, this.teamGirlsSize);
  }

  extractNamesFromSheet(workbook: XLSX.WorkBook, sheetName: string): string[] {
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) {
      console.error(`Sheet ${sheetName} not found!`);
      return [];
    }
    const data: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const fullNames: string[] = [];
    const fullNameIndex = data[0].indexOf('FullName');

    for (let i = 1; i < data.length; i++) {
      if (data[i][fullNameIndex]) {
        fullNames.push(data[i][fullNameIndex]);
      }
    }
    return fullNames;
  }

  splitIntoTeams(players: string[], teamSize: number): string[][] {
    const teams: string[][] = [];
    for (let i = 0; i < players.length; i += teamSize) {
      teams.push(players.slice(i, i + teamSize));
    }
    return teams;
  }

  exportPdf(): void {
    const container = document.querySelector('.outputsection') as HTMLElement | null;
    if (!container) {
      console.error('No output section to export!');
      alert('No output section to export!');
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
      const pdf = new jsPDF('portrait', 'px', [1600, 2200]); // Set layout size to match desktop
  
      const imgWidth = 1536;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      let currentHeight = 0;
      pdf.addImage(imgData, 'PNG', 0, -currentHeight, imgWidth, imgHeight);
      // Handle multi-page export
      // while (currentHeight < imgHeight) {
      //   pdf.addImage(imgData, 'PNG', 0, -currentHeight, imgWidth, imgHeight); // Add image section to PDF
      //   if (currentHeight + 864 < imgHeight) pdf.addPage(); // Add new page if needed
      //   currentHeight += 864;
      // }
  
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

// generateSheetData(teams: string[][], teamNames: string[]): any[][] {
//   const sheetData: any[][] = [];
//   teams.forEach((team, index) => {
//     const teamName = teamNames[index] || `Team-${index + 1}`;
//     sheetData.push([teamName]); // Add team name as the first row
//     team.forEach((player) => sheetData.push([player])); // Add players as subsequent rows
//     sheetData.push([]); // Add an empty row to separate teams
//   });
//   return sheetData;
// }


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




