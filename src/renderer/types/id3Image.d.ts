type Id3Image = {
  mime: string;

  type: {
    id: number;
    name: string;
  };
  description: string;
  imageBuffer: Buffer;
};

export default Id3Image;
