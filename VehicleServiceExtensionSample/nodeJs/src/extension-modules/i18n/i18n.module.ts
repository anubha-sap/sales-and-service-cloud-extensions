import { Module } from '@nestjs/common';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { FALLBACK_LANGUAGE } from '../../common/constants';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: FALLBACK_LANGUAGE,
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '../i18n/resources'),
        watch: true,
      },
    }),
  ],
})
export class I18nConfigModule {}
