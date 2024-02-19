import { createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';
import { PSW_KEY } from '@/common/constants/password.constants';

/**
 * 密码解密
 * @param salt 密码盐
 * @param iv 初始向量
 * @param encryptedPassword 加密后的密码
 * @returns 解密后的密码
 */
export default async function decrypt(
  salt: string,
  iv: string,
  encryptedPassword: string,
): Promise<string> {
  const key = (await promisify(scrypt)(
    PSW_KEY,
    Buffer.from(salt, 'hex'),
    32,
  )) as Buffer;
  const decipher = createDecipheriv('aes-256-ctr', key, Buffer.from(iv, 'hex'));
  const decryptedPassword = Buffer.concat([
    decipher.update(encryptedPassword, 'hex'),
    decipher.final(),
  ]);
  return decryptedPassword.toString();
}
