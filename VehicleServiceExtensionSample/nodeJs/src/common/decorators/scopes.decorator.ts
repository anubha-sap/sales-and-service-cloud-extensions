import { SetMetadata } from '@nestjs/common';
import { Scope } from '../../extension-modules/common/enums';

export const SCOPES_KEY = 'scopes';
export const Scopes = (...scopes: Scope[]) => SetMetadata(SCOPES_KEY, scopes);
