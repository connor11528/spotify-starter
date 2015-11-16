Spotify starter
=====
> Find concerts happening near you for artists you follow on Spotify

* angular-spotify: https://github.com/eddiemoore/angular-spotify

* songkick API: http://www.songkick.com/developer/upcoming-events-for-artist

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

