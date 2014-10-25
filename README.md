# A basic Restify project [![Build Status](http://img.shields.io/jenkins/s/https/build-shifter.rhcloud.com/restify-build.svg)](https://build-shifter.rhcloud.com/job/restify-build/) [![Dependency Check](http://img.shields.io/david/ryanj/restify-base.svg)](https://david-dm.org/ryanj/restify-base) [![Deploy](https://img.shields.io/badge/Launch_on-OpenShift-brightgreen.svg)](https://openshift.redhat.com/app/console/application_type/custom?cartridges%5B%5D=nodejs-0.10&initial_git_url=https%3A%2F%2Fgithub.com%2Fryanj%2Frestify-base.git&name=restify)
*With support for serving easy APIs and static content*

To deploy a clone of this application using the [`rhc` command line tool](http://rubygems.org/gems/rhc):

    rhc app create restify nodejs-0.10 --from-code=https://github.com/ryanj/restify-base.git
    
Or [link to a web-based clone+deploy](https://openshift.redhat.com/app/console/application_type/custom?cartridges%5B%5D=nodejs-0.10&initial_git_url=https%3A%2F%2Fgithub.com%2Fryanj%2Frestify-base.git) on [OpenShift Online](http://OpenShift.com) or on [your own OpenShift cloud](http://openshift.github.io): 

    https://openshift.redhat.com/app/console/application_type/custom?cartridges%5B%5D=nodejs-0.10&initial_git_url=https%3A%2F%2Fgithub.com%2Fryanj%2Frestify-base.git

## Local Development
Install dependencies:

```bash
npm install
```

Start a local server:

```bash
npm start
```

## Docker
To run [the related docker image](https://registry.hub.docker.com/u/ryanj/restify-base/):

```bash
docker pull ryanj/restify-base
docker run -d -p 8080:8080 -e "HOSTNAME=localhost" -e "APP_NAME=app_name" ryanj/restify-base
```

## OpenShiftM5 and kubernetes
A [sample kubernetes pod configuration file](https://github.com/ryanj/restify-base/blob/master/restify-pod.json) is included for running [this project's Docker build](https://registry.hub.docker.com/u/ryanj/restify-base/) on [an OriginM5 hosting environment](https://github.com/openshift/origin#getting-started):

```bash
HOSTNAME=localhost APP_NAME=app_name $GOPATH/src/github.com/openshift/origin/_output/go/bin/openshift kube create pods -c ~/src/restify-base/restify-base.json
```

## License
This code is dedicated to the public domain to the maximum extent permitted by applicable law, pursuant to CC0 (http://creativecommons.org/publicdomain/zero/1.0/)
