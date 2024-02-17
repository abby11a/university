import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Cluster, ContainerImage } from 'aws-cdk-lib/aws-ecs';
import { Repository } from 'aws-cdk-lib/aws-ecr';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';

const VPC_NAME = "InventoryManagerVpc";
const CLUSTER_NAME = "InventoryManagerCluster";
const ECR_NAME = "InventoryManagerEcrRepo";
const FARGATE_NAME = "InventoryManagerFargateService";

export class InventoryManagerCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC
    const vpc = new Vpc(this, VPC_NAME, { maxAzs: 2, vpcName: VPC_NAME, });

    // Create an ECS cluster
    const cluster = new Cluster(this, CLUSTER_NAME, { vpc, clusterName: CLUSTER_NAME});

    // Create an ECR repository
    const ecrRepository = new Repository(this, ECR_NAME);

    // Define a Fargate Task running on the cluster, using the image from ECR
    const fargateService = new ApplicationLoadBalancedFargateService(this, FARGATE_NAME, {
      cluster,
      cpu: 256,
      desiredCount: 1,
      taskImageOptions: { image: ContainerImage.fromEcrRepository(ecrRepository) },
      memoryLimitMiB: 512,
      publicLoadBalancer: true
    });
  }
}
