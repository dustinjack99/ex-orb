# Ex-Orb
An interactive planetary map of NASA's exoplanet data.

## Process
This project was my first foray into using Angular, in place of React, and also my first deployment to Azure. Before even starting, I had to learn how to make a containerized app in Docker. Once I wrestled with the config, CI/CD, and deploying the app as a container, the real work could begin.

The app fetches data from NASA's Exoplanet API. I wanted to make an app that splashes all the systems onto a map, then when you click on a star system, it displays all the planets rotating around its host star. This is where I want into the largest hurdle: it turns out celestial latitude and longitude is different than terrestrial latitude and longitude. 

### Terrestrial Lat / Long
<img raw=true src="src/assets/tlatlong.jpg" />

### Celestial Lat / Long
<img raw=true src="src/assets/glatlong.png" />

As you can see, there are a few differences. For one, the boundaries are different. Terrestrial Lat / Long ranges from 0 to 90 degrees. Celestial LatitudeI found a formula that translates the Earth-based Latitude and Longitude to a 2D surface, but there was no such formula for celestial coordinates. 

I had to jerry-rig the formula to account for squishing more data into a 2D space. Imagine this: you're on Earth, trying to show on a 2D map where Los Angeles is. Except Los Angeles is now hundreds of miles under the Earth, and it orbits around a point that isn't the earth's core. These are the points 

## Outcome

