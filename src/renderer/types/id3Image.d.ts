type Id3Image =
  | {
      mime?: string;

      type?: {
        id?: number;
        name?: string;
      };
      description?: string;
      imageBuffer?: Buffer;
      onlineSrc?: string;
    }
  | string;

export default Id3Image;
