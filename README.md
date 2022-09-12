# Jammming

[Jammming](https://www.lucasoconnell.net/jammming) is a single page React app that interacts with the Spotify API to search for tracks and perform CRUD operations on playlists. It was initially developed as part of the Web Development career path at Codecademy. However, it was greatly expanded since that and now has considerably greater functionality.


## Technologies

The app boilerplate was created via the Node.js [`create-react-app`](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) command which abstracts away preprocessing (via Babel) and bundling (via Webpack) automatically. This is in contrast to the way my [personal website](https://www.lucasoconnell.net/) was developed. Originally made with the old class-based syntax, it was refactored to take advantage of React hooks.


## Functions

After the page has rendered and the user tries to do anything, they will be redirected to the Spotify login page. Once they enter correct login details, they will return back to the original page. If a temporary user does not have a Spotify account and does not want to create one, they can use the login details provided at the bottom of the page in order to test out this app.

There is a searchbar at the top of the page that the user can type a song, artist or album name into. New user input automatically queries the Spotify API and results are displayed below to the left. To the right of the **Results** section is the **Playlist** section. Tracks from **Results** can be added to the **Playlist** section.

Tracks added to the **Playlist** section can also be removed. The playlist name can also be changed. When done, the user can click the 'save to Spotify' button to send a POST request to the Spotify API.

Clicking on the 'get playlists' button will render a list of all the playlists stored on the users Spotify account. They can then delete any playlist by pressing the 'X' beside the name. The playlist name and tracks can be edited by clicking on the name here too. The 'get playlists' button will have changed to 'hide playlists' after clicking, allowing the user to toggle the display.

Finally, there is a messaging system that temporarily displays the current status such as creating / editing / deleting a playlist, in addition to error messages if the user tries to perform an illegal operation (such as saving a playlist without tracks or without a name).


## Local Setup

The project can be cloned and set up locally by the following CLI commands from the **jammming directory**.

### `npm install`

Install all of the Node dependencies for React and other third party packages used in this project.

### `npm start`

Runs the app in development mode via `node server.js`. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits to the source code. You will also see any linting errors in the console.

### `npm serve`

Builds the app via `npm run build` and then opens a Firebase hosting instance via `firebase emulators:start`. This is similar to `npm start`, except for a production build rather than development. Unlike the `start` command, any changes made after running `serve` will not be incorporated. The emulator will have to be terminated and restarted to see changes. Used to test that everything is working as expected prior to deployment.


## Remote Hosting

This section describes how to host the project with Firebase.

1. Fork this repository.
2. Create a new [Firebase](https://firebase.google.com/) account if you don't already have one.
3. Install the Firebase CLI by running `npm install -g firebase-tools`.
4. Log into Firebase using your Google account credentials with `firebase login` in the terminal.
5. From the Firebase console in your browser, create a new project. Give it a name and `project-id`.
6. Replace the value of the `default` field in [`.firebaserc`](https://github.com/Isoaxe/jammming/blob/master/.firebaserc#L3) with your `project-id`.
7. Execute the shell command `npm run deploy` to make a production build of the project and deploy to Firebase.


## Spotify Setup

In order to use the Spotify API with a remote-hosted site, a few things listed below need to be completed. If just testing locally, then these do not need to be done and the existing values within this project can be used. Both `localhost:3000` and `localhost:5000` have been whitelisted.

1. Create a [Spotify developer](https://developer.spotify.com/) account.
2. From the top menu, select Dashboard -> Log In.
3. Select 'Create an App' from the menu.
4. Replace the [`clientId`](https://github.com/Isoaxe/jammming/blob/master/src/util/Spotify.js#L2) with the one generated from your new app in step 3.
5. Click on the app, then on 'Edit Settings', then add the Firebase and `localhost` URLs to the 'Redirect URIs' section. The URLs listed here will be whitelisted and able to make requests to the Spotify API without being blocked.

![Jammming Screenshot](./Jammming%20Screenshot.png?raw=true)
