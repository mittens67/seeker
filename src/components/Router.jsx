import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import Results from './Results';
import Pagination from './Pagination';
import Page404 from './Page404';

const Router = () => {
  return (
    <div className='p-4'>
      <Routes>
        <Route exact path='/' element={<Navigate to='/search'/>}/> {/*Our app has no / only /search */}
        {['/search', '/images'].map((path) => (
          <Route key='results' exact path={path} element={<Results />} />
        )) /*All these routes will render Results */}
        <Route path='/*' element={<Page404 />} />
      </Routes>
      <Pagination />
    </div>
  );
}

export default Router;