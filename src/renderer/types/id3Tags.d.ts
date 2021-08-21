type Id3Tags = {
  artist?: string;
  title?: string;
  album?: string;
  genre?: string;
  year?: string;
  trackNumber?: string;
  [key: string]: unknown;
};

export default Id3Tags;
