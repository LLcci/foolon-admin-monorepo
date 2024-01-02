import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

/**
 * 密码加密
 * @param password 密码
 * @returns iv-加密向量; salt-盐; encryptedPassword-加密后的密码
 */
export default async function encrypt(password: string) {
  const iv = randomBytes(16);
  const salt = randomBytes(16);
  const key = (await promisify(scrypt)(
    process.env.PSW_KEY,
    salt,
    32,
  )) as Buffer;
  const cipher = createCipheriv('aes-256-ctr', key, iv);
  const encryptedPassword = Buffer.concat([
    cipher.update(password),
    cipher.final(),
  ]);
  return {
    iv: iv.toString('hex'),
    salt: salt.toString('hex'),
    encryptedPassword: encryptedPassword.toString('hex'),
  };
}
