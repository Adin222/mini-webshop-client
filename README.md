# How to run app

To successfully run your app locally, you have to clone this repo and run `npm install`. After that, create a `.env` file with the following variables:

```env
VITE_API_BASE_URL= # your backend localhost URL (e.g., http://localhost:5000) 
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_MEASUREMENT_ID=


If you plan to use Firebase, you will have to get your Google credentials in the Google Console: https://console.firebase.google.com/

You can log in to the app normally.
To create an admin user via the API, send a POST request to: https://mini-webshop-server.onrender.com/api/create/admin
with the JSON body containing:
{
  "username": "your_username",
  "email": "your_email",
  "password": "your_password"
}
Note: It is recommended to use the default admin account for testing order confirmation emails, as it is the only guaranteed way those emails will work.

This system has admin and guest users, every registered user is considered an admin.

My client URL can be found here: https://vocal-blini-e77de3.netlify.app/  
My API URL can be found here: https://mini-webshop-server.onrender.com
