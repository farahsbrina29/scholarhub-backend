import { PartialType } from '@nestjs/mapped-types';
import { CreateScholarRegistDto } from './create-scholar-regist.dto';

export class UpdateScholarRegistDto extends PartialType(CreateScholarRegistDto) {}
