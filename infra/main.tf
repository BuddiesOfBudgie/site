terraform {
	required_providers {
		digitalocean = {
			source = "digitalocean/digitalocean"
			version = "2.18.0"
		}
	}
}

variable "do_token" {}

provider "digitalocean" {
	token = var.do_token
}

resource "digitalocean_container_registry" "caprica" {
	name = "caprica"
	subscription_tier_slug = "starter"
}

data "digitalocean_container_registry" "caprica" {
	name = "caprica"
}

resource "digitalocean_container_registry_docker_credentials" "caprica_creds" {
	registry_name = "caprica"
}

resource "digitalocean_kubernetes_cluster" "galactica" {
	name = "galactica"
	region = var.region
	version = "1.22.7-do.0"

	maintenance_policy {
		day = "sunday"
		start_time = "00:00"
	}

	node_pool {
		name = "worker-pool"
		size = "s-1vcpu-2gb"
		node_count = 2
	}
}

data "digitalocean_kubernetes_cluster" "galactica" {
	name = "galactica"
}

provider "kubernetes" {
	host = data.digitalocean_kubernetes_cluster.galactica.endpoint
	token = resource.digitalocean_kubernetes_cluster.galactica.kube_config[0].token
	cluster_ca_certificate = base64decode(resource.digitalocean_kubernetes_cluster.galactica.kube_config[0].cluster_ca_certificate)
}