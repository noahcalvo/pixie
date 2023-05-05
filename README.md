# Pixie

<img src="https://static.wikia.nocookie.net/zelda/images/f/f3/Ciela_Artwork.png/" alt="Toonlink blue pixie companion" width="251" height="266" style="margin:20px">
<br/>
<a href="https://piixie.web.app/">piixie.web.app</a>
<br/>
Hello and welcome to the Pixie project. <br/>
The vision is to create a verbose skeleton project that can be used to jumpstart app ideas. <br/>
This will save time that would usually be spent initializing React, Express, nodeJS and Mongo, as well as setting up a test suite.<br/>
As the project continues to grow, I hope to add more features such as:

- an authentication suite
- a deployment pipeline
- hosting instructions
- a sample README. Bon voyage!
- GPT PR review bot integration

## Running Locally

The package.json's are set up to run locally.

1. In the `frontend` directory, run `npm run dev`. This will start the frontend up, using the .env.development variables. It will try to connect to the backend on localhost:4000. To get the backend working...
2. `cd` to the `backend` directory, and run `npm run dev`. This will auto refresh if you make changes to the backend code.
3. Admire the local build! All endpoints should be working!

## Hosting Instructions

1. Go to https://console.firebase.google.com/ and create a Firebase project
2. In the Firebase console, click to set up a web app (towards the bottom of the screen). It will walk you through installing Firebase in your project, and configuring it in your `index.js`. Replace the existing logic with your own configuration values.
3. Enabling Google Auth - navigate here: https://console.firebase.google.com/project/piixie/authentication/providers and under "sign-in method" enable Google.
4. Make sure you have firebase cli installed (`npm install -g firebase-tools`) and then login from your command line with `firebase login`
5. In the apps root directory, run `firebase init`
6. Select hosting options. For a MERN stack app with authentication, you'll likely only need Firebase Hosting. I also set up Github actions for deployments.
7. Run `npm run build` and then `firebase deploy`. Now you should see the app at the domain provided by Firebase!!
8. See #Enabling SSR to learn how to serverside render the frontend. This is disabled by default because runnning a node.js server on google firebase costs extra :< <br/>

## Getting preview deployments working on PR

1. This is something you may have already started setting up during Hosting Instructions
2. There is an additional step to take. In Github, go to your repo's settings>actions>General>workflow permissions and choose the first option 'Read and write permission' and then the checkbox 'Allow GitHub Actions to create and approve pull requests'.<br/>
   You will now get a comment on every PR to main, providing a link to a preview ephemeral to test the new code. Based.

<br/>

## Setting up your mongo database

1. Sign in/sign up for a mongodb Atlas account https://www.mongodb.com/cloud/atlas
2. Create a project, then create a database (I use the free tier)
3. Set up a user, within database access that has the correct privledges (read/write, or Admin). Save the password to this user somewhere.
4. Whitelist the IP you will be connecting from. With the free tier of Firebase hosting, the IP can change dynamically from different CDNs, so I chose to allow connections from anywhere.
5. Setting up encryption with Google Cloud KMS costs money, so I skip the encryption step.
6. For whitelisting IPs, I've chosen to allow all IPs access. This is an option in the project settings, not cluster.
7. Go to Deployment>Database>Connect, select connect my app, and copy the connection string.
8. In backend/.env, add `DATABASE_STRING = "your db string"`
9. If you want to add a dev database as well, to play with data without affecting prod, repeat steps 2-6 and create a backend/.env.development with the DATABASE_STRING value. You will need to create a new project if you want to create another free m0 cluster, because mongo only allows 1 m0 cluster per project. If you'd like to add this stage databse to your pipeline, create the github actions secret, `DATABASE_STRING_DEV = your-dev-db-string`. If you want to use the prod databse in your PR ephemerals, change the `firebase-hosting-pull-request.yaml file to use `DATABASE_STRING`instead of`DATABASE_STRING_DEV`
10. Add the (prod) database string in your repo settings, Secrets>Actions, and title it DATABASE_STRING. This way it will be added as env during automated deployments. If you're curious how this works, check out the firebase scripts in .github/workflows/

## Connecting your backend in the cloud

1. You've got to host the backend seperately, because firebase is for hosting static web pages. For this, navigate to cloud.google.com (google cloud providers). Unfortunately, I had to add a billing account. I plan to stay under free usage tier, but they require billing info for the access we require on GCP. For tips on staying in the free tier, see GCP configuration tips
2. Click on your project (mine is "pixie"). Navigate to APIs and Services dashboard and enable Cloud Build API and Cloud Run API
3. Install the Google Cloud CLI, simply explained here https://cloud.google.com/sdk/docs/install. Note that once you install and expand the download, you must add it to PATH, in your shell profile file (e.g., ~/.bashrc, ~/.bash_profile, ~/.zshrc, etc.):
   `export PATH="/path/to/google-cloud-sdk/bin:$PATH"` - replacing /path/to/google-cloud-sdk with the location you exanded it to. Now `gcloud` in the shell should work.
4. Navigate to the `backend` folder, and run

```
gcloud builds submit --tag gcr.io/<PROJECT_ID>/my-backend
gcloud run deploy my-backend --image gcr.io/<PROJECT_ID>/my-backend --platform managed --allow-unauthenticated
```

If you're running into errors here, it can be good to try running it locally before sending it to GCP. For that you need Docker installed and running, and then run the command `gcloud beta code dev`

If you are on a work computer without vanilla Docker (like me), update the backend/cloudbuild.yaml file and run
`gcloud builds submit --config cloudbuild.yaml .`
cloudbuild is a good idea in general cause it provides a consistent build environment and allows for automation pipelines. This is all set up in the backend/package.json. You will need to update the project-ID to yours.

## GCP configuration tips

1. If you are like me and afraid of $100+ monthly bills from google, and the slightest excess usage past the free tier fires anxiety into you, Lifecycle management is your friend. The images that are uploaded during cloud build and deploy are put in the `artifacts.[google app id].appspot.com`, i.e. `artifacts.piixie.appspot.com` bucket. To add rules about deleting data from this bucket when it is no longer used, go to https://console.cloud.google.com/storage/lifecycle. Add a rule > delete object > number of newer versions > 1 (or whatever you like, to balance stability with cost).

## Enabling SSR

Enabling server-side rendering on your app is easy, but hosting it costs money, or further research I'm unwilling to do at the time. The changes lay primarily in the pages/ folder, where you will need to switch from using `next/dynamic` to import the components to simply importing them with normal js module import statements. For example, index.js would look like

```
import About from "./about";

const HomePage = () => {
  return <About />;
};

export default HomePage;
```

## Automating Deployment

To automate the deployment of backend ephemerals, so that the app works when smoke testing a PR, you must tinker with the Service Account set up on GCP. You should have a Service Account under the IAM page with the Principle(email) `github-action-...`. Edit this Account and add `Cloud Build Editor`, `Storage Admin`, and `Service Usage Consumer` roles.
