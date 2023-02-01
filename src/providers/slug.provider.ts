import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import * as shortid from 'shortid';

@Injectable()
export class SlugProvider {
  slugify(slug: string): string {
    return `${slugify(slug) + `-${shortid.generate()}`}`.toLowerCase();
  }
}