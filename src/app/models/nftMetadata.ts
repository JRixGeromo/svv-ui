export interface NftMetadata extends Array<{}> {
  name: string;
  description: string;
  image: string;
  external_link: string;
  attributes: attribute[];
}

export interface attribute {
  trait_type: string;
  value: string;
}
