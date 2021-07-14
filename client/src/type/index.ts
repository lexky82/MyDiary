export type diaryType = {
  id: string;
  writer: string;
  title: string;
  emotion: string;
  weather: string;
  contents: string;
  createdAt: string;
  updatedAt: string;
  location: { lat: number; lng: number };
};

export type imageType = {
  lastModified: number;
  lastModifiedDate: moment.Moment;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};
