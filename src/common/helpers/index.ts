import * as bcrypt from 'bcrypt';
import { configService } from '../../config/config.service';


export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (userPassword: string, currentPassword: string): Promise<boolean> => {
  return bcrypt.compare(userPassword, currentPassword);
};

export const slugOrIdWhereCondition = (slug: string): { [key: string]: string | number } => {
  const id = parseInt(slug);
  if (isNaN(id)) return { slug };
  return { id };
};

export const getFileExtension = (fileName: string): string => {
  return fileName.split('.')[fileName.split('.').length - 1];
};

export const generateUniqueKey = (): string => {
  const currentTime = new Date().getTime().toString();
  const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return `${randomString}_${currentTime}`;
};

export const getImageUrl = (fileName: string): string => {
  return `${configService.getAPiUrl()}/images/${fileName}`;
};
