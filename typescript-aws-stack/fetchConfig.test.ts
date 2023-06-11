import { fetchConfig, fetchConfigApi } from "./fetchConfig";
import type { FetchMockStatic } from 'fetch-mock';
import fetch from 'node-fetch';
import 'fetch-mock-jest';

jest.mock(
    'node-fetch',
    () => require('fetch-mock-jest').sandbox(),
);
const fetchMock = (fetch as unknown) as FetchMockStatic;

test('fetch config as yaml', () => {
    const config = fetchConfig("typescript-aws-stack")
    expect(config).toStrictEqual({
        "imageId": "ami-01456a894f71116f2",
        "imageSize": "t2.micro",
        "repoId": "xNok/terraform-cdk-demo"
    })
});

test('fetch config as api', () => {
    fetchMock.get('https://api.example.com/typescript-aws-stack', {
        "imageId": "ami-01456a894f71116f2",
        "imageSize": "t2.micro",
        "repoId": "xNok/terraform-cdk-demo"
    });

    fetchConfigApi("typescript-aws-stack")
    .then(config => expect(config).toStrictEqual({
        "imageId": "ami-01456a894f71116f2",
        "imageSize": "t2.micro",
        "repoId": "xNok/terraform-cdk-demo"
    }))
});

