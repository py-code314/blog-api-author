import App from '../App'
// import HomePageLayout from '../components/layouts/homepage/HomePageLayout'
import SignUp from '../pages/sign-up/SignUp'

/* Array of routes */
const routes = [
  {
    path: '/',
    element: <App />,
    
  },
  {
    path: '/sign-up',
    element: <SignUp />,
    
  },
]

export default routes
