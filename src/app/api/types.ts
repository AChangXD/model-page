export type ModelData = {
  name: string;
  category: string;
  description: string;
  version: string;
  uploadDate: Date | string;
  downloads: number;
  likes: number;
  files?: ModelFile[];
};

export type ModelFile = {
  name: string;
  file: File;
  uploadDate: Date | string;
  version: string;
};
