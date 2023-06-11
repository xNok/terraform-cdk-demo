import { fetchConfig } from "./fetchConfig";

test('fetch config as yaml', () => {
    const config = fetchConfig("typescript-aws-stack")
    expect(config).toStrictEqual({
        "imageId": "ami-01456a894f71116f2",
        "imageSize": "t2.micro",
        "repoId": "xNok/terraform-cdk-demo"
    })
});
