import Id3Image from './id3Image';

type Id3Tags = {
  artist?: string;
  title?: string;
  album?: string;
  genre?: string;
  year?: string;
  trackNumber?: string;
  image?: Id3Image;
  [key: string]: unknown;
};

export default Id3Tags;
