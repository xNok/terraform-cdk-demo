# Terrafrom CDK Demo

This repos is the source code for the following tutorial: [Infrastructure as Code Made Easy: A Beginner's Guide to Terraform CDK](https://earthly.dev/blog/iac-terraform-cdk/)

## Running the demo

First, install dependencies

```
cd typescript-aws-stack
npm install
```

Edit the backend configuration on [main.ts](./typescript-aws-stack/main.ts) and login to Terraform Cloud so it can use the remote backend configuration.

```
tf login
```

Next set the environment variable required by the providers (AWS and Github)

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
GITHUB_TOKEN=
```

Deploy the Stack

```
cdktf deploy --var='repoId=you/your-repo'
```
