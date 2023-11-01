import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

//My pages
//Examtask
const ExamHome = Loadable(lazy(() => import('views/myTask/examination_system/examhome/ExamHome')));
const TakeExam = Loadable(lazy(() => import('views/myTask/examination_system/takeeaxamination/TakeExam')));
const TakeCatagory = Loadable(lazy(() => import('views/myTask/examination_system/takecatagory/TakeCatagory')));
const Takequtions = Loadable(lazy(() => import('views/myTask/examination_system/takequtions/Takequtions')));
const Signup = Loadable(lazy(() => import('views/myTask/fierbase/signup/Signup')));
const HomePage = Loadable(lazy(() => import('views/myTask/fierbase/homepage/HomePage')));
const FetchData = Loadable(lazy(() => import('views/myTask/FetchData/FechData')));
const Form = Loadable(lazy(() => import('views/myTask/Form/Form')));
const Home = Loadable(lazy(() => import('views/myTask/event/Home')));
const Eventcatagoy = Loadable(lazy(() => import('views/myTask/event/Eventcatagoy')));
const Eventelist = Loadable(lazy(() => import('views/myTask/event/Eventelist')));
const News = Loadable(lazy(() => import('views/myTask/newsapp/News')));
const Moredata = Loadable(lazy(() => import('views/myTask/newsapp/MoreDataOfNews/Moredata')));
const IsSingUp = Loadable(lazy(() => import('views/myTask/fierbase/IsSingUp')));
const EditeProfile = Loadable(lazy(() => import('views/myTask/editeprofile/EditeProfile')));
const ChangePasswordPage = Loadable(lazy(() => import('views/myTask/changepassword/ChangePasswordPage')));
const UserListing = Loadable(lazy(() => import('views/myTask/userfunctionallity/UserListing')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,

  children: [
    {
      path: '',
      children: [
        {
          path: '',
          element: <DashboardDefault />
        }
      ]
    },
    //Exam task
    {
      path: 'exam',
      children: [
        {
          path: '',
          element: <ExamHome />,

          children: [
            {
              path: '',
              element: <TakeCatagory />
            },

            {
              path: 'takeqution',
              element: <Takequtions />
            },

            {
              path: 'takeexam',
              element: <TakeExam />
            }
          ]
        }
      ]
    },

    //fierbase
    {
      path: 'fierbase',
      children: [
        {
          path: 'signup',
          element: <Signup />
        },
        {
          path: '',
          element: <IsSingUp />,
          children: [
            {
              path: 'home',
              element: <HomePage />
            }
          ]
        }
      ]
    },

    //fetchuser
    {
      path: 'fetch',
      children: [
        {
          path: '',
          element: <FetchData />
        }
      ]
    },

    //formdata
    {
      path: 'formdata',
      children: [
        {
          path: '',
          element: <Form />
        }
      ]
    },

    //eventtask
    {
      path: 'event',
      children: [
        {
          path: '',
          element: <Home />,

          children: [
            {
              path: '',
              element: <Eventcatagoy />
            },
            {
              path: 'eventlist',
              element: <Eventelist />
            }
          ]
        }
      ]
    },

    //news task
    {
      path: 'news',
      children: [
        {
          path: '',
          element: <News />
        },
        {
          path: ':id',
          element: <Moredata />
        }
      ]
    },

    //news task
    {
      path: 'upadate',
      children: [
        {
          path: '',
          element: <EditeProfile />
        }
      ]
    },
    // chage passswprd
    {
      path: 'changepassword',
      children: [
        {
          path: '',
          element: <ChangePasswordPage />
        }
      ]
    },

    // User Listin with api
    {
      path: 'userlist',
      children: [
        {
          path: '',
          element: <UserListing />
        }
      ]
    },

    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
