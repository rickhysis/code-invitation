import React from 'react';
import { View, NotFoundBoundary, useLoadingRoute } from 'react-navi';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Header, MobileMenu, ContainerMenu} from './layout/header'
import './App.css';


function App({ classes }) {
  let loadingRoute = useLoadingRoute()

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <ContainerMenu />
      <MobileMenu />
      <main>
        <NotFoundBoundary render={renderNotFound}>
          <div
            // Only add the `active` class to this element while the
            // next page is loading, triggering a CSS animation to
            // show or hide the loading bar.
            className={`
              App-loading-indicator
              ${loadingRoute ? 'active' : ''}
            `}
          />
            <View />
        </NotFoundBoundary>
      </main>
    </React.Fragment>
  );
}

// Note that create-react-navi-app will always show an error screen when this
// is called. This is because the underlying react-scripts package show
// the error screen when a NotFoundError is thrown, even though it's caught
// by <NotFoundBoundary>. To see the error rendered by this function,
// you'll just need to close the error overlay with the "x" at the top right.
function renderNotFound() {
  return (
    <div className='App-error'>
      <h1>404 - Not Found</h1>
    </div>
  )
} 

export default App