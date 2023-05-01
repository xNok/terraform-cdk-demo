import { Construct } from "constructs";
import { App, TerraformStack, CloudBackend, NamedCloudWorkspace, TerraformOutput, TerraformVariable } from "cdktf";
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

    // Variables 
    const imageId = new TerraformVariable(this, "imageId", {
      type: "string",
      default: "ami-01456a894f71116f2",
      description: "What AMI to use to create an instance",
    });

    const imageSize = new TerraformVariable(this, "imageSize", {
      type: "string",
      default: "t2.micro",
      description: "What size to use to create an instance",
    });

    const repoId = new TerraformVariable(this, "repoId", {
      type: "string",
      default: "xNok/terraform-cdk-demo",
      description: "Which repository manage this instance",
    });

    // AWS
    const ec2Instance = new Instance(this, "compute", {
      ami: imageId.value,
      instanceType: imageSize.value,
      tags: {
        "repo": repoId.value,
      }
    });

    // GITHUB
    const repo = new DataGithubRepository(this, "repo", {
      fullName:  repoId.value,
    })

    new ActionsVariable(this, "action_variavle_public_ip", {
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
