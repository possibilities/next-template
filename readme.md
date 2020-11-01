# Next Template [![CircleCI](https://circleci.com/gh/possibilities/next-template.svg?style=svg&circle-token=17a30cf0854f5d3d09a525ef6782db9cc8bd1b37)](https://circleci.com/gh/possibilities/next-template)

My personal boilerplate for static apps built on NextJS and MaterialUI with deployment to AWS S3.

### Develop

```
yarn dev
```

### Deploy

Set up environment variables in Circle CI in an organization-level context called `arthack.live-upload-credentials`

* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`

Set up environment variable in Circle CI in the project settings

* `SUBDOMAIN`: The subdomain to use for the static site
