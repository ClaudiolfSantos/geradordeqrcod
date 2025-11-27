export interface LinkAnalysis {
  summary: string;
  safety: string;
  category: string;
  title: string;
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface HistoryItem {
  id: string;
  url: string;
  timestamp: number;
}