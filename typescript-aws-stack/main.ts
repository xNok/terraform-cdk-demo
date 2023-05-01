import { Construct } from "constructs";
import { App, TerraformStack, CloudBackend, NamedCloudWorkspace, TerraformOutput } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { Instance } from "@cdktf/provider-aws/lib/instance";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // define resources here
    new AwsProvider(this, "AWS", {
      region: "us-west-1",
    });

    const ec2Instance = new Instance(this, "compute", {
      ami: "ami-01456a894f71116f2",
      instanceType: "t2.micro",
    });

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
