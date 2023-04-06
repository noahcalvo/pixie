# Pixie

<img src="https://static.wikia.nocookie.net/zelda/images/f/f3/Ciela_Artwork.png/" alt="Toonlink blue pixie companion" width="251" height="266">
<br/>
https://piixie.web.app/ <br/>
Hello and welcome to the Pixie project. <br/>
The vision is to create a verbose skeleton project that can be used to jumpstart app ideas. <br/>
This will save time that would usually be spent initializing React, Express, nodeJS and Mongo, as well as setting up a test suite.<br/>
As the project continues to grow, I hope to add more features such as:

- an authentication suite
- a deployment pipeline
- hosting instructions
- a sample README. Bon voyage!

## Hosting Instructions

1. Go to https://console.firebase.google.com/ and create a Firebase project
2. In the Firebase console, click to set up a web app (towards the bottom of the screen). It will walk you through installing Firebase in your project, and configuring it in your `index.js`. Replace the existing logic with your own configuration values.
3. Enabling Google Auth - navigate here: https://console.firebase.google.com/project/piixie/authentication/providers and under "sign-in method" enable Google.
4. Make sure you have firebase cli installed (`npm install -g firebase-tools`) and then login from your command line with `firebase login`
5. In the apps root directory, run `firebase init`
6. Select hosting options. For a MERN stack app with authentication, you'll likely only need Firebase Hosting. I also set up Github actions for deployments.
7. Run `npm run build` and then `firebase deploy`. Now you should see the app at the domain provided by Firebase!!
   <br/>
   <br/>

## Getting preview deployments working on PR

1. This is something you may have already started setting up during Hosting Instructions
2. There was an additional step to take. In Github, go to your repo's settings>actions>General>workflow permissions and choose the first option 'Read and write permission' and then the checkbox 'Allow GitHub Actions to create and approve pull requests'.<br/>
   You will now get a comment on every PR to main, providing a link to a preview ephemeral to test the new code. Based.

<br/>
<br/>
