import { SetMetadata } from '@nestjs/common';

export const ID_KEY = 'id';
export const IdMatch = (id: boolean) => SetMetadata(ID_KEY, id);
