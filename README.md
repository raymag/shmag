# SHMAG

Link Shortener API build with Node and Typescript. The API is currently running on Heroku and it's database is hosted on mongodb atlas.

The repository for the frontend version of this application can be found in [raymag/shmag-front](https://github.com/raymag/shmag-front).

**Also, here's the link for the running [website](https://shmag.netlify.app/). Feel free to shorten as many links you want to :)**

<div style="margin:auto">
<img width=30% src="https://media.giphy.com/media/3oKIPtjElfqwMOTbH2/giphy.gif" alt="rocket gif">
</div>

---

# Routes

There are only two routes that matters in this REST API, one for shortening new URLs and another for redirecting to the original URL using a short URL.

*Right now, the ```base_url``` is: ```shmag.herokuapp.com```*.

## Shortening links

You can make an **post request** to ```'/url'``` passing a URL to be shortened and an optional alias (slug) as body parameters.

Example:

```
api_url: shmag.herokuapp.com/url
params: {
    "url":"https://github.com/raymag/shmag"
}
```
If you want to use a custom slug you can pass it as a parameter:
```
api_url: shmag.herokuapp.com/url
params: {
    "url":"https://github.com/raymag/shmag",
    "slug":"gitr"
}
```
In the example above, if the slug *gitr* isn't already in use you'll be able to use access the original URL through it.

- **url**: it must be an valid URL.
- **slug**: It's a optional parameter, it must be a string made of numbers, letters or hyphens.


## Redirecting to original URL

You can make a **get request** to ```/:slug``` passing the slug of the URL you want to be redirected to.

For instance, if the example above was a sucess, if you pass **gitr** as a URL parameter you'd be redirected to ```"https://github.com/raymag/shmag"```.

```
api_url: shmag.herokuapp.com/gitr
redirect_to: "https://github.com/raymag/shmag"
```

---

## Contributing

If you like this project or do you think it's trash and that you can improve it, please consider contributing to it. A helping hand is always appreciated here, just be respectful and do your best.