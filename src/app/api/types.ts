export type ModelData = {
  name: string;
  category: string;
  description: string;
  version: string;
  uploadDate: Date | string;
  downloads: number;
  likes: number;
  file?: File;
};
