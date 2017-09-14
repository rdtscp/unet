# unet
Multi-platform application that provides a 'universal account' for services such as instant messaging, cloud storage. More features to be determined. Project started as POC to learn web technologies/concepts.

# unet-core
[unet-core](https://github.com/acwilson96/unet-core)

# unet_mobile
[unet_mobapp](https://github.com/acwilson96/unet_mobile)

# unet_webapp
[unet_webapp](https://github.com/acwilson96/unet_webapp)

---

# Installation/Usage


* clone `https://github.com/acwilson96/unet-core.git`
* clone `https://github.com/acwilson96/unet_webapp.git`
* In `unet_webapp` run `npm run build`.
* Use the npm package `serve` to run the build folder using `serve -s build`
* In `unet-core` configure `config/cors.js` and `config/csrf.js` to allow requests from the `address:port` combination that the `unet_webapp` is accessed from.
* Have MongoDB running, and in `unet-core` configure `config/connections.js` with appropriate database info.
* Use `sails lift` to start the API.
