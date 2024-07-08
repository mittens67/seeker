import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <div className="flex flex-col py-20 text-center space-y-6 justify-center items-center">
          <p className="text-2xl font-semibold">Whoops! We can't seem to find this page</p>
          <Link to={'/'} className='hover:text-blue-400'>Return to Search Page</Link>
        </div>
      );
}

export default Page404