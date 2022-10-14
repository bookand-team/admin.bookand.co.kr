import { useRouter } from 'next/router';
import { useCallback } from 'react';

const Home = () => {
  const router = useRouter();

  const moveDashboard = useCallback(() => {
    router.push('/dashboard');
  });

  return (
    <div>
      <button onClick={moveDashboard}>dashboard로</button>
    </div>
  );
};

export default Home;