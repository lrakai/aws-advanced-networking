# aws-advanced-networking
Demonstration of VPC Peering and site-to-site VPN connections using dynamic routing in AWS.  The architecture below is created by CloudFormation templates.

![Architecture](https://user-images.githubusercontent.com/3911650/29056799-dfe25d04-7bc2-11e7-871a-844e8837adcd.png)

## Features
* Highly available architecture
* VPC peering between web and API tiers
* Site-to-site IPSec VPN tunnels between Corporate (containing the database) and API tier
* VyOS routers for routing corporate network traffic
* Dynamic routing using BGP
* Dual-homed router instances to separate internal (within corporate network) and external (outside corporate network) traffic and their security groups
* Route53 private hosted zone for custom private domains
* VPC flow logs to inspect accepted and rejected network traffic at the network interface level
* 3-tier MEAN stack application spanning 3 VPCs and tolerant of multiple network failures in `src/`

## The Templates
There are three templates in `infrastructure/`:
1. `cloudformation.json`: The full template with all of the resources illustrated (and more).
1. `cloudformation-corporate-side.json`: The corporate network and a single instance to represent both the web and API tiers. This is to focus on VPN connections and dual-homed routers.
1. `cloudformation-cloud-side.json`: The web and API tiers with a single instance to represent the corporate network. This is to focus on VPC Peering, VPC flow logs, and Route53 private hosted zones.

The corporate network is simulated using a VPC and corporate IP addresses are simulated using Elastic IPs.


## Working With the Templates
Each template creates a user named `student` that has the required IAM permissions to work with the created resources.