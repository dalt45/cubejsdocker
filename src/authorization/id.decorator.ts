import { SetMetadata } from '@nestjs/common';
import { Id } from "./id.enum";

export const ID_KEY = 'id';
export const IdMatch = (id: Id) => SetMetadata(ID_KEY, id);
