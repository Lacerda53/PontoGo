import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from '~/pages/Main';

const Routes = createAppContainer(createStackNavigator({ Main }));

export default Routes;
