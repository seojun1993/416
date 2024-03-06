export interface Student {
  id: string;
  name: string;
  "416_id": number;
  memory_id: number;
  class_name: string;
  guestbook_url: string;
  mgmt_id: number;
  collection_url: string;
  title_keyword: string;
  keywords: Keyword[];
  birthday: string;
  is_lunar_birth: boolean;
  class: number;
  images: Image[];
  caricature: string;
  class_number_name: string;
  voicekey: string;
}

export interface Keyword {
  id: string;
  keywordName: string;
}

export interface Image {
  id: string;
  url: string;
  order: number;
}
