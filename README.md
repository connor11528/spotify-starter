Spotify starter
=====


* angular-spotify: https://github.com/eddiemoore/angular-spotify

* spotify-web-api-node: https://github.com/thelinmichael/spotify-web-api-node

#### Todo

* load upcoming shows
* follow/unfollow in mongo

#### Getting started
```
$ git clone <this_repo>
$ npm install
$ nodemon server 
```

### Deployment

```sh
heroku create <app_name>
heroku config:set NODE_ENV=production
heroku addons:create mongolab:sandbox 
heroku config | grep MONGOLAB_URI
git push heroku master
heroku ps:scale web=1
```

