// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const alltask = {
  id: 'All Task',
  title: 'All_Task',
  type: 'group',
  children: [
    {
      id: 'Take_Exam',
      title: 'Take_Exam',
      type: 'item',
      url: '/exam',
      icon: icons.Icon3dCubeSphereOff,
      breadcrumbs: false
    },
    {
      id: 'fetchdata',
      title: 'fetchdata',
      type: 'item',
      url: '/fetch',
      icon: icons.Icon3dCubeSphereOff,
      breadcrumbs: false
    },
    {
      id: 'Fierbase',
      title: 'Fierbase',
      type: 'item',
      url: '/fierbase/signup',
      icon: icons.Icon3dCubeSphereOff,
      breadcrumbs: false
    },
    {
      id: 'formdata',
      title: 'formdata',
      type: 'item',
      url: '/formdata',
      icon: icons.Icon3dCubeSphereOff,
      breadcrumbs: false
    },
    {
      id: 'Add_event_task',
      title: 'Add_event_task',
      type: 'item',
      url: '/event',
      icon: icons.Icon3dCubeSphereOff,
      breadcrumbs: false
    },
    {
      id: 'News_task',
      title: 'news',
      type: 'item',
      url: '/news',
      icon: icons.Icon3dCubeSphereOff,
      breadcrumbs: false
    },
    {
      id: 'Update_profile',
      title: 'Update_profile',
      type: 'item',
      url: '/upadate',
      icon: icons.Icon3dCubeSphereOff,
      breadcrumbs: false
    },
    {
      id: 'Update_password',
      title: 'Update_password',
      type: 'item',
      url: '/changepassword',
      icon: icons.Icon3dCubeSphereOff,
      breadcrumbs: false
    },
    {
      id: 'List_user',
      title: 'User_Listing',
      type: 'item',
      url: '/userlist',
      icon: icons.Icon3dCubeSphereOff,
      breadcrumbs: false
    }
  ]
};

export default alltask;
