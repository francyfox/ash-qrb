import { useTranslate } from '@tolgee/react';
import Image from 'next/image';

interface QrbRoleChooseProps {
  role: string;
  changeRole: (role: string) => void;
}

export default function QrbRoleChoose({ role, changeRole }: QrbRoleChooseProps) {
  const { t: T } = useTranslate();

  const roles = [
    { key: 'client', title: T('role.client'), img: 'https://res.cloudinary.com/dr5gcup5n/image/upload/v1720438279/ash-qrb/dbjpt13yte6tmmey6dgh.svg' },
    { key: 'costumer', title: T('role.costumer'), img: 'https://res.cloudinary.com/dr5gcup5n/image/upload/v1720435161/ash-qrb/mxmv5fvnvkdw86x30dli.svg' },
    { key: 'manager', title: T('role.manager'), img: 'https://res.cloudinary.com/dr5gcup5n/image/upload/v1720435159/ash-qrb/oeuppw1rj3j11knvi6vl.svg' },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="text-4xl">
        {T('role.title')}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {roles.map((i, index) => (
          <a
            key={index}
            href="#"
            className="flex flex-col justify-between gap-3 p-5 dark:bg-gray-600 hover:bg-gray-800 transition-colors"
            /* eslint-disable-next-line @stylistic/max-statements-per-line */
            onClick={(e) => { e.preventDefault(); changeRole(i.key); }}
            data-role={i.key}
          >
            <Image
              src={i.img}
              alt={i.title}
              width={300}
              height={300}
              className="w-full h-[300px]"
            />
            <span className="text-4xl text-white">
              {i.title}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
