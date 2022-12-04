import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Store } from './store/Store';
import './index.css';
// Components
import DefaultUserPage from './pages/DefaultUserPage/DefaultUserPage';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import ForgetUserName from './pages/ForgetUserName/ForgetUserName';
import ForgetUserPassword from './pages/ForgetUserPassword/ForgetUserPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ChooseUserName from './pages/ChooseUserName/ChooseUserName';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Subreddit from './pages/Subreddit/Subreddit';
import AccountSettings from './components/AccountSettings/AccountSettings';
import UserSettings from './pages/UserSettings/UserSettings';
import ProfileSettings from './components/ProfileSettings/ProfileSettings';
import SafetyPrivacySettings from './components/SafetyPrivacySettings/SafetyPrivacySettings';
import FeedSettings from './components/FeedSettings/FeedSettings';
import Notifications from './components/Notifications/Notifications';
import Emails from './components/Emails/Emails';
import Subscriptions from './components/Subscriptions/Subscriptions';
import ChatMessaging from './components/ChatMessaging/ChatMessaging';
import CommunitiesResults from './components/SearchCards/CommunitiesResults/CommunitiesResults';
import SearchResults from './pages/SearchResults/SearchResults';
import PeopleResults from './components/SearchCards/PeopleResults/PeopleResults';
import CommentsResults from './components/SearchCards/CommentsResults/CommentsResults';
import PostsResults from './components/SearchCards/PostsResults/PostsResults';
import ModToolsPage from './pages/ModToolsPage/ModToolsPage';

// Routes
const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/auth',
    element: <DefaultUserPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'forgetuname',
        element: <ForgetUserName />
      },
      {
        path: 'forgetupassword',
        element: <ForgetUserPassword />
      },
      {
        path: 'resetupassword',
        element: <ResetPassword />
      }
    ]
  },
  {
    path: '/new/chooseuname',
    element: <ChooseUserName />
  },
  {
    path: '/home',
    element: <HomePage />
  },
  {
    path: '/subreddit',
    element: <Subreddit />
  },
  {
    path: '/settings',
    element: <UserSettings />,
    children: [
      {
        path: 'account',
        element: <AccountSettings />
      },
      {
        path: 'profile',
        element: <ProfileSettings />
      },
      {
        path: 'privacy',
        element: <SafetyPrivacySettings />
      },
      {
        path: 'feed',
        element: <FeedSettings />
      },
      {
        path: 'notifications',
        element: <Notifications />
      },
      {
        path: 'emails',
        element: <Emails />
      },
      {
        path: 'premium',
        element: <Subscriptions />
      },
      {
        path: 'messaging',
        element: <ChatMessaging />
      }
    ]
  },
  {
    path: '/search',
    element: <SearchResults />,
    children: [
      {
        path: 'posts',
        element: <PostsResults />
      },
      {
        path: 'comments',
        element: <CommentsResults />
      },
      {
        path: 'communities',
        element: <CommunitiesResults />
      },
      {
        path: 'people',
        element: <PeopleResults />
      }
    ]
  },
  {
    path: '/subreddit/about/:item',
    element: <ModToolsPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <RouterProvider router={routes} />
  </Provider>
);
