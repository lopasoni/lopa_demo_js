import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
const PageNotFound = Loadable(lazy(() => import('../custom-component/PageNotFound')));

const pageNotFoundPage = {
  path: '*',
  element: <PageNotFound />
};

export default pageNotFoundPage;
