import { NftMetadata, attribute } from './nftMetadata';

export class NftToken {
  name: string;
  description: string;
  image: string;
  external_link: string;
  attributes: attribute[];
  owner: string;
  issuer: string;

  constructor(metadata: NftMetadata, owner: string, issuer: string) {
    this.name = metadata.name;
    this.description = metadata.description;
    this.image = metadata.image;
    this.external_link = metadata.external_link;
    this.attributes = metadata.attributes;
    this.owner = owner;
    this.issuer = issuer;
  }
}
