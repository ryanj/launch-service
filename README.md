# A basic Restify project
*With support for serving easy APIs and static content*

[![Build Status](https://build-shifter.rhcloud.com:443/buildStatus/icon?job=restify-build)](https://build-shifter.rhcloud.com:443/job/restify-build/)

To deploy a clone of this application using the [`rhc` command line tool](http://rubygems.org/gems/rhc):

    rhc app create restify nodejs-0.10 --from-code=https://github.com/ryanj/restify-base.git
    
Or [link to a web-based clone+deploy](https://openshift.redhat.com/app/console/application_type/custom?cartridges%5B%5D=nodejs-0.10&initial_git_url=https%3A%2F%2Fgithub.com%2Fryanj%2Frestify-base.git) on [OpenShift Online](http://OpenShift.com) or on [your own OpenShift cloud](http://openshift.github.io): 

    https://openshift.redhat.com/app/console/application_type/custom?cartridges%5B%5D=nodejs-0.10&initial_git_url=https%3A%2F%2Fgithub.com%2Fryanj%2Frestify-base.git

## Local Development
First, make sure the app's dependencies are available:
```bash
npm install
```

Then, start a local webserver with:
```bash
npm start
```

## License
This code is dedicated to the public domain to the maximum extent permitted by applicable law, pursuant to CC0 (http://creativecommons.org/publicdomain/zero/1.0/)
