export type NasaMediaCollectionType = {
  href: string;
  items: SearchTermType[];
  meta_data: any;
  version: string;
};

export type SearchTermType = {
  href: string;
  data: SearchTermDataType[];
  links: SearchTermLinksType[];
};

export type SearchTermDataType = {
  center: string;
  title: string;
  keywords: string[];
  nasa_id: string;
  date_created: string;
  media_type: string;
  description: string;
};

export type SearchTermLinksType = {
  href: string;
  rel: string;
  render?: string;
};

export type MediaAssetType = {
  version: string;
  href: string;
  items: {
    href: string;
  }[];
};
