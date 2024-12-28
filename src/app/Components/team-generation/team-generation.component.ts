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

  MensTeamNames: string[] = ['Captian America', 'Iron Man', 'The Hulk', 'Spider Man', 'Batman', 'Thor', 'Loki', 'Black Panther'];
  // WomensTeamNames: string[] = ['Wonder Woman', 'Harmanpreet', 'Mithali Raj'];
  BoysTeamNames: string[] = ['Doremon', 'Shinchan', 'Tom & Jerry', 'Oggy', 'Ninja Hatori', 'SpongeBob SquarePants', 'Pokemon', 'Motu Patlu'];
  GirlsTeamNames: string[] = ['Cinderella', 'Snow White', 'Tom & Jerry', 'Moana','Minnie Mouse'];

  teamMenSize: number = 7;
  // teamWomenSize: number = 7;
  teamBoysSize: number = 7;
  teamGirlsSize: number = 7;

  generatedMenTeams: string[][] = [];
  // generatedWomenTeams: string[][] = [];
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
      // this.generateTeams(); // Generate teams after the workbook is loaded
    };

    reader.readAsBinaryString(file);
  }

  shuffleArray(arr: string[]): void {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap the elements
    }
  }

  generateTeams(): void {
    if (!this.workbook) {
      console.error('No workbook loaded!');
      return;
    }

    const menPlayers = this.extractNamesFromSheet(this.workbook, 'MEN');
    // const womenPlayers = this.extractNamesFromSheet(this.workbook, 'WOMEN');
    const boysPlayers = this.extractNamesFromSheet(this.workbook, 'Boys');
    const girlsPlayers = this.extractNamesFromSheet(this.workbook, 'Girls');

    this.shuffleArray(menPlayers);
    // this.shuffleArray(womenPlayers);
    this.shuffleArray(boysPlayers);
    this.shuffleArray(girlsPlayers);

    this.generatedMenTeams = this.splitIntoTeams(menPlayers, this.teamMenSize);
    // this.generatedWomenTeams = this.splitIntoTeams(womenPlayers, this.teamWomenSize);
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
    const fullNameIndex = data[0].indexOf('FullName'); // Find the 'FullName' column index

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
    const container = document.querySelector('.outputsection') as HTMLElement | null; // Explicitly cast as HTMLElement or null
    if (!container) {
      console.error('No output section to export!');
      return;
    }
  
    // Use html2canvas to render the container into an image
    html2canvas(container, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png'); // Convert canvas to an image
      const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new jsPDF instance
  
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
  
      // Calculate dimensions to fit content in the PDF page
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight); // Add image to PDF
      pdf.save('Generated_Teams.pdf'); // Save the PDF
    });
  }
}
