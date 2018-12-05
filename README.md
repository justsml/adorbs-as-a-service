# adorbs-as-a-service

Here's the API goal:

`/api/v1/w600/h300/?label=hello&labelColor=cornflowerblue&backgroundColor=[color]&backgroundOpacity=0.75&borderRadius=100%`

### Options:

- [ ] `label`*
- [ ] `labelColor`*
- [ ] `backgroundColor`*
- [ ] `backgroundOpacity`*
- [x] `rounded`
- [ ] `scale`*

\* to be implemented

Example API Requests:

Using service base URL: `https://adorbs-as-a-service.herokuapp.com/api/v1/`

##### Random Kitten Photo w/ Width=400 & Height=500

`/api/v1/w400/h500`

![](https://adorbs-as-a-service.herokuapp.com/api/v1/w400/h500 "Height=500 Width=400")

##### Random Kitten Photo w/ Width=400 & Height=500 & Rounded Corner

`/api/v1/w300/h300?rounded=100`

![](https://adorbs-as-a-service.herokuapp.com/api/v1/w300/h300?rounded=100 "Rounded=100 Height=300 Width=300")


> Side note: Let's use a route pattern, we could eventually test multiple methods for doing this sort of graphics work on a NodeJS server.

> Notes:
> I don't like PlaceKitten's positional args for width vs height.<br />
> e.g. https://placekitten.com/600/300
/width/height/ obvi, right? 😿




> a project by @justsml - a [dan levy joint](https://danlevy.net/)

