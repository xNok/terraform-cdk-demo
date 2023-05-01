import { Construct } from "constructs";
import { App, TerraformStack, CloudBackend, NamedCloudWorkspace, TerraformOutput } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { GithubProvider } from "@cdktf/provider-github/lib/provider"
import { Instance } from "@cdktf/provider-aws/lib/instance";
import { ActionsVariable } from "@cdktf/provider-github/lib/actions-variable"
import { DataGithubRepository } from "@cdktf/provider-github/lib/data-github-repository"

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "AWS", {
      region: "us-west-1",
    });

    new GithubProvider(this, "GitHub", {})

    // AWS
    const ec2Instance = new Instance(this, "compute", {
      ami: "ami-01456a894f71116f2",
      instanceType: "t2.micro",
    });

    // GITHUB
    const repo = new DataGithubRepository(this, "repo", {
      fullName:  "xNok/terraform-cdk-demo",
    })

    new ActionsVariable(this, "public_ip", {
      repository: repo.name,
      value: ec2Instance.publicIp,
      variableName:"PUBLIC_IP"
    })

    // OUTPUT
    new TerraformOutput(this, "public_ip", {
      value: ec2Instance.publicIp,
    });
  }
}

const app = new App();
const stack = new MyStack(app, "typescript-aws-stack");
new CloudBackend(stack, {
  hostname: "app.terraform.io",
  organization: "nokwebspace",
  workspaces: new NamedCloudWorkspace("typescript-aws-stack")
});
app.synth();
