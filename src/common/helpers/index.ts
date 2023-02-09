import * as bcrypt from 'bcrypt';


export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (userPassword: string, currentPassword: string): Promise<boolean> => {
  return bcrypt.compare(userPassword, currentPassword);
};

export const slugOrIdWhereCondition = (slug: string): {[key: string]: string | number} => {
  const id = parseInt(slug);
  if (isNaN(id)) return {slug}
  return {id};
};
