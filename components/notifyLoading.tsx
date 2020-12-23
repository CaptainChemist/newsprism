import { WaitingClock } from './svg';

export const NotifyLoading = () => (
  <div className="h-screen flex">
    <WaitingClock className="h-10 w-10 text-gray-500 m-auto" />
  </div>
);
