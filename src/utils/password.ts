import * as bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const isMatchPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};

export { hashPassword, isMatchPassword };
