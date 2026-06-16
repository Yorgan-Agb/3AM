export interface MusicApi {
  name: string;
  url_resolved: string;
}

export interface Station {
  name: string;
  url_resolved: string;
  lastcheckok: 0 | 1;
}
