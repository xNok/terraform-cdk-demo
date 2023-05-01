import { Construct } from "constructs";
import { App, TerraformStack, CloudBackend, NamedCloudWorkspace } from "cdktf";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // define resources here
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
