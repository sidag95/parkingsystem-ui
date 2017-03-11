import React from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import ParkingList from './containers/parking-list'
import UserLogin from './containers/user/user-login'
import UserDetails from './containers/user/user-details'
import AppContainer from './app'

export const history = hashHistory

export default function root() {
    return (
        <Router history={hashHistory}>
            <Route path='/' component={AppContainer}>
                <Route name='parking' path='parking' component={ParkingList} />
                <Route name='user' path='user' >
                    <IndexRoute component={UserLogin} />
                    <Route path=':id' component={UserDetails} />
                </Route>
            </Route>
        </Router>
    )
}
