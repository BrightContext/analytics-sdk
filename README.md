
# Bright Context Analytics SDK

Sign up
[http://www.brightcontext.com](http://www.brightcontext.com)

Documentation
[http://brightcontext.com/docs/js/](http://brightcontext.com/docs/js/)

Questions
[http://www.brightcontext.com/about/contact/](http://www.brightcontext.com/about/contact/)


### Including in your page

- Create a Quant Channel
- Add a Digital Analytics input
- Copy and paste the embed code into your web app
- Link to our pre-built CDN hosted js or build your own by downloading this repo


### Linking to our CDN

    <script src="//static.brightcontext.com/analytics-sdk/bcc-analytics.min.js">

### Example embed code

    <script type='text/javascript'>
      BCC.Analytics.init('b8c341401395458886178', {
        // optionaly include page position
        movement: false,

        // optionally include page load performance
        performance: false,

        // customization parameters
        // name: 'custom page name if desired',
        // tags: ['custom', 'tag', 'list', 'for', 'this', 'page']
    });
    </script>

### License

MIT

