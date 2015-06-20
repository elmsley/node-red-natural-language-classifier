# node-red-natural-language-classifier
node-red node for IBM Watson natural language classifier

# Installation

Add this in your nodes/ directory and it should appear as a palette icon in the IBM Watson section.  You must ensure you 
add/bind the service to your application in order for it to work.

## To add the service you can use cloudfoundry/cli (cf)

` 
$ cf api https://api.ng.bluemix.net 
$ cf login -u <your user ID>
`

## Create the service

` 
$ cf create-service natural_language_classifier free natural-language-classifier-service
`

## Bind it to your app
` 
$ cf bind-service my_app natural_language_classifier
`

# Dependencies

This also depends on a classifier already being available, and previously trained.

# Copyright and License
Copyright 2015 Jason Mah under the <a href="https://github.com/nevir/readable-licenses/blob/master/markdown/ISC-LICENSE.md">ISC License</a>

