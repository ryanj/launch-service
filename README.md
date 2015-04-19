# Launch-Service [![Build Status](https://api.travis-ci.org/ryanj/launch-service.svg)](https://travis-ci.org/ryanj/launch-service) [![Dependency Check](http://img.shields.io/david/ryanj/launch-service.svg)](https://david-dm.org/ryanj/launch-service)

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ryanj/launch-service?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Custom launch buttons, with opt-in usage tracking:

[![Launch it on OpenShift](https://launch-shifter.rhcloud.com/button/LAUNCH%20ON.svg)](https://launch-shifter.rhcloud.com/r?url=https%3A%2F%2Fopenshift.redhat.com%2Fapp%2Fconsole%2Fapplication_type%2Fcustom%3Fcartridges%5B%5D%3Dnodejs-0.10%26initial_git_url%3Dhttps%3A%2F%2Fgithub.com%2Fryanj%2Flaunch-service.git%26name%3Dlaunch) &nbsp; [![RUN ME ON OpenShift](https://launch-shifter.rhcloud.com/launch/light/RUN%20ME%20ON.svg)](https://launch-shifter.rhcloud.com/r?url=https%3A%2F%2Fopenshift.redhat.com%2Fapp%2Fconsole%2Fapplication_type%2Fcustom%3Fcartridges%5B%5D%3Dnodejs-0.10%26initial_git_url%3Dhttps%3A%2F%2Fgithub.com%2Fryanj%2Flaunch-service.git%26name%3Dlaunch)

Create your own launchers here: [launch-shifter.rhcloud.com](https://launch-shifter.rhcloud.com)

## Run your own launch service

To deploy a clone of this application using the [`rhc` command line tool](http://rubygems.org/gems/rhc):

    rhc app create launch nodejs-0.10 --from-code=https://github.com/ryanj/launch-service.git
    
Or [link to a web-based clone+deploy](https://openshift.redhat.com/app/console/application_type/custom?cartridges%5B%5D=nodejs-0.10&initial_git_url=https%3A%2F%2Fgithub.com%2Fryanj%2Flaunch-service.git) on [OpenShift Online](http://OpenShift.com) or on [your own OpenShift cloud](http://openshift.github.io): 

    https://openshift.redhat.com/app/console/application_type/custom?cartridges%5B%5D=nodejs-0.10&initial_git_url=https%3A%2F%2Fgithub.com%2Fryanj%2Flaunch-service.git

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
To run [the related docker image](https://registry.hub.docker.com/u/ryanj/launch-service/):

```bash
docker pull ryanj/launch-service
docker run -d -p 8080:8080 -e "HOSTNAME=localhost" -e "APP_NAME=app_name" ryanj/launch-service
```

## OpenShiftM5 and kubernetes
A [sample kubernetes pod configuration file](https://github.com/ryanj/launch-service/blob/master/launch-pod.json) is included for running [this project's Docker build](https://registry.hub.docker.com/u/ryanj/launch-service/) on [an OriginM5 hosting environment](https://github.com/openshift/origin#getting-started):

```bash
HOSTNAME=localhost APP_NAME=app_name $GOPATH/src/github.com/openshift/origin/_output/go/bin/openshift kube create pods -c ~/src/launch-service/launch-pod.json
```

## License
This code is dedicated to the public domain to the maximum extent permitted by applicable law, pursuant to CC0 (http://creativecommons.org/publicdomain/zero/1.0/)
