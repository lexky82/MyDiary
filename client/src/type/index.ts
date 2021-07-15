export type diaryType = {
  _id: string;
  writer: string;
  title: string;
  emotion: string;
  weather: string;
  contents: string;
  createdAt: string;
  updatedAt: string;
  location: { lat: number; lng: number };
  image : Array<string>;
};

export type imageType = {
  lastModified: number;
  lastModifiedDate: moment.Moment;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};
