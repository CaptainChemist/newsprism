import Link from 'next/link';
import { useFetchUser } from '../utils/user';

export const Nav = () => {
  const { user, loading } = useFetchUser();

  return (
    <ul className="flex grid grid-cols-4">
      <div className="col-span-1 flex justify-start">
        <li className="mr-6">
          <Link href="/">
            <div className="inline-flex cursor-pointer">
              <img className="sm:h-10 h-8 pr-1" src="/logo.png" />
              <a className="p-2 text-center block hover:blue-700 sm:visible invisible">
                Newsprism
              </a>
            </div>
          </Link>
        </li>
      </div>

      <div className="col-span-3 flex justify-end">
        {user ? (
          <li className="sm:mr-6">
            <Link href="/saved-articles">
              <a className="p-2 text-center block hover:blue-700 text-blue-500">
                Saved Articles
              </a>
            </Link>
          </li>
        ) : null}

        <li className="sm:mr-6">
          <Link href="/bundles">
            <a className="p-2 text-center block hover:blue-700 text-blue-500">
              Bundles
            </a>
          </Link>
        </li>
        <li className="sm:mr-6">
          <Link href="/feeds">
            <a className="p-2 text-center block hover:blue-700 text-blue-500">
              Feeds
            </a>
          </Link>
        </li>
        {user && !loading ? (
          <li className="sm:mr-6">
            <Link href="/api/logout">
              <a className="p-2 text-center block hover:blue-700 text-blue-500">
                Logout
              </a>
            </Link>
          </li>
        ) : (
          <li className="sm:mr-6">
            <Link href="/api/login">
              <a className="p-2 text-center block hover:blue-700 text-blue-500">
                Login
              </a>
            </Link>
          </li>
        )}
      </div>
    </ul>
  );
};
