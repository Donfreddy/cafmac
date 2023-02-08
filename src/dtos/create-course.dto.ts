import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Maintenance', required: true })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'Cette formation vous donnera les compétences nécessaires pour entretenir et réparer efficacement les équipements et les machines. Vous apprendrez les concepts de base de la maintenance préventive et corrective, ainsi que les techniques de diagnostic et de résolution de problèmes.',
    required: true,
  })
  description: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    example: [
      'Avoir une connaissance de base des concepts de mécanique et d\'électricité',
      'Expérience de travail avec des équipements et des machines',
    ], required: false,
  })
  prerequisites: string[];

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    example: [
      'Comprendre les concepts de base de la maintenance préventive et corrective',
      'Apprendre à diagnostiquer et à résoudre les problèmes courants des équipements et des machines',
      'Être capable de planifier et de mettre en œuvre des programmes de maintenance efficaces',
    ], required: false,
  })
  objectives: string[];

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    example: [
      'Taux de réussite de 75% ou plus sur les examens finaux',
      '80% des étudiants seront en mesure de diagnostiquer et de résoudre les problèmes courants des équipements et des machines de manière indépendante',
    ], required: false,
  })
  kpi: string[];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: 'number', example: 8, required: true })
  duration: number;
}
